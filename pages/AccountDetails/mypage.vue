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
      <v-form
        @submit.prevent="UserNameEdit"
      >
        <v-card-text>
          <v-card-subtitle class=" mb-0 text-subtitle-1">
            <v-icon class="mb-1">
              mdi-account
            </v-icon>
            ユーザー名
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
                  v-model="updateUserInformation.name"
                  label="name"
                  :rules="nameRules"
                  :counter="max"
                  autofocus
                  placeholder="あなたの表示名"
                  @input="watchName"
                />
                <v-btn
                  type="submit"
                  color="primary"
                  class="ml-2 mb-4"
                  :disabled="!isValidName || loading"
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
      <v-card-text>
        <v-card-subtitle class=" mb-0 text-subtitle-1">
          <v-icon class="mb-1 mr-1">
            mdi-note-text-outline
          </v-icon>
          プロフィール文
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
              <v-textarea
                v-model="updateUserInformation.UserProfile"
                label="profile"
                auto-grow
                autofocus
                placeholder="ご自身のプロフィール入力"
                outlined
                rows="10"
                @input="watchProfile"
              />
            </v-card-actions>
          </v-col>
        </v-row>
        <v-divider
          class="my-2"
        />
        <v-card-actions>
          <v-row justify="center">
            <v-btn
              type="submit"
              color="primary"
              class="my-4"
              :disabled="!isValidProfile || loading"
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
  middleware: ['get-user-current'],
  data () {
    const max = 30
    return {
      isValidName: false,
      isValidProfile: false,
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
  computed: {
    userinformation () {
      const id = this.$store.state.user.information.data.id
      const name = this.$store.state.user.information.data.name
      const oldName = this.$store.state.user.information.data.name
      const email = this.$store.state.user.information.data.email
      const UserProfile = this.$store.state.user.information.data.user_profile
      return { id, name, oldName, email, UserProfile }
    },
    updateUserInformation () {
      const id = this.$store.state.user.information.data.id
      const name = this.$store.state.user.information.data.name
      const oldName = this.$store.state.user.information.data.name
      const email = this.$store.state.user.information.data.email
      const UserProfile = this.$store.state.user.information.data.user_profile
      return { id, name, oldName, email, UserProfile }
    }
  },
  methods: {
    async UserNameEdit () {
      const sure = confirm('ユーザー名を変更します。よろしいですか?')
      if (sure) {
        this.loading = true
        await this.$axios.$put('/api/v1/users', this.updateUserInformation)
          .then(response => this.nameEditComplete(response))
          .catch(error => this.nameEditError(error))
        this.loading = false
      }
    },
    nameEditComplete (response) {
      const msg = response.msg
      const color = response.color
      this.$store.dispatch('getToast', { msg, color })
      // nameがダブってたら変更出来ないのでcomputedUpdateは元の名前に戻す。変更出来たら普通に変更してくれるメソッド
      this.computedUpdate()
    },
    nameEditError (error) {
      console.log(error)
    },
    async UserProfileEdit () {
      this.params.user.id = this.updateUserInformation.id
      this.params.user.name = this.updateUserInformation.name
      this.params.user.email = this.updateUserInformation.email
      this.params.user.user_profile = this.updateUserInformation.UserProfile
      this.loading = true
      await this.$axios.$put('/api/v1/users/update_profile', this.params)
        .then(response => this.profileEditComplete(response))
        .catch(error => this.profileError(error))
      this.loading = false
    },
    profileEditComplete (response) {
      const msg = response.msg
      const color = response.color
      this.$store.dispatch('getToast', { msg, color })
      this.computedUpdate()
    },
    profileEditError (error) {
      console.log(error)
    },
    watchName () {
      if (this.userinformation.name !== this.updateUserInformation.name) {
        this.isValidName = true
      } else {
        this.isValidName = false
      }
    },
    watchProfile () {
      if (this.userinformation.UserProfile !== this.updateUserInformation.UserProfile) {
        this.isValidProfile = true
      } else {
        this.isValidProfile = false
      }
    },
    async computedUpdate () {
      await this.$axios.get('/api/v1/users')
        .then(user => this.$store.dispatch('getCurrentUserInformation', user))
      this.isValidName = false
      this.isValidProfile = false
    }
  }
}
</script>
