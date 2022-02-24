<template>
  <v-container>
    <v-card
      :loading="loading"
      class="mx-auto mt-4 mb-4"
      max-width="1000"
    >
      <v-row
        justify="end"
        class="mr-2 pt-2"
      >
        <v-btn
          color="primary"
          dark
          @click="incompleteProjectDialogOpen"
        >
          未完了に戻す
        </v-btn>
        <v-btn
          color="#E53935"
          class="ml-2"
          dark
          @click="deleteProjectDialogOpen"
        >
          projectを削除
        </v-btn>
      </v-row>
      <v-card-title class="py-4 pb-1">
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
                v-model="currentProject.title"
                label="CompanyProjectTitle"
                placeholder="projectのタイトル"
                max-width="100"
                class="mb-0 text-h6"
                height="30"
                readonly
              />
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider
        class="mx-6"
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
            <v-card-actions
              class=" pb-0"
            >
              <v-textarea
                v-model="currentProject.content"
                label="content"
                auto-grow
                placeholder="プロジェクト詳細"
                outlined
                rows="8"
                class=" mb-0"
                readonly
              />
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider
        class="mx-6"
      />
      <!--  Current_CompanyProjectの完了Tasks一覧------------------------------------------------------------------------------------- -->
      <v-container>
        <v-row justify="center">
          <v-col
            cols="12"
            class="my-0"
          >
            <v-card-title>
              完了Task一覧
            </v-card-title>

            <v-divider class="mb-4" />

            <v-data-table
              :headers="tableHeaders"
              :items="incompleteTasks"
              item-key="id"
            >
              <template #[`item.id`]="{ item }">
                {{ item.id }}
              </template>
              <template #[`item.title`]="{ item }">
                {{ item.title }}
              </template>
              <template #[`item.created_at`]="{ item }">
                {{ $my.dateFormat(item.created_at) }}
              </template>
              <template #[`item.updated_at`]="{ item }">
                {{ $my.dateFormat(item.updated_at) }}
              </template>
              <template #no-data>
                <h3>タスクがありません</h3>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <!-- projectを未完了に戻すdialog ------------------------------------------------->
    <v-dialog
      v-model="incompleteProjectDialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title class="text-h5">
          プロジェクトを未完了に戻しますか？
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="incompleteProjectDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="incompleteProject"
          >
            OK
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- projectを削除するDialog ------------------------------------------------->
    <v-dialog
      v-model="deleteProjectDialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title class="text-h5">
          プロジェクトを削除しますか？
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="deleteProjectDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="deleteProject"
          >
            OK
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  layout: 'company-project-completed-details',
  middleware: ['get-company-current', 'get-company-project-list', 'get-company-project-current', 'get-company-project-task'],
  data () {
    return {
      loading: false,
      dialog: false,
      incompleteProjectDialog: false,
      deleteProjectDialog: false,
      // params一覧---------------------------------------------------------
      deleteProjectParams: { project: { id: '', title: '', content: '' }, company: { id: '' } },
      projectUpdatedAtParams: { project: { id: '', title: '', content: '', updated_at: '' }, company: { id: '' } },
      incompleteProjectParams: { project: { id: '', title: '', content: '', completed: false }, company: { id: '' } },
      tableHeaders: [
        { text: 'ID', width: 30, value: 'id', sortable: false },
        { text: 'Task名', width: 120, value: 'title', sortable: false },
        { text: '内容', width: 250, value: 'content', sortable: false },
        { text: '作成日', width: 100, value: 'created_at', sortable: false },
        { text: '更新日', width: 100, value: 'updated_at', sortable: false }
      ]
    }
  },
  computed: {
    currentCompany () {
      const company = this.$store.state.company.current
      return company
    },
    currentProject () {
      const id = this.$store.state.companyProject.current.id
      const title = this.$store.state.companyProject.current.title
      const content = this.$store.state.companyProject.current.content
      return { id, title, content }
    },
    recentProjects () {
      const copyProjects = Array.from(this.$store.state.companyProject.list)
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
    },
    recentTasks () {
      const copyTasks = Array.from(this.$store.state.companyProject.task)
      return copyTasks.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
        return 0
      })
    },
    // completedがtrueのTaskを返す
    incompleteTasks () {
      const taskList = []
      this.recentTasks.forEach((task) => {
        if (task.completed) {
          taskList.push(task)
        }
      })
      return taskList
    }
  },
  methods: {
    // Task追加や編集した場合にもprojectを最新にしてprojectを一番最新にするメソッド
    async projectUpdatedAt () {
      this.projectUpdatedAtParams.company.id = this.currentCompany.id
      this.projectUpdatedAtParams.project.id = this.currentProject.id
      this.projectUpdatedAtParams.project.title = this.currentProject.title
      this.projectUpdatedAtParams.project.content = this.currentProject.content
      this.projectUpdatedAtParams.project.updated_at = new Date()
      await this.$axios.$put('/api/v1/company_projects', this.projectUpdatedAtParams)
        .then(response => this.successUpdate(response))
        .catch(error => this.failureUpdate(error))
    },
    successUpdate (response) {
      console.log(response)
    },
    failureUpdate (error) {
      console.log(error)
    },
    // 完了projectを未完了に戻すメソッド
    incompleteProjectDialogOpen () {
      this.incompleteProjectParams.company.id = this.currentCompany.id
      this.incompleteProjectParams.project.id = this.currentProject.id
      this.incompleteProjectParams.project.title = this.currentProject.title
      this.incompleteProjectParams.project.content = this.currentProject.content
      this.incompleteProjectDialog = true
    },
    incompleteProject () {
      this.loading = true
      this.$axios.$put('/api/v1/company_projects', this.incompleteProjectParams)
        .then(response => this.successIncompleteProject(response))
        .catch(error => this.failureIncompleteProject(error))
      this.loading = false
      this.incompleteProjectDialog = false
    },
    successIncompleteProject (response) {
      alert('プロジェクトを未完了に戻しました')
      const copyProjects = Array.from(this.$store.state.companyProject.list)
      const projectList = []
      copyProjects.forEach((projects) => {
        if (this.incompleteProjectParams.project.id !== projects.id) {
          projectList.push(projects)
        }
      })
      this.$store.dispatch('getCompanyProjectList', projectList)
      this.projectUpdatedAt()
      this.$router.push(`/company/${this.currentCompany.id}/CompanyCompletedDetails`)
    },
    failureIncompleteProject (error) {
      console.log(error)
    },
    deleteProjectDialogOpen () {
      this.deleteProjectParams.company.id = this.currentCompany.id
      this.deleteProjectParams.project.id = this.currentProject.id
      this.deleteProjectParams.project.title = this.currentProject.title
      this.deleteProjectParams.project.content = this.currentProject.content
      this.deleteProjectDialog = true
    },
    async deleteProject () {
      this.loading = true
      await this.$axios.$delete('/api/v1/projects', { data: this.deleteProjectParams })
        .then(response => this.deleteComplete(response))
        .catch(error => this.deleteFailure(error))
      this.loading = false
      this.deleteProjectDialog = false
    },
    deleteComplete (response) {
      alert('プロジェクトを削除いたしました')
      const copyProjects = Array.from(this.$store.state.project.list)
      const projectList = []
      copyProjects.forEach((projects) => {
        if (this.deleteProjectParams.project.id !== projects.id) {
          projectList.push(projects)
        }
      })
      this.$store.dispatch('getCompanyProjectList', projectList)
      this.$router.push(`/company/${this.currentCompany.id}/CompanyCompletedDetails`)
    },
    deleteFailure (error) {
      console.log(error)
    }
  }
}
</script>
