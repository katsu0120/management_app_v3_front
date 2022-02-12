<template>
  <user-form-card>
    <template #user-form-card-content>
      <v-form
        ref="form"
        v-model="isValid"
        @submit.prevent="sendResetMail"
      >
        <user-form-email
          :email.sync="params.user.email"
          placeholder
        />
        <v-btn
          type="submit"
          :disabled="!isValid || loading"
          :loading="loading"
          block
          class="white--text"
          color="appblue"
        >
          認証メール送信
        </v-btn>
      </v-form>
    </template>
  </user-form-card>
</template>

<script>
export default {
  name: 'PagesPasswordReset',
  layout: 'before-login',
  data () {
    return {
      isValid: false,
      loading: false,
      params: { user: { email: 'gragrand5858@gmail.com' } }
    }
  },
  methods: {
    async sendResetMail () {
      this.loading = true
      if (this.isValid) {
        console.log('下がconsole')
        console.log(this.params)
        await this.$axios.$post('/api/v1/password_resets', this.params)
          .then(response => this.successfullySentResetMail(response))
          .catch(error => this.failedSendResetMail(error))
      }
      this.loading = false
    },
    // サーバ側でメール送信が成功した場合
    successfullySentResetMail (response) {
      console.log('successfullySentResetMail', response)
    },
    // emailユーザーが見つからない場合の処理
    failedSendResetMail (error) {
      console.log('failedSendResetMail', error.response)
    }
  }
}
</script>
