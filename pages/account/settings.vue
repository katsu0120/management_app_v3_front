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
                v-model="userinformation.email"
                label="email"
                :rules="emailRules"
                placeholder="メールアドレス"
              />
              <v-btn
                color="primary"
                class="ml-2 mb-4"
                :loading="loading"
                @click="UserMailEdit"
              >
                更新
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
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
                <user-form-password
                  set-validation
                />
                <v-btn
                  color="primary"
                  class="ml-2 mb-4"
                  :loading="loading"
                  @click="UserPasswordEdit"
                >
                  更新
                </v-btn>
              </v-card-actions>
            </v-col>
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
      loading: false,
      // params: { user: { id: '', name: '', email: '', user_profile: '' } },
      emailRules: [
        // 入力必須
        v => !!v || '',
        // 書式チェック(rails側でしっかりしたcheckしているので簡易的)
        v => /.+@.+\..+/.test(v) || ''
      ]
    }
  },
  computed: {
    userinformation () {
      const id = this.$store.state.user.information.data.id
      const name = this.$store.state.user.information.data.name
      const email = this.$store.state.user.information.data.email
      const UserProfile = this.$store.state.user.information.data.user_profile
      return { id, name, email, UserProfile }
    }
  },
  methods: {
    async UserMailEdit () {
      const sure = confirm('emailを変更します。よろしいですか')
      if (sure) {
        // this.params.user.email = this.userinformation.email
        // console.log('下が発火')
        // console.log(this.params.user.email)
        this.loading = true
        await this.$axios.$put('/api/v1/users', this.userinformation)
          .then(response => this.emailEditComplete(response))
          .catch(error => this.emailEditError(error))
        this.loading = false
      }
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
