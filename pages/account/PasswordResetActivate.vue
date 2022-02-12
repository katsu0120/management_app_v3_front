<template>
  <div />
</template>
<script>
export default {
  async asyncData ({ route }) {
    const token = await route.query.token
    return { token }
  },
  async created () {
    if (this.token) {
      await this.verifyToken()
    }
    await this.$router.replace('/account/PasswordResetResetting')
  },
  methods: {
    async verifyToken () {
      const headers = {
        headers: { Authorization: `Bearer ${this.token}` }
      }
      await this.$axios.$get('/api/v1/password_resets', headers)
        .then(response => this.validToken(response))
        .catch(error => this.invalidToken(error))
    },
    validToken (response) {
      this.$auth.login(response)
      this.$router.push('/account/PasswordResetResetting')
    },
    invalidToken (error) {
      console.log(error)
    }
  }
}
</script>
