<template>
  <div>
    <v-card
      :loading="loading"
      class="mx-auto my-12"
      max-width="700"
    >
      <v-card-title class="py-4 pb-1">
        <h3>
          プロフィール
        </h3>
      </v-card-title>
      <v-divider
        class="mx-4"
      />

      <v-card-text>
        <v-card-subtitle class=" mb-0 text-subtitle-1">
          <v-icon class="mb-1">
            mdi-account
          </v-icon>
          ユーザー名
        </v-card-subtitle>
        <v-card-actions class="mr-15 py-0">
          <v-text-field
            v-model="params.user.name"
            label="name"
            :rules="nameRules"
            :counter="max"
            placeholder="あなたの表示名"
          />
          <v-btn
            color="primary"
            class="mr-15 ml-5 mb-4"
            :loading="loading"
            @click="UserNameEdit"
          >
            更新
          </v-btn>
        </v-card-actions>
      </v-card-text>

      <v-divider
        class="mx-4"
      />
      <v-card-text>
        <v-card-subtitle class=" mb-0 text-subtitle-1">
          <v-icon class="mb-1 mr-1">
            mdi-note-text-outline
          </v-icon>
          プロフィール文
        </v-card-subtitle>
        <v-card-actions class="mr-15 py-0">
          <v-textarea
            v-model="params.user.user_profile"
            label="profile"
            auto-grow
            placeholder="ご自身のプロフィール入力"
            outlined
          />
        </v-card-actions>
        <v-divider
          class="my-2"
        />
        <v-card-actions>
          <v-row justify="center">
            <v-btn
              color="primary"
              class="my-4"
              :loading="loading"
              @click="UserProfileEdit"
            >
              更新
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    const max = 30
    return {
      isValid: false,
      loading: false,
      params: { user: { id: '', name: '', email: '', user_profile: '' } },
      max,
      nameRules: [
        // 入力必須
        v => !!v || '',
        // 30文字まで
        v => (!!v && max >= v.length) || `${max}文字以内で入力して下さい`
      ]
    }
  },
  async mounted () {
    await this.$axios.get('/api/v1/users')
      .then(response => this.setCurrentUserProfile(response))
  },
  methods: {
    setCurrentUserProfile (response) {
      console.log('確認したい')
      console.log(response.data)
      this.params.user.name = response.data.name
      this.params.user.email = response.data.email
      this.params.user.password = response.data.password
      this.params.user.id = response.data.id
      this.params.user.user_profile = response.data.user_profile
      // TODO削除
      console.log(this.params.user.name)
      console.log(this.params.user.email)
      console.log(this.params.user.id)
      console.log(this.params.user.user_profile)
    },
    async UserNameEdit () {
      this.loading = true
      await this.$axios.$put('/api/v1/users', this.params)
        .then(response => this.nameEditComplete(response))
        .catch(error => this.nameEditError(error))
      this.loading = false
    },
    nameEditComplete (response) {
      // TODO削除
      // console.log(response)
      // console.log(response.name)
      // const userName = response.name
      // TODO削除。時間があればトースト設置
      alert('ユーザー名の更新が完了しました')
      location.reload('ユーザー名の更新が完了しました')
      // this.store.dispatch('getCurrentUser', userName)
      // const msg = 'すでに会員登録されております'
      // const color = 'error'
      // this.$store.dispatch('getToast', { msg, color })
    },
    nameEditError (error) {
      console.log(error)
    },
    async UserProfileEdit () {
      console.log('ここではprofileちゃんと送れている')
      console.log(this.params.user.user_profile)
      console.log('UserProfileEdit発火')
      console.log(this.params)
      this.loading = true
      await this.$axios.$put('/api/v1/users', this.params)
        .then(response => this.profileEditComplete(response))
        .catch(error => this.profileError(error))
      this.loading = false
    },
    profileEditComplete (response) {
      // TODO削除
      // console.log('この下がprofileレスポンス')
      // console.log(response)
      // console.log(response.user_profile)
      // TODO削除。時間があればトースト設置
      alert('プロフィールの更新が完了しました')
      location.reload('ユーザー名の更新が完了しました')
    },
    profileEditError (error) {
      console.log(error)
    }
  }
}
</script>
