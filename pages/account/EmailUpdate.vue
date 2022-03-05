<template>
  <div />
</template>
<script>
export default {
  middleware: ['authentication'],
  async asyncData ({ route }) {
    const token = await route.query.token
    return { token }
  },
  data () {
    return {
      params: { user: { email: '' } }
    }
  },
  async created () {
    if (this.token) { await this.verifyToken() }
  },
  methods: {
    async verifyToken () {
      const headers = {
        headers: { Authorization: `Bearer ${this.token}` }
      }
      await this.$axios.$put('/api/v1/email_updates', {}, headers)
        .then(response => this.validToken(response))
        .catch(error => this.invalidToken(error))
    },
    validToken (response) {
      const msg = response.msg
      const color = response.color
      this.$store.dispatch('getToast', { msg, color })
      this.$router.push('/AccountDetails/settings')
    },
    invalidToken (error) {
      if (error.response && error.response.status === 404) {
        const timeout = 4000
        const msg = '404無効なURLです。再度お手続きをお願いいたします😢'
        this.$store.dispatch('getToast', { msg, timeout })
      }
      this.$router.push('/AccountDetails/settings')
    }
  }
}
</script>
