<template>
  <v-container>
    <v-card
      class="mx-auto my-12"
      max-width="900"
    >
      <!-- <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
      /> -->
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
                v-model="params.project.title"
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
                v-model="params.project.content"
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
                  @click="create"
                >
                  新規作成
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <nuxt-child />
  </v-container>
</template>

<script>
export default {
  name: 'PagesProject',
  layout: 'new-project',
  data () {
    return {
      loading: false,
      // params
      params: { project: { title: '', content: '' } }
    }
  },
  methods: {
    async create () {
      this.loading = true
      await this.$axios.$post('/api/v1/projects', this.params)
        .then(response => this.success(response))
        .catch(error => this.createFailure(error))
      this.loading = false
    },
    success (response) {
      const copyProjects = Array.from(this.$store.state.project.list)
      copyProjects.push(response)
      this.$store.dispatch('getProjectList', copyProjects)

      const projectId = response.id
      this.$router.push({ path: `/project/${projectId}/ProjectDetails` })
      alert('新規作成されました')
    },
    createFailure (error) {
      console.log(error)
    }
  }
}
</script>
