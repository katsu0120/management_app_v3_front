<template>
  <div
    id="companies"
  >
    <v-parallax>
      <v-img
        :src="companyImg"
        alt="companyImg"
        :aspect-ratio="16/9"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
      >
        <v-container
          fill-height
        >
          <v-row
            justify="center"
            align="center"
          >
            <v-col
              cols="12"
              :sm="container.sm"
              :md="container.md"
            >
              <v-card-title
                class="white--text pb-1"
              >
                <h3>参加Company一覧</h3>
              </v-card-title>

              <v-divider
                dark
              />
              <v-card-subtitle
                class="white--text"
              >
                <h4>最近選択したカンパニー</h4>
              </v-card-subtitle>

              <v-row
                align="center"
              >
                <!-- カンパニーの追加 --------------------------------------->
                <v-col
                  cols="12"
                  :sm="card.sm"
                  :md="card.md"
                >
                  <v-btn
                    block
                    :height="card.height"
                    :elevation="card.elevation"
                    @click="newCompanyDialog = true"
                  >
                    <div>
                      <v-icon
                        size="24"
                        color="myblue"
                        class="my-2 pl-2"
                      >
                        mdi-plus
                      </v-icon>
                      <div
                        class="caption myblue--text"
                      >
                        カンパニーを追加
                      </div>
                    </div>
                  </v-btn>
                </v-col>
                <!-- 最近のカンパニー ---------------------------------->
                <v-col
                  v-for="(company, i) in recentCompanies.slice(0, 2)"
                  :key="`card-company-${i}`"
                  cols="12"
                  :sm="card.sm"
                  :md="card.md"
                >
                  <v-card
                    block
                    :height="card.height"
                    :elevation="card.elevation"
                    :to="$my.companyLinkTo(company.id)"
                    class="v-btn text-capitalize"
                  >
                    <v-card-title
                      class="pb-1 d-block text-truncate"
                    >
                      {{ company.name }}
                    </v-card-title>
                    <v-card-text
                      class="caption"
                    >
                      <v-icon
                        size="14"
                      >
                        mdi-update
                      </v-icon>
                      {{ $my.dateFormat(company.updated_at) }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-parallax>
    <!-- 全てのカンパニー ------------------------------------------------->
    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          :sm="container.sm"
          :md="container.md"
        >
          <v-card-title>
            Company一覧
          </v-card-title>

          <v-divider class="mb-4" />

          <v-data-table
            :headers="tableHeaders"
            :items="recentCompanies"
            :items-per-page="5"
            item-key="id"
          >
            <template #[`item.id`]="{ item }">
              {{ item.id }}
            </template>
            <template #[`item.name`]="{ item }">
              <nuxt-link
                :to="$my.companyLinkTo(item.id)"
                class="text-decoration-none"
              >
                {{ item.name }}
              </nuxt-link>
            </template>
            <template #[`item.created_at`]="{ item }">
              {{ $my.dateFormat(item.created_at) }}
            </template>
            <template #[`item.updated_at`]="{ item }">
              {{ $my.dateFormat(item.updated_at) }}
            </template>
            <template #no-data>
              <h3>カンパニーがありません</h3>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <!-- newCompanyDialog ------------------------------------------------->
    <v-dialog
      v-model="newCompanyDialog"
      max-width="600px"
    >
      <v-card
        max-width="700"
      >
        <v-card-title class="my-0 pt-5">
          <v-row>
            <v-col
              cols="12"
              xs="10"
              sm="10"
              md="10"
              lg="10"
              xl="10"
            >
              <v-row>
                <v-card-title>
                  <span class="text-h6">カンパニーの追加</span>
                </v-card-title>
              </v-row>
              <v-card-actions>
                <v-text-field
                  v-model="params.company.name"
                  label="NewCompanyTitle"
                  placeholder="新規カンパニーのタイトル"
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
          <v-row justify="center">
            <v-btn
              color="primary"
              class="my-4"
              :loading="loading"
              @click="createCompany"
            >
              新規作成
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import companyImg from '~/assets/images/pakutaso/KAZU-bgftdrtfgh_TP_V.jpg'
export default {
  name: 'PagesAccount',
  layout: 'company',
  data () {
    return {
      params: { company: { name: '' } },
      newCompanyDialog: false,
      loading: false,
      companyImg,
      container: {
        sm: 10,
        md: 8
      },
      card: {
        sm: 6,
        md: 4,
        height: 110,
        elevation: 4
      },
      tableHeaders: [
        { text: 'ID', width: 50, value: 'id', sortable: false },
        { text: 'カンパニー名', value: 'name', sortable: false },
        { text: '作成日', width: 100, value: 'created_at', sortable: false },
        { text: '更新日', width: 100, value: 'updated_at', sortable: false }
      ]
    }
  },
  computed: {
    recentCompanies () {
      const copyCompanies = Array.from(this.$store.state.company.list)
      return copyCompanies.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
        return 0
      })
    },
    currentCompany () {
      const companyId = this.$store.state.company.current
      return companyId
    }
  },
  methods: {
    async createCompany () {
      if (this.params.company.name === '') {
        const color = '#D50000'
        const msg = 'カンパニー名を入力して下さい😀'
        const timeout = '4000'
        console.log('から')
        this.$store.dispatch('getToast', { msg, color, timeout })
      } else {
        this.loading = true
        await this.$axios.$post('api/v1/companies', this.params)
          .then(response => this.successCompanyCreate(response))
          .catch(error => this.failureCompanyCreate(error))
        this.loading = false
        this.newCompanyDialog = false
        this.params.company.name = ''
      }
    },
    successCompanyCreate (response) {
      const companyId = response.id
      this.$router.push({ path: `/company/${companyId}/CompanyDetails` })
      alert('カンパニーが新規作成されました')
    },
    failureCompanyCreate (error) {
      console.log(error)
    }
  }
}
</script>

<style lang="scss">
#companies {
  .v-parallax__content {
    padding: 0;
  }
}
</style>
