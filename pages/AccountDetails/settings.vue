<template>
  <div>
    <v-card
      :loading="loading"
      class="mx-auto my-12"
      max-width="700"
    >
      <v-card-title class="py-4 pb-1">
        <h3>
          設定
        </h3>
      </v-card-title>
      <v-divider
        class="mx-4"
      />

      <v-card-text>
        <v-card-subtitle class=" mb-0 text-subtitle-1">
          <v-icon class="mb-1">
            mdi-email-outline
          </v-icon>
          メールアドレス
        </v-card-subtitle>
        <v-row>
          <v-col
            cols="12"
            xs="12"
            sm="10"
            md="10"
            lg="10"
            xl="10"
          >
            <v-card-actions>
              <v-text-field
                v-model="userInformation.newEmail"
                label="email"
                :rules="emailRules"
                placeholder="メールアドレス"
                autofocus
                @input="watchEmailBtn"
              />
              <v-btn
                color="primary"
                class="ml-2 mb-4"
                :disabled="!isValidEmailBtn || loading"
                @click="userMailUpdate"
              >
                変更
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider
        class="mx-4"
      />
      <v-form
        v-model="isValid"
        @submit.prevent="passwordUpdate"
      >
        <v-card-text>
          <v-card-subtitle class=" mb-0 text-subtitle-1">
            <v-icon class="mb-1">
              mdi-lock-outline
            </v-icon>
            パスワード変更
          </v-card-subtitle>
          <v-row>
            <v-col
              cols="12"
              xs="10"
              sm="9"
              md="9"
              lg="9"
              xl="9"
              class="py-0"
            >
              <v-card-actions
                class="pb-0 pl-0"
              >
                <v-col
                  class="py-0"
                >
                  <user-form-password
                    :password.sync="params.user.password"
                    set-validation
                  />
                </v-col>
              </v-card-actions>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              xs="12"
              sm="9"
              md="9"
              lg="9"
              xl="9"
              class="py-0"
            >
              <v-card-actions
                class="py-0 pl-0"
              >
                <v-col
                  class="py-0 pt-0"
                >
                  <user-form-reset-password
                    :password.sync="params.user.new_password"
                    set-validation
                  />
                </v-col>
              </v-card-actions>
            </v-col>
          </v-row>
          <v-divider
            class="mx-4 mt-4"
          />
          <v-row justify="center">
            <v-card-actions>
              <v-btn
                color="primary"
                type="submit"
                :disabled="!isValid || loading"
                class="ml-2 mt-6 mb-2"
                :loading="loading"
                @click="passwordAuthenticate"
              >
                変更
              </v-btn>
            </v-card-actions>
          </v-row>
        </v-card-text>
      </v-form>

      <v-divider
        class="mx-4"
      />
    </v-card>
  </div>
</template>

<script>
export default {
  middleware: ['get-user-current'],
  data () {
    return {
      show: false,
      isValid: false,
      isValidEmailBtn: false,
      loading: false,
      emailUpdateparams: { user: { id: '', old_email: '', new_email: '' } },
      emailRules: [
        // 入力必須
        v => !!v || '',
        // 書式チェック(rails側でしっかりしたcheckしているので簡易的)
        v => /.+@.+\..+/.test(v) || ''
      ],
      params: { user: { password: '', new_password: '' } }
    }
  },
  computed: {
    userInformation () {
      const id = this.$store.state.user.information.data.id
      const name = this.$store.state.user.information.data.name
      const oldEmail = this.$store.state.user.information.data.email
      const newEmail = this.$store.state.user.information.data.email
      const userProfile = this.$store.state.user.information.data.user_profile
      return { id, name, oldEmail, newEmail, userProfile }
    }
  },
  methods: {
    async userMailUpdate () {
      const sure = confirm('emailを変更します。よろしいですか')
      this.emailUpdateparams.user.id = this.userInformation.id
      this.emailUpdateparams.user.old_email = this.userInformation.oldEmail
      this.emailUpdateparams.user.new_email = this.userInformation.newEmail
      if (sure) {
        this.loading = true
        await this.$axios.$post('/api/v1/email_updates', this.emailUpdateparams)
          .then(response => this.emailUpdateComplete(response))
          .catch(error => this.emailUpdateError(error))
        this.loading = false
      }
    },
    emailUpdateComplete (response) {
      const color = '#2979FF'
      const msg = '変更アドレスに認証メールを送信しました。10分以内に変更のご確認をお願い致します'
      this.$store.dispatch('getToast', { msg, color })
    },
    emailUpdateError (error) {
      console.log(error)
    },
    async passwordAuthenticate () {
      this.loading = true
      await this.$axios.$post('/api/v1/password_updates/password_authentication', this.params)
        .then(response => this.authenticateComplete(response))
        .catch(error => this.authenticateFailure(error))
      this.loading = false
    },
    authenticateComplete (response) {
      if (!response.status) {
        const msg = response.msg
        const color = response.color
        return this.$store.dispatch('getToast', { msg, color })
      } else {
        this.PasswordUpdate()
      }
    },
    authenticateFailure (error) {
      console.log(error)
    },
    async PasswordUpdate () {
      this.loading = true
      await this.$axios.$put('/api/v1/password_updates', this.params)
        .then(response => this.passwordEditComplete(response))
        .catch(error => this.passwordEditError(error))
      this.loading = false
    },
    passwordEditComplete (response) {
      const msg = response.msg
      const color = response.color
      this.$store.dispatch('getToast', { msg, color })
    },
    passwordEditError (error) {
      console.log(error)
    },
    watchEmailBtn () {
      if (this.userInformation.oldEmail !== this.userInformation.newEmail) {
        this.isValidEmailBtn = true
      } else {
        this.isValidEmailBtn = false
      }
    }
  }
}
</script>

<style lang="scss">
#passbtn {
  margin-right: 70px;
  padding-bottom: 60px;
}
</style>
