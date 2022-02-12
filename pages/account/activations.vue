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
    if (this.token) { await this.verifyToken() }
    // TODO削除
    console.log('この下がcreate')
    console.log(this.token)
    // ③ トークンがnullの場合、何もせずリダイレクト
    this.$router.replace('/')
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
      alert('会員登録が完了しました')
      // ルートリダイレクト
      this.$router.push('/')
    }
  }
}
</script>
