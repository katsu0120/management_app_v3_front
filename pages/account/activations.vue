<template>
  <div />
</template>
<script>
export default {
  // ① URLのクエリからトークンを取得
  async asyncData ({ route }) {
    const token = await route.query.token
    return { token }
  },
  async created () {
    // ② トークンが存在する場合、トークンを検証する
    if (this.token) {
      await this.verifyToken()
    } else {
    // ③ トークンがnullの場合、何もせずリダイレクト
      // alert('無効なURLです。再度お手続きをやり直して下さい😭')
      await this.$router.replace('/')
    }
  },
  methods: {
    async verifyToken () {
      const headers = {
        headers: { Authorization: `Bearer ${this.token}` }
      }
      // ④ リクエストヘッダーにトークンをつけて、認証コントローラーへ渡す
      await this.$axios.$get('/api/v1/account_activations', headers)
        .then(response => this.validToken(response))
      // ⑤トークンが検証エラーを吐いた場合、「もう一度処理を行ってください」などのトースターを出力する
        .catch(error => this.invalidToken(error))
    },
    // ⑥ トークンの検証に成功した場合、ログインフラグをtrueとし、ログイン画面を表示する
    validToken (response) {
      this.$auth.login(response)
      const msg = '会員登録が完了いたしました。マネジメントアップをお楽しみ下さい😄'
      const color = 'success'
      this.$store.dispatch('getToast', { msg, color })
      this.$router.push('/AccountDetails/mypage')
      setTimeout(() => {
        this.$router.push('/')
      }, 3000)
    },
    invalidToken (error) {
      console.log(error)
      this.$router.push('/')
    }
  }
}
</script>
