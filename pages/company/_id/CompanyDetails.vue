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
              :sm="container.sm"
              :md="container.md"
            >
              <v-card-title
                class="white--text"
              >
                最近の共有プロジェクト
                カンパニー{{ $store.state.company.current }}
                {{ $route.fullPath }}
                urlを表示させる{{ URL }}
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
                    to="/newProject"
                  >
                    <div>
                      <v-icon
                        size="24"
                        color="myblue"
                        class="my-2 pl-10"
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
                  v-for="(project, i) in recentProjects.slice(0, 2)"
                  :key="`card-project-${i}`"
                  cols="12"
                  :sm="card.sm"
                  :md="card.md"
                >
                  <v-card
                    block
                    :height="card.height"
                    :elevation="card.elevation"
                    :to="{ name: 'company-id-project-projectId-CompanyProjectDetails', params: { id: currentCompany, projectId: project.id } }"
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
            プロジェクト一覧
          </v-card-title>

          <v-divider class="mb-4" />

          <v-data-table
            :headers="tableHeaders"
            :items="recentProjects"
            item-key="id"
          >
            <template #[`item.id`]="{ item }">
              {{ item.id }}
            </template>
            <template #[`item.title`]="{ item }">
              <nuxt-link
                :to="{ name: 'company-id-project-projectId-CompanyProjectDetails', params: { id: currentCompany, projectId: item.id } }"
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
import companyProjectsImg from '~/assets/images/logged-in/Conference presentation _Monochromatic.png'
export default {
  name: 'PagesProjects',
  layout: 'company',
  data () {
    return {
      companyProjectsImg,
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
        { text: '会社ID', width: 100, value: 'company_id', sortable: false },
        { text: 'プロジェクト名', value: 'title', sortable: false },
        { text: '作成日', width: 150, value: 'created_at', sortable: false },
        { text: '更新日', width: 150, value: 'updated_at', sortable: false }
      ]
    }
  },
  computed: {
    currentCompany () {
      const companyId = this.$store.state.company.current.id
      return companyId
    },
    URL () {
      const url = `company/${this.currentCompany}/project//CompanyProjectDetails`
      return url
    },
    recentProjects () {
      const copyProjects = Array.from(this.$store.state.companyProject.list)
      return copyProjects.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
        return 0
      })
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
