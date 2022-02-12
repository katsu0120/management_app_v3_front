<template>
  <user-form-card>
    <template #user-form-card-content>
      <v-form
        ref="form"
        v-model="isValid"
        @submit.prevent="passwordUpdate"
      >
        <user-form-reset-password
          :password.sync="params.user.password"
          set-validation
        />
        <user-form-password-confirmation
          :password.sync="confirmation"
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
          新しいパスワード変更
        </v-btn>
      </v-form>
    </template>
  </user-form-card>
</template>

<script>
export default {
  name: 'PagesPasswordResetResetting',
  middleware: ['authentication'],
  data () {
    return {
      isValid: false,
      loading: false,
      confirmation: '',
      params: { user: { password: '' } }
    }
  },
  computed: {

  },
  methods: {
    async passwordUpdate () {
      this.loading = true
      if (this.isValid && this.params.user.password === this.confirmation) {
        await this.$axios.$put('/api/v1/password_resets', this.params)
          .then(response => this.successfullPasswordReset(response))
          .catch(error => this.failedPasswordReset(error))
      } else {
        this.confirmationError()
      }
      this.loading = false
    },
    confirmationError () {
      const color = '#D50000'
      const msg = 'パスワードに相違があります😥'
      return this.$store.dispatch('getToast', { msg, color })
    },
    successfullPasswordReset (response) {
      console.log('successfullPasswordReset', response)
      alert('パスワードの変更が完了しました')
      this.$router.push('/')
    },
    // emailユーザーが見つからない場合の処理
    failedPasswordReset (error) {
      console.log('failedPasswordReset', error.response)
    }
  }
}
</script>
