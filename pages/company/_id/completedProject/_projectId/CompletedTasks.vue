<template>
  <v-container>
    <!--  Current_CompanyProjectのTasks一覧------------------------------------------------------------------------------------- -->
    <v-card>
      <v-container>
        <v-row justify="center">
          <v-col
            cols="12"
            class="my-0"
          >
            <v-card-title>
              完了済みTask一覧
            </v-card-title>

            <v-divider class="mb-4" />

            <v-data-table
              :headers="tableHeaders"
              :items="completeTasks"
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
  </v-container>
</template>

<script>
export default {
  layout: 'company-project-completed-details',
  middleware: ['get-company-current', 'get-company-project-list', 'get-company-project-current', 'get-company-project-task'],
  data () {
    return {
      loading: false,
      undoTaskDialog: false,
      deleteDialog: false,
      // params一覧---------------------------------------------------------
      undoTaskParams: { project: { id: '' }, task: { id: '', title: '', content: '', completed: false }, company: { id: '' } },
      deleteTaskParams: { project: { id: '' }, task: { id: '', title: '', content: '' }, company: { id: '' } },
      projectUpdatedAtParams: { project: { id: '', title: '', content: '', updated_at: '' }, company: { id: '' } },
      tableHeaders: [
        { text: 'ID', width: 30, value: 'id', sortable: false },
        { text: 'Task名', width: 120, value: 'title', sortable: false },
        { text: '内容', width: 250, value: 'content', sortable: false },
        { text: '最終更新者', width: 100, value: 'updater', sortable: false },
        { text: '完了日', width: 100, value: 'updated_at', sortable: false },
        { text: '作成日', width: 100, value: 'created_at', sortable: false }
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
    // completed:trueステータスのprojectsを返す
    completeProjects () {
      const projectList = []
      this.recentProjects.forEach((project) => {
        if (project.completed) {
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
    // completedがfalseのTaskを返す
    completeTasks () {
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
    },
    failureUpdate (error) {
      console.log(error)
    },
    undoTaskDialogOpen (item) {
      this.undoTaskParams.company.id = this.currentCompany.id
      this.undoTaskParams.project.id = this.currentProject.id
      this.undoTaskParams.task.id = item.id
      this.undoTaskParams.task.title = item.title
      this.undoTaskParams.task.content = item.content
      this.undoTaskDialog = true
    },
    async undoTask () {
      this.loading = true
      await this.$axios.$put('/api/v1/company_tasks', this.undoTaskParams)
        .then(response => this.succecUndoTask(response))
        .catch(error => this.undoTaskFailure(error))
      this.loading = false
      this.undoTaskDialog = false
    },
    succecUndoTask (response) {
      const ChangeBeforeTask = this.undoTaskParams.task.id
      const copyTasks = Array.from(this.$store.state.companyProject.task)
      const taskList = []
      copyTasks.forEach((tasks) => {
        if (ChangeBeforeTask !== tasks.id) {
          taskList.push(tasks)
        }
      })
      this.$store.dispatch('getCompanyTasks', taskList)
      this.projectUpdatedAt()
    },
    undoTaskFailure (error) {
      console.log(error)
    },
    deleteDialogOpen (item) {
      this.deleteTaskParams.company.id = this.currentCompany.id
      this.deleteTaskParams.project.id = this.currentProject.id
      this.deleteTaskParams.task.id = item.id
      this.deleteTaskParams.task.title = item.title
      this.deleteTaskParams.task.content = item.content
      this.deleteDialog = true
    },
    async deleteTask () {
      this.loading = true
      await this.$axios.$delete('/api/v1/company_tasks', { data: this.deleteTaskParams })
        .then(response => this.successDelete(response))
        .catch(error => this.failureDelete(error))
      this.loading = false
      this.deleteDialog = false
    },
    successDelete (response) {
      const ChangeBeforeTask = response.id
      const copyTasks = Array.from(this.$store.state.companyProject.task)
      const taskList = []
      copyTasks.forEach((tasks) => {
        if (ChangeBeforeTask !== tasks.id) {
          taskList.push(tasks)
        }
      })
      this.$store.dispatch('getCompanyTasks', taskList)
      this.projectUpdatedAt()
    },
    failureDelete (error) {
      console.log(error)
    }
  }
}
</script>
