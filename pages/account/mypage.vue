<template>
  <div>
    <v-card
      :loading="loading"
      class="mx-auto my-12"
      max-width="700"
    >
      <v-card-title class="py-4 pb-1">
        <h3>
          プロフィール
        </h3>
      </v-card-title>
      <v-divider
        class="mx-4"
      />

      <v-card-text>
        <v-card-subtitle class=" mb-0 text-subtitle-1">
          <v-icon class="mb-1">
            mdi-account
          </v-icon>
          ユーザー名
        </v-card-subtitle>
        <v-row>
          <v-col
            cols="12"
            xs="12"
            sm="10"
            md="10"
            lg="10"
            xl="10"
          >
            <v-card-actions>
              <v-text-field
                v-model="userinformation.name"
                label="name"
                :rules="nameRules"
                :counter="max"
                placeholder="あなたの表示名"
              />
              <v-btn
                color="primary"
                class="ml-2 mb-4"
                :loading="loading"
                @click="UserNameEdit"
              >
                更新
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider
        class="mx-4"
      />
      <v-card-text>
        <v-card-subtitle class=" mb-0 text-subtitle-1">
          <v-icon class="mb-1 mr-1">
            mdi-note-text-outline
          </v-icon>
          プロフィール文
        </v-card-subtitle>
        <v-row>
          <v-col
            cols="12"
            xs="12"
            sm="10"
            md="10"
            lg="10"
            xl="10"
          >
            <v-card-actions>
              <v-textarea
                v-model="userinformation.UserProfile"
                label="profile"
                auto-grow
                placeholder="ご自身のプロフィール入力"
                outlined
                rows="10"
              />
            </v-card-actions>
          </v-col>
        </v-row>
        <v-divider
          class="my-2"
        />
        <v-card-actions>
          <v-row justify="center">
            <v-btn
              color="primary"
              class="my-4"
              :loading="loading"
              @click="UserProfileEdit"
            >
              更新
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  middleware: ['get-user-current'],
  data () {
    const max = 30
    return {
      isValid: false,
      loading: false,
      params: { user: { id: '', name: '', email: '', user_profile: '' } },
      max,
      nameRules: [
        // 入力必須
        v => !!v || '',
        // 30文字まで
        v => (!!v && max >= v.length) || `${max}文字以内で入力して下さい`
      ]
    }
  },
  computed: {
    userinformation () {
      const id = this.$store.state.user.information.data.id
      const name = this.$store.state.user.information.data.name
      const email = this.$store.state.user.information.data.email
      const UserProfile = this.$store.state.user.information.data.user_profile
      return { id, name, email, UserProfile }
    }
  },
  methods: {
    async UserNameEdit () {
      const sure = confirm('ユーザー名を変更します。よろしいですか?')
      if (sure) {
        this.loading = true
        await this.$axios.$put('/api/v1/users', this.userinformation)
          .then(response => this.nameEditComplete(response))
          .catch(error => this.nameEditError(error))
        this.loading = false
      }
    },
    nameEditComplete (response) {
      // this.store.dispatch('getCurrentUser', userName)
      // const msg = 'すでに会員登録されております'
      // const color = 'error'
      // this.$store.dispatch('getToast', { msg, color })
      alert('ユーザー名の更新が完了しました')
      // location.reload('ユーザー名の更新が完了しました')
    },
    nameEditError (error) {
      console.log(error)
    },
    async UserProfileEdit () {
      this.params.user.id = this.userinformation.id
      this.params.user.name = this.userinformation.name
      this.params.user.email = this.userinformation.email
      this.params.user.user_profile = this.userinformation.UserProfile
      // TODO削除
      // キャメルケースでparams渡すとuser_profileの更新がうまくいかないので
      this.loading = true
      await this.$axios.$put('/api/v1/users', this.params)
        .then(response => this.profileEditComplete(response))
        .catch(error => this.profileError(error))
      this.loading = false
    },
    profileEditComplete (response) {
      // TODO削除
      // console.log('この下がprofileレスポンス')
      // console.log(response)
      // console.log(response.user_profile)
      // TODO削除。時間があればトースト設置
      alert('プロフィールの更新が完了しました')
      // location.reload('ユーザー名の更新が完了しました')
    },
    profileEditError (error) {
      console.log(error)
    }
  }
}
</script>
