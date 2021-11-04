<template>
  <user-form-card>
    <template #user-form-card-content>
      <v-form
        ref="form"
        v-model="isValid"
        @submit.prevent="signup"
      >
        <user-form-name
          :name.sync="params.user.name"
        />
        <user-form-email
          :email.sync="params.user.email"
          placeholder
        />
        <user-form-password
          :password.sync="params.user.password"
          set-validation
        />
        <v-btn
          type="submit"
          :disabled="!isValid || loading"
          :loading="loading"
          block
          class="white--text"
          color="appblue"
        >
          登録する
        </v-btn>
      </v-form>
    </template>
  </user-form-card>
</template>

<script>
export default {
  name: 'PagesSignup',
  layout: 'before-login',
  data ({ $store }) {
    return {
      isValid: false,
      loading: false,
      params: { user: { name: 'test', email: 'user10@example.com', password: 'password' } },
      // signInPath: $store.state.signIn.signInPath,
      redirectPath: $store.state.loggedIn.rememberPath,
      loggedInHomePath: $store.state.loggedIn.homePath
    }
  },
  methods: {
    async signup () {
      this.loading = true
      if (this.isValid) {
        await this.$axios.post('/api/v1/users', this.params)
          .then(response => this.Successful(response))
          .catch(error => this.authFailure(error))
        console.log(this.params)
      }
      this.loading = false
    },
    Successful (response) {
      console.log(response)
      // const msg = '登録できました!!'
      // const color = 'success'
      confirm('会員登録が完了しました')
      this.$auth.login(response)
      // for (const key in this.params.user) {
      //   this.params.user[key] = ''
      // }
      // this.$router.push('/')
      // this.$store.dispatch('getToast', { msg, color })
      // this.$auth.login(response)
      // 記憶ルートリダイレクト
      this.$router.push(this.redirectPath)
      // 記憶ルートを初期値に戻す
      this.$store.dispatch('getRememberPath', this.loggedInHomePath)
    },
    authFailure ({ response }) {
      const msg = 'エラーが発生しております'
      const color = 'error'
      this.$store.dispatch('getToast', { msg, color })
      // if (response && response.status === 404) {
      //   // トースター出力
      // //   const msg = 'ユーザーが見つかりません'
      //   return this.$store.dispatch('getToast', { msg })
      // }
      // return this.$my.apiErrorHandler(response)
    }
  }
}
</script>
