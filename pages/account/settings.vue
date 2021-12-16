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
        <v-card-actions class="mr-15 py-0">
          <v-text-field
            v-model="params.user.email"
            label="email"
            :rules="emailRules"
            placeholder="メールアドレス"
          />
          <v-btn
            color="primary"
            class="mr-15 ml-5 mb-4"
            :loading="loading"
            @click="UserMailEdit"
          >
            更新
          </v-btn>
        </v-card-actions>
      </v-card-text>

      <v-divider
        class="mx-4"
      />
      <v-form>
        <v-card-text>
          <v-card-subtitle class=" mb-0 text-subtitle-1">
            <v-icon class="mb-1">
              mdi-lock-outline
            </v-icon>
            パスワード
          </v-card-subtitle>
          <v-card-actions class="mr-15 py-0">
            <user-form-password
              v-model="params.user.password"
              :password.sync="params.user.password"
              set-validation
            />
            <v-btn
              color="primary"
              class="mr-15 ml-5 mb-4"
              :loading="loading"
              @click="UserPasswordEdit"
            >
              更新
            </v-btn>
          </v-card-actions>
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
  data () {
    return {
      show: false,
      isValid: false,
      loading: false,
      params: { user: { id: '', name: '', email: '', password: '', user_profile: '' } },
      emailRules: [
        // 入力必須
        v => !!v || '',
        // 書式チェック(rails側でしっかりしたcheckしているので簡易的)
        v => /.+@.+\..+/.test(v) || ''
      ]
    }
  },
  async mounted () {
    await this.$axios.get('/api/v1/users')
      .then(response => this.setCurrentUserSettings(response))
  },
  methods: {
    setCurrentUserSettings (response) {
      console.log('確認したい')
      console.log(response.data)
      this.params.user.name = response.data.name
      this.params.user.email = response.data.email
      this.params.user.password = response.data.password
      this.params.user.id = response.data.id
      this.params.user.user_profile = response.data.user_profile
    },
    async UserMailEdit () {
      this.loading = true
      await this.$axios.$put('/api/v1/users', this.params)
        .then(response => this.emailEditComplete(response))
        .catch(error => this.emailEditError(error))
      this.loading = false
    },
    emailEditComplete (response) {
      // TODO削除
      console.log(response)
    },
    emailEditError (error) {
      console.log(error)
    },
    async UserPasswordEdit () {
      console.log('ここではpasswordちゃんと送れている')
      console.log(this.params.user.password)
      console.log('UserPasswordeEdit発火')
      console.log(this.params)
      this.loading = true
      await this.$axios.$put('/api/v1/users', this.params)
        .then(response => this.profileEditComplete(response))
        .catch(error => this.profileError(error))
      this.loading = false
    },
    profileEditComplete (response) {
      alert('プロフィールの更新が完了しました')
      location.reload('ユーザー名の更新が完了しました')
    },
    profileEditError (error) {
      console.log(error)
    }
  }
}
</script>
