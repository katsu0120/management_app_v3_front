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
          color="success"
          dark
          @click="projectCompleteDialogOpen"
        >
          project完了
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
                autofocus
                @blur="editProject"
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
                autofocus
                @blur="editProject"
              />
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider
        class="mx-6"
      />
      <!--  Current_CompanyProjectのTasks一覧------------------------------------------------------------------------------------- -->
      <v-container>
        <v-row justify="center">
          <v-col
            cols="12"
            class="my-0"
          >
            <v-card-title>
              Task一覧
              <v-row justify="end">
                <v-btn
                  color="primary"
                  dark
                  @click="dialog = true"
                >
                  Task追加
                </v-btn>
              </v-row>
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
              <template #[`item.actions`]="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="taskEditDialogOpen(item)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  small
                  @click="taskCompleteDialogOpen(item)"
                >
                  mdi-check
                </v-icon>
              </template>
              <template #no-data>
                <h3>タスクがありません</h3>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <!-- ------------------------------------------------------------>
    <!-- Tasks追加のdialog -->
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Taskの追加</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-text-field
              v-model="taskCreateParams.task.title"
              label="title"
            />
            <v-textarea
              v-model="taskCreateParams.task.content"
              name="input-7-1"
              label="content"
              auto-grow
            />
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            :loading="loading"
            text
            @click="createTask"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-------------------------------------------------------------->
    <!--Taskの編集のdialog-->
    <v-dialog
      v-model="taskEditDialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Taskの編集</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-text-field
              v-model="taskEditParams.task.title"
              label="titleの編集"
            />
            <v-textarea
              v-model="taskEditParams.task.content"
              name="input-7-1"
              label="contentの編集"
              auto-grow
            />
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="taskEditDialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            :loading="loading"
            text
            @click="editTask"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Taskの完了のdialog------------------------------------------>
    <v-dialog
      v-model="taskCompleteDialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title class="text-h5">
          タスクを完了しますか？
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="taskCompleteDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="taskComplete"
          >
            OK
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- project完了のdialog ------------------------------------------------->
    <v-dialog
      v-model="projectCompleteDialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title class="text-h5">
          プロジェクトを完了しますか？
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="projectCompleteDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="projectComplete"
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
  layout: 'company-project-details',
  middleware: ['get-company-current', 'get-company-project-list', 'get-company-project-current', 'get-company-project-task'],
  data () {
    return {
      loading: false,
      dialog: false,
      taskEditDialog: false,
      taskCompleteDialog: false,
      projectCompleteDialog: false,
      // params一覧---------------------------------------------------------
      projectEditParams: { project: { id: '', title: '', content: '' }, company: { id: '' } },
      projectUpdatedAtParams: { project: { id: '', title: '', content: '', updated_at: '' }, company: { id: '' } },
      projectCompleteParams: { project: { id: '', title: '', content: '', completed: true }, company: { id: '' } },
      taskCreateParams: { company: { id: '' }, project: { id: '' }, task: { title: '', content: '' } },
      taskEditParams: { project: { id: '' }, task: { id: '', title: '', content: '' }, company: { id: '' } },
      taskCompleteParams: { project: { id: '' }, task: { id: '', title: '', content: '', completed: true }, company: { id: '' } },
      tableHeaders: [
        { text: 'ID', width: 30, value: 'id', sortable: false },
        { text: 'Task名', width: 120, value: 'title', sortable: false },
        { text: '内容', width: 250, value: 'content', sortable: false },
        { text: '状態', width: 50, value: 'completed', sortable: false },
        { text: '作成日', width: 100, value: 'created_at', sortable: false },
        { text: '更新日', width: 100, value: 'updated_at', sortable: false },
        { text: 'Actions', width: 50, class: 'pr-1', value: 'actions', sortable: false }
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
    // completedがfalseのTaskを返す
    incompleteTasks () {
      const taskList = []
      this.recentTasks.forEach((task) => {
        if (!task.completed) {
          taskList.push(task)
        }
      })
      return taskList
    }
  },
  methods: {
    async editProject () {
      this.projectEditParams.company.id = this.currentCompany.id
      this.projectEditParams.project.title = this.currentProject.title
      this.projectEditParams.project.content = this.currentProject.content
      this.projectEditParams.project.id = this.currentProject.id
      this.loading = true
      await this.$axios.$put('/api/v1/company_projects', this.projectEditParams)
        .then(response => this.successUpdate(response))
        .catch(error => this.failureUpdate(error))
      this.loading = false
    },
    successUpdate (response) {
      console.log(response)
    },
    failureUpdate (error) {
      console.log(error)
    },
    async createTask () {
      this.taskCreateParams.company.id = this.currentCompany.id
      this.taskCreateParams.project.id = this.currentProject.id
      this.loading = true
      await this.$axios.$post('/api/v1/company_tasks', this.taskCreateParams)
        .then(response => this.setState(response))
        .catch(error => this.createFailure(error))
      this.loading = false
      this.dialog = false
      this.taskCreateParams.task.title = ''
      this.taskCreateParams.task.content = ''
    },
    setState (response) {
      const copyTasks = Array.from(this.$store.state.companyProject.task)
      copyTasks.push(response)
      this.$store.dispatch('getCompanyTasks', copyTasks)
      this.projectUpdatedAt()
    },
    createFailure (error) {
      console.log(error)
    },
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
    taskEditDialogOpen (item) {
      this.taskEditParams.company.id = this.currentCompany.id
      this.taskEditParams.project.id = this.currentProject.id
      this.taskEditParams.task.id = item.id
      this.taskEditParams.task.title = item.title
      this.taskEditParams.task.content = item.content
      this.taskEditDialog = true
    },
    async editTask () {
      this.loading = true
      await this.$axios.$put('/api/v1/company_tasks', this.taskEditParams)
        .then(response => this.editComplete(response))
        .catch(error => this.editFailure(error))
      this.loading = false
      this.taskEditDialog = false
    },
    editComplete (response) {
      const ChangeBeforeTask = this.taskEditParams.task.id
      const copyTasks = Array.from(this.$store.state.companyProject.task)
      const taskList = []
      copyTasks.forEach((tasks) => {
        if (ChangeBeforeTask !== tasks.id) {
          taskList.push(tasks)
        }
      })
      taskList.push(response)
      this.$store.dispatch('getCompanyTasks', taskList)
      this.projectUpdatedAt()
    },
    editFailure (error) {
      console.log(error)
    },
    taskCompleteDialogOpen (item) {
      this.taskCompleteParams.company.id = this.currentCompany.id
      this.taskCompleteParams.project.id = this.currentProject.id
      this.taskCompleteParams.task.id = item.id
      this.taskCompleteParams.task.title = item.title
      this.taskCompleteParams.task.content = item.content
      this.taskCompleteDialog = true
    },
    async taskComplete () {
      this.loading = true
      await this.$axios.$put('/api/v1/company_tasks', this.taskCompleteParams)
        .then(response => this.successCompleteTask(response))
        .catch(error => this.taskFailure(error))
      this.loading = false
      this.taskCompleteDialog = false
    },
    successCompleteTask (response) {
      const ChangeBeforeTask = this.taskCompleteParams.task.id
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
    taskFailure (error) {
      console.log(error)
    },
    projectCompleteDialogOpen () {
      this.projectCompleteParams.company.id = this.currentCompany.id
      this.projectCompleteParams.project.id = this.currentProject.id
      this.projectCompleteParams.project.title = this.currentProject.title
      this.projectCompleteParams.project.content = this.currentProject.content
      this.projectCompleteDialog = true
    },
    projectComplete () {
      this.loading = true
      this.$axios.$put('/api/v1/company_projects', this.projectCompleteParams)
        .then(response => this.successProjectComplete(response))
        .catch(error => this.failureProjectComplete(error))
      this.loading = false
      this.projectCompleteDialog = false
    },
    successProjectComplete (response) {
      alert('プロジェクトを完了しました')
      const copyProjects = Array.from(this.$store.state.companyProject.list)
      const projectList = []
      copyProjects.forEach((projects) => {
        if (this.projectCompleteParams.project.id !== projects.id) {
          projectList.push(projects)
        }
      })
      this.projectUpdatedAt()
      this.$router.push(`/company/${this.currentCompany.id}/CompanyDetails`)
    },
    failureProjectComplete (error) {
      console.log(error)
    }
  }
}
</script>
