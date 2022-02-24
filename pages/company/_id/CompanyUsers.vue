<template>
  <div>
    <!-- Companyに参加ユーザー一覧 -------------------------------------------->
    <v-container>
      <v-card>
        <v-row
          justify="center"
        >
          <v-col
            cols="12"
            :sm="container.sm"
            :md="container.md"
          >
            <v-row justify="center">
              <v-col>
                <v-text-field
                  v-model="currentCompany.name"
                  label="Company Name"
                  class="pb-0 mb-0 mt-2 px-2 text-h6"
                  @blur="companyNameChange"
                />
              </v-col>
            </v-row>
            <v-row
              justify="end"
              class="pb-5 mt-0 mr-1"
            >
              <v-btn
                color="primary"
                @click="findUserDialog = true"
              >
                ユーザー追加
              </v-btn>
            </v-row>
            <v-divider />

            <v-data-table
              :headers="tableHeaders"
              :items="companyUsers"
              item-key="id"
            >
              <template #[`item.icon`]="{ item }">
                <v-icon
                  @click="test(item)"
                >
                  mdi-account-circle
                </v-icon>
              </template>
              <template #[`item.created_at`]="{ item }">
                {{ $my.dateFormat(item.created_at) }}
              </template>
              <template
                #[`item.delete`]="{ item }"
              >
                <v-btn
                  v-if="companyOwner"
                  class="error"
                  @click="userDelete(item)"
                >
                  削除
                </v-btn>
              </template>
              <template #no-data>
                <h3>ユーザーがいません</h3>
              </template>
            </v-data-table>
            <v-divider
              class="mt-4"
            />
            <v-row justify="end">
              <v-card-subtitle
                class="pb-1 mr-0"
              >
                参加ユーザー({{ companyUsers.length }})
              </v-card-subtitle>
            </v-row>
            <v-row
              justify="end"
            >
              <v-btn
                v-if="companyOwner"
                color="#EF5350"
                class="mb-2 mr-4"
                @click="companyDeleteComfirmation"
              >
                Companyの削除
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <!-- findDialog------------------------------------------------------------ -->
    <v-dialog
      v-model="findUserDialog"
      max-width="600px"
    >
      <v-container
        fluid
      >
        <v-card
          max-width="700"
        >
          <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
          >
            <v-btn
              icon
              large
              @click="findUserDialog = false"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title>
              検索
            </v-toolbar-title>
          </v-app-bar>
          <v-divider />
          <v-container>
            <v-row
              class="pt-7 pl-5 pr-5"
            >
              <v-col>
                <v-text-field
                  v-model="findName"
                  outlined
                  rounded
                  label="検索ワードを入力"
                  append-outer-icon="mdi-magnify"
                  @click:append-outer="findUser"
                />
              </v-col>
            </v-row>
            <v-divider />
            <!-- ここから下が、新しく定義する検索結果 -->
            <v-container
              v-if="users.length > 0"
            >
              <v-row
                justify="center"
              >
                <v-col
                  cols="12"
                >
                  <v-card-text>
                    ユーザー検索({{ users.length }})件
                  </v-card-text>
                  <v-divider class="mb-4" />

                  <v-data-table
                    :headers="findHeaders"
                    :items="users"
                    item-key="id"
                  >
                    <template #[`item.icon`]="{ item }">
                      <v-icon
                        class="mr-2"
                        @click="test(item)"
                      >
                        mdi-account-circle
                      </v-icon>
                    </template>
                    <template #[`item.actions`]="{ item }">
                      <v-btn
                        color="error"
                        @click="addUser(item)"
                      >
                        追加
                      </v-btn>
                    </template>
                    <template #no-data>
                      <h3>ユーザーがいません</h3>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </v-container>
        </v-card>
      </v-container>
    </v-dialog>
    <!-- deleteComfirmDialog ---------------------------------------------------------------------------->
    <v-dialog
      v-model="deleteComfirmDialog"
      max-width="600px"
    >
      <v-card
        max-width="700"
      >
        <v-card-title class="">
          <v-row>
            <v-col>
              <v-row>
                <v-card-title>
                  <span class="text-h6 red--text">Company削除の最終確認</span>
                </v-card-title>
              </v-row>
              <v-card-subtitle
                class="py-0"
              >
                <span>Companyを削除した場合、今まで作成した全ての共有プロジェクトが失われます。本当によろしいですか？ その場合</span>
                <span class="red--text text-decoration-underline">{{ currentCompany.name }}</span>
                <span>と入力して下さい。</span>
              </v-card-subtitle>
              <v-card-actions>
                <v-text-field
                  v-model="deleteKey"
                  label="DeleteKey"
                  placeholder="Deletekey"
                  autofocus
                  max-width="100"
                  class="my-0 text-h6"
                  cols="3"
                />
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider
          class="my-2"
        />
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="deleteComfirmDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="companyDelete"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import homeImg from '~/assets/images/logged-in/home.png'
export default {
  layout: 'company-details',
  middleware: ['get-company-current', 'get-company-project-list', 'get-company-project-current', 'get-company-users', 'get-company-users-owner'],
  data () {
    return {
      homeImg,
      loading: false,
      findName: '',
      deleteKey: '',
      users: [],
      findUserDialog: false,
      deleteComfirmDialog: false,
      container: {
        sm: 10,
        md: 20
      },
      // params一覧---------------------------------------------------
      params: { company: { id: '', name: '' }, users: { user_id: '' } },
      tableHeaders: [
        { text: 'ID', width: 50, value: 'id', sortable: false },
        { text: 'ユーザー名', width: 80, value: 'name', sortable: false },
        { text: 'プロフィール', width: 300, value: 'user_profile', sortable: false },
        { text: '追加日', width: 150, value: 'created_at', class: 'pr-1', sortable: false },
        { text: 'user削除', width: 50, class: 'pr-1', value: 'delete', sortable: false }
      ],
      findHeaders: [
        { text: 'icon', width: 50, class: 'pr-1', value: 'icon', sortable: false },
        { text: 'name', width: 80, class: 'pr-0', value: 'name', sortable: false },
        { text: 'profile', width: 200, value: 'user_profile', sortable: false },
        { text: 'Actions', width: 50, class: 'pr-1', value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    currentCompany () {
      const id = this.$store.state.company.current.id
      const name = this.$store.state.company.current.name
      return { id, name }
    },
    // 参加ユーザー
    companyUsers () {
      const usersList = []
      const companyUsers = this.$store.state.companyUsers.list
      companyUsers.forEach((users) => {
        usersList.push(users)
      })
      return usersList
    },
    currentUser () {
      const currentUser = this.$store.state.user.current
      return currentUser
    },
    // オーナーユーザー
    ownerUser () {
      const ownerUser = this.$store.state.companyUsers.ownerUser
      return ownerUser
    },
    // 共有プロジェクト作成者の場合はtrueを返す
    companyOwner () {
      return this.ownerUser.id === this.currentUser.id
    },
    btnStatus () {
      return this.currentUser.id
    }
  },
  methods: {
    // ユーザー検索メソッド--------------------------------------------------
    async findUser () {
      this.users = []
      const url = 'api/v1/finders'
      await this.$axios.get(url, { params: { findName: this.findName } })
        .then((res) => {
          // 参加しているユーザーを取得
          const usersList = []
          this.companyUsers.forEach((users) => {
            usersList.push(users.id)
          })
          // responeseをfotEachでループする際に参加userかどうかincludesメソッドで確認して、参加していないuserだけをpushする。
          const search = res.data
          search.forEach((users) => {
            if (!usersList.includes(users.id)) {
              this.users.push(users)
            }
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // Company参加ユーザー追加メソッド-------------------------------------
    addUser (item) {
      this.params.users.user_id = item.id
      this.params.company.id = this.currentCompany.id
      this.loading = true
      this.$axios.$post('/api/v1/company_users', this.params)
        .then(response => this.addUserSuccess(response))
        .catch(error => this.addUserFailure(error))
      this.loading = false
    },
    async addUserSuccess (response) {
      await this.$axios.$get('/api/v1/company_users', { params: { id: this.currentCompany.id } })
        .then(companyUsers => this.$store.dispatch('getCompanyUsersList', companyUsers))
        .catch(error => this.addUserFailure(error))
      const addUserId = response.user_id
      const successCompanyUsers = []
      this.users.forEach((users) => {
        if (addUserId !== users.id) {
          successCompanyUsers.push(users)
        }
      })
      this.users = successCompanyUsers
      const color = '#0091EA'
      const msg = 'Userを追加しました😀'
      const timeout = '1000'
      this.$store.dispatch('getToast', { msg, color, timeout })
    },
    addUserFailure (error) {
      console.log(error)
    },
    // Company参加ユーザーから削除メソッド
    async userDelete (item) {
      if (this.ownerUser.id === item.id) {
        alert('このユーザーはオーナーユーザーです。削除にはご注意ください')
      }
      const sure = confirm('ユーザーを共有プロジェクトのメンバーより削除します。よろしいですか？')
      if (sure) {
        this.params.users.user_id = item.id
        this.params.company.id = this.currentCompany.id
        this.loading = true
        await this.$axios.$delete('api/v1/company_users', { data: this.params })
          .then(response => this.deleteSuccess(response))
          .catch(error => this.deleteFailure(error))
        this.loading = false
      }
    },
    deleteSuccess (response) {
      const deleteUserId = response.user_id
      const deleteSuccessUsersList = []
      this.companyUsers.forEach((users) => {
        if (deleteUserId !== users.id) {
          deleteSuccessUsersList.push(users)
        }
      })
      this.$store.dispatch('getCompanyUsersList', deleteSuccessUsersList)
      const color = 'error'
      const msg = 'Userを削除しました😥'
      const timeout = '1000'
      this.$store.dispatch('getToast', { msg, color, timeout })
    },
    deleteFailure (error) {
      console.log(error)
    },
    // Companyの名前を変更メソッド---------------------------------------------
    async companyNameChange () {
      const sure = confirm('カンパニー名を変更します。よろしいですか？')
      if (sure) {
        this.params.company.id = this.currentCompany.id
        this.params.company.name = this.currentCompany.name
        await this.$axios.$put('api/v1/companies', this.params)
          .then(response => this.succesNameChenge(response))
          .catch(error => this.failureNameChenge(error))
      }
    },
    succesNameChenge (response) {
      console.log(response)
    },
    failureNameChenge (error) {
      console.log(error)
      const color = 'error'
      const msg = 'オーナー以外は変更できません😥'
      const timeout = '4000'
      this.$store.dispatch('getToast', { msg, color, timeout })
    },
    companyDeleteComfirmation () {
      const sure = confirm('カンパニーを削除すると全ての共有プロジェクトが失われます。よろしいですか？')
      if (sure) {
        this.deleteComfirmDialog = true
      }
    },
    async companyDelete () {
      this.params.company.id = this.currentCompany.id
      if (this.deleteKey === this.currentCompany.name) {
        await this.$axios.$delete('api/v1/companies', { data: this.params })
          .then(response => this.successDelete(response))
          .catch(error => this.failureDelete(error))
      } else {
        const color = 'error'
        const msg = 'DeleteKeyが違います😥'
        const timeout = '1000'
        this.$store.dispatch('getToast', { msg, color, timeout })
      }
    },
    successDelete (response) {
      console.log(response)
      this.$router.push('/')
    },
    failureDelete (error) {
      console.log(error)
    }
  }
}
</script>
