<template>
  <div>
    <v-card
      :loading="loading"
      class="mx-auto my-12"
      max-width="700"
    >
      <v-card-title class="py-4 pb-1">
        <h3>
          ユーザー検索テスト
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
          ユーザー検索
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
                v-model="findName"
                label="name"
                autofocus
                placeholder="あなたの表示名"
              />
              <v-btn
                color="primary"
                class="ml-2 mb-4"
                @click="find"
              >
                更新
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <h3>Userの検索結果の配列</h3>
    {{ users }}
  </div>
</template>

<script>
export default {
  middleware: ['get-user-current'],
  data () {
    return {
      users: [],
      findName: 'user',
      loading: false
    }
  },
  computed: {
  },
  methods: {
    async find () {
      await console.log(this.params)
      const url = 'api/v1/finders'
      await this.$axios.get(url, { params: { findName: this.findName } })
        .then((res) => {
          console.log('下がres')
          console.log(res)
          // console.log(res.data)
          this.users.push(res)
          console.log('下がusers')
          console.log(this.users)
        })
        .catch((err) => {
          console.log(err)
        })
    //   this.loading = true
    //   await this.$axios.$get('/api/v1/finders', this.params)
    //     .then(response => this.findSuccess(response))
    //     .catch(error => this.nameEditError(error))
    //   this.loading = false
    // },
    // findSuccess (response) {
    //   console.log(response)
    // },
    // nameEditError (error) {
    //   console.log(error)
    }
  }
}
</script>
