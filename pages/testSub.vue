<template>
  <!-- TODO削除 -->
  <div>
    <v-btn
      @click="cardDialog = true"
    >
      cardDialog
    </v-btn>
    <v-dialog
      v-model="cardDialog"
    >
      <v-card
        class="mx-auto my-12"
        max-width="700"
      >
        <v-card-title class="ml-2 pb-0 pt-4">
          新規プロジェクトの作成
        </v-card-title>
        <v-card-title class="py-0 my-0">
          <v-row>
            <v-col
              cols="12"
              xs="10"
              sm="10"
              md="10"
              lg="10"
              xl="10"
            >
              <v-card-actions>
                <v-text-field
                  label="NewProjectTitle"
                  placeholder="新規プロジェクトのタイトル"
                  autofocus
                  max-width="100"
                  class="my-0 text-h6"
                />
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider
          class="mx-2 my-0"
        />
        <v-card-text>
          <v-card-subtitle class=" mb-0 pr-1 py-1">
            プロジェクト内容
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
                  label="content"
                  placeholder="プロジェクト詳細"
                  autofocus
                  outlined
                  rows="10"
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
                  >
                    新規作成
                  </v-btn>
                </v-row>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      cardDialog: false,
      tab: null,
      findName: 'user',
      keyword: '',
      loading: false,
      posts: [],
      users: [],
      followingUsers: []
    }
  },
  computed: {
  },
  methods: {
    async find () {
      // TODO削除
      await console.log(this.params)
      this.users = []
      const url = 'api/v1/finders'
      await this.$axios.get(url, { params: { findName: this.findName } })
        .then((res) => {
          const search = res.data
          console.log('下がサーチ')
          console.log(search)
          search.forEach((users) => {
            this.users.push(users)
          })
          // this.users.push(res.data)
          // console.log('下がusers')
          // console.log(this.users)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 下は関係ないとりあえず保留
    // TODO削除
    search () {
      this.loading = true
      const url = 'api/v1/search'
      this.$axios.get(url, { params: { keyword: this.keyword } })
        .then((res) => {
          this.posts = res.data.posts
          this.users = res.data.users
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchFolowingUser () {
      const url = `api/v1/users/${this.currentUserId}/following_users`
      this.$axios.get(url)
        .then((res) => {
          this.followingUsers = res.data.following_users
        })
        .catch((err) => {
          console.log(err)
        })
    },
    pageBack () {
      this.$router.go(-1)
    }
  }
}
</script>
