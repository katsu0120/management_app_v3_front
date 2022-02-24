<template>
  <div
    id="projects"
  >
    <v-parallax>
      <v-img
        :src="companyProjectsImg"
        alt="companyProjectsImg"
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
              :sm="topContainer.sm"
              :md="topContainer.md"
            >
              <v-card-title
                class="white--text"
              >
                <h3>{{ currentCompany.name }}の【完了済み】プロジェクト</h3>
              </v-card-title>

              <v-divider
                dark
              />
              <v-card-subtitle
                class="white--text"
              >
                完了済み共有プロジェクト
              </v-card-subtitle>

              <v-row
                align="center"
              >
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
                    :to="{ name: 'company-id-completedProject-projectId-CompletedCompanyProjectDetails', params: { id: currentCompany.id, projectId: project.id } }"
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
    <!-- 全ての共有プロジェクト ---------------------------------------->
    <v-container>
      <v-row
        justify="center"
      >
        <v-col
          cols="12"
          :sm="container.sm"
          :md="container.md"
        >
          <v-card-title>
            完了プロジェクト一覧
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
                :to="{ name: 'company-id-completedProject-projectId-CompletedCompanyProjectDetails', params: { id: currentCompany.id, projectId: item.id } }"
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
  </div>
</template>

<script>
import companyProjectsImg from '~/assets/images/logged-in/Dream_Monochromatic.png'
export default {
  layout: 'company-details',
  middleware: ['get-company-current', 'get-company-project-list'],
  data () {
    return {
      companyProjectsImg,
      newProjectDialog: false,
      loading: false,
      params: { project: { title: '', content: '', user_id: '' }, company: { id: '' } },
      container: {
        sm: 20,
        md: 20
      },
      topContainer: {
        sm: 10,
        md: 8
      },
      card: {
        sm: 6,
        md: 4,
        height: 100,
        elevation: 4
      },
      tableHeaders: [
        { text: 'ID', width: 50, value: 'id', sortable: false },
        { text: '会社ID', width: 100, value: 'company_id', sortable: false },
        { text: 'プロジェクト名', value: 'title', sortable: false },
        { text: '作成日', width: 150, value: 'created_at', sortable: false },
        { text: '完了日', width: 150, value: 'updated_at', sortable: false }
      ]
    }
  },
  computed: {
    currentCompany () {
      const company = this.$store.state.company.current
      return company
    },
    recentProjects () {
      const copyProjects = Array.from(this.$store.state.companyProject.list)
      return copyProjects.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
        return 0
      })
    },
    // completed:trueステータスのprojectsを返す
    incompleteProjects () {
      const projectList = []
      this.recentProjects.forEach((project) => {
        if (project.completed) {
          projectList.push(project)
        }
      })
      return projectList
    },
    currentUser () {
      const currentUser = this.$store.state.user.current
      return currentUser
    }
  },
  methods: {
    async create () {
      this.params.company.id = this.currentCompany.id
      this.params.project.user_id = this.currentUser.id
      this.loading = true
      await this.$axios.$post('/api/v1/company_projects', this.params)
        .then(response => this.success(response))
        .catch(error => this.createFailure(error))
      this.loading = false
      this.newProjectDialog = false
    },
    success (response) {
      const companyId = response.company_id
      const projectId = response.id
      this.$router.push({ path: `/company/${companyId}/project/${projectId}/CompletedCompanyProjectDetails` })
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
