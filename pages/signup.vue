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
  data () {
    return {
      isValid: false,
      loading: false,
      params: { user: { name: '', email: '', password: '' } }
    }
  },
  methods: {
    async signup () {
      this.loading = true
      if (this.isValid) {
        await this.$axios.post('/api/v1/users', this.params)
          .then(response => this.Successful(response))
          .catch(error => this.signUpFailure(error))
      }
      this.loading = false
    },
    Successful (response) {
      alert('会員登録が完了しました')
      location.reload()
      // TODO
      // Toastデザイン。メール認証実装時はhomeにredirect
      // const msg = '登録できました!!'
      // const color = 'success'
      // this.$store.dispatch('getToast', { msg, color })
      // this.$auth.login(response)
      // setTimeout(() => {
      //   location.reload()
      // }, 1500)
    },
    signUpFailure ({ response }) {
      const msg = 'すでに会員登録されております'
      const color = 'error'
      this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
