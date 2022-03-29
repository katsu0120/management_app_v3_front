<template>
  <user-form-card>
    <template #user-form-card-content>
      <v-form
        ref="form"
        v-model="isValid"
        @submit.prevent="login"
      >
        <user-form-email
          :email.sync="params.auth.email"
        />
        <user-form-password
          :password.sync="params.auth.password"
        />
        <v-card-actions>
          <nuxt-link
            to="/PasswordReset"
            class="body-2 text-decoration-none"
          >
            パスワードを忘れた?
          </nuxt-link>
        </v-card-actions>
        <v-card-text class="px-0">
          <v-btn
            type="submit"
            :disabled="!isValid || loading"
            :loading="loading"
            block
            class="white--text"
            color="appblue"
          >
            ログインする
          </v-btn>
        </v-card-text>
      </v-form>
      <v-card-text class="px-0 pt-1">
        <v-btn
          :disabled="isValid || loading"
          :loading="loading"
          block
          class="white--text"
          color="appblue"
          @click="gestLogin"
        >
          ゲストでログインする
        </v-btn>
      </v-card-text>
    </template>
  </user-form-card>
</template>

<script>
export default {
  name: 'PagesLogin',
  layout: 'before-login',
  data ({ $store }) {
    return {
      isValid: false,
      loading: false,
      params: { auth: { email: '', password: '' } },
      redirectPath: $store.state.loggedIn.rememberPath,
      loggedInHomePath: $store.state.loggedIn.homePath
    }
  },
  methods: {
    async login () {
      this.loading = true
      if (this.isValid) {
        await this.$axios.$post('/api/v1/auth_token', this.params)
          .then(response => this.authSuccessful(response))
          .catch(error => this.authFailure(error))
      }
      this.loading = false
    },
    authSuccessful (response) {
      this.$auth.login(response)
      // 記憶ルートリダイレクト
      this.$router.push(this.redirectPath)
      // 記憶ルートを初期値に戻す
      this.$store.dispatch('getRememberPath', this.loggedInHomePath)
    },
    authFailure ({ response }) {
      if (response && response.status === 404) {
        // トースター出力
        const msg = 'ユーザーが見つかりません😥'
        return this.$store.dispatch('getToast', { msg })
      }
      return this.$my.apiErrorHandler(response)
    },
    async gestLogin () {
      this.params.auth.email = 'gestuser2@example.com'
      this.params.auth.password = 'password'
      console.log(this.params)
      this.loading = true
      if (!this.isValid) {
        await this.$axios.$post('/api/v1/auth_token', this.params)
          .then(response => this.authSuccessful(response))
          .catch(error => this.authFailure(error))
      }
      this.loading = false
    }
  }
}
</script>
