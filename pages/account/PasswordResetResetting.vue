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
      const color = response.color
      const msg = response.msg
      this.$store.dispatch('getToast', { msg, color })
      this.$router.push('/AccountDetails/settings')
      setTimeout(() => {
        this.$router.push('/')
      }, 3000)
    },
    failedPasswordReset (error) {
      const color = error.response.color
      const msg = error.response.msg
      this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
