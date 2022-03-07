<template>
  <div
    id="projects"
  >
    <v-parallax>
      <v-img
        :src="homeImg"
        alt="homeImg"
        :aspect-ratio="16/9"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
      >
        <v-container
          fill-height
        >
          <v-row
            justify="center"
            align="center"
          >
            <v-col
              cols="12"
              :sm="container.sm"
              :md="container.md"
            >
              <v-card-title
                class="white--text"
              >
                最近の個人プロジェクト
              </v-card-title>

              <v-divider
                dark
                class="mb-4"
              />

              <v-row
                align="center"
              >
                <!-- プロジェクトの追加 -->
                <v-col
                  cols="12"
                  :sm="card.sm"
                  :md="card.md"
                >
                  <v-btn
                    block
                    :height="card.height"
                    :elevation="card.elevation"
                    @click="newProjectDialog = true"
                  >
                    <div>
                      <v-icon
                        size="24"
                        color="myblue"
                        class="my-2 pl-1"
                      >
                        mdi-plus
                      </v-icon>
                      <div
                        class="caption myblue--text"
                      >
                        プロジェクトを追加
                      </div>
                    </div>
                  </v-btn>
                </v-col>
                <!-- 最近のプロジェクト -->
                <v-col
                  v-for="(project, i) in incompleteProjects.slice(0, 2)"
                  :key="`card-project-${i}`"
                  cols="12"
                  :sm="card.sm"
                  :md="card.md"
                >
                  <v-card
                    block
                    :height="card.height"
                    :elevation="card.elevation"
                    :to="$my.projectLinkTo(project.id)"
                    class="v-btn text-capitalize"
                  >
                    <v-card-title
                      class="pb-1 d-block text-truncate"
                    >
                      {{ project.title }}
                    </v-card-title>
                    <v-card-text
                      class="caption"
                    >
                      <v-icon
                        size="14"
                      >
                        mdi-update
                      </v-icon>
                      {{ $my.dateFormat(project.updated_at) }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-parallax>
    <!-- 全てのプロジェクト -->
    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          :sm="container.sm"
          :md="container.md"
        >
          <v-card-title>
            個人プロジェクト一覧
          </v-card-title>

          <v-divider class="mb-4" />

          <v-data-table
            :headers="tableHeaders"
            :items="incompleteProjects"
            item-key="id"
          >
            <template #[`item.id`]="{ item }">
              {{ item.id }}
            </template>
            <template #[`item.title`]="{ item }">
              <nuxt-link
                :to="$my.projectLinkTo(item.id)"
                class="text-decoration-none"
              >
                {{ item.title }}
              </nuxt-link>
            </template>
            <template #[`item.created_at`]="{ item }">
              {{ $my.dateFormat(item.created_at) }}
            </template>
            <template #[`item.updated_at`]="{ item }">
              {{ $my.dateFormat(item.updated_at) }}
            </template>
            <template #no-data>
              <h3>プロジェクトがありません</h3>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <!-- newProjectのdialog ------------------------------------------------->
    <v-dialog
      v-model="newProjectDialog"
      max-width="600px"
    >
      <v-card
        max-width="700"
      >
        <v-card-title class="my-0 pt-5">
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
    </v-dialog>
  </div>
</template>

<script>
import homeImg from '~/assets/images/logged-in/home.png'
export default {
  name: 'PagesProjects',
  layout: 'logged-in',
  middleware: ['get-project-list'],
  data () {
    return {
      params: { project: { title: '', content: '' } },
      newProjectDialog: false,
      loading: false,
      homeImg,
      container: {
        sm: 10,
        md: 8
      },
      card: {
        sm: 6,
        md: 4,
        height: 120,
        elevation: 4
      },
      tableHeaders: [
        { text: 'ID', width: 50, value: 'id', sortable: false },
        { text: 'プロジェクト名', value: 'title', sortable: false },
        { text: '作成日', width: 150, value: 'created_at', sortable: false },
        { text: '更新日', width: 150, value: 'updated_at', sortable: false }
      ]
    }
  },
  computed: {
    recentProjects () {
      const copyProjects = Array.from(this.$store.state.project.list)
      return copyProjects.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
        return 0
      })
    },
    // completed:falseステータスのprojectsを返す
    incompleteProjects () {
      const projectList = []
      this.recentProjects.forEach((project) => {
        if (!project.completed) {
          projectList.push(project)
        }
      })
      return projectList
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

<style lang="scss">
#projects {
  .v-parallax__content {
    padding: 0;
  }
}
</style>
