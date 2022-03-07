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
                v-model="updateCurrentProject.title"
                label="ProjectTitle"
                placeholder="projectのタイトル"
                max-width="100"
                class="mb-0 text-h6"
                height="30"
                autofocus
                @blur="editProjectTitle"
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
                v-model="updateCurrentProject.content"
                label="content"
                auto-grow
                placeholder="プロジェクト詳細"
                outlined
                rows="8"
                class=" mb-0"
                autofocus
                @blur="editProjectContent"
              />
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider
        class="mx-6"
      />
      <!--  Current_projectのTasks一覧--------------------------- -->
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
              v-model="params.task.title"
              label="title"
            />
            <v-textarea
              v-model="params.task.content"
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
  name: 'PagesProjectDetails',
  middleware: ['authentication', 'get-project-list', 'get-project-current', 'get-project-task'],
  data () {
    return {
      loading: false,
      dialog: false,
      taskEditDialog: false,
      taskCompleteDialog: false,
      projectCompleteDialog: false,
      // params一覧---------------------------------------------------------
      params: { project: { id: '' }, task: { title: '', content: '' } },
      projectEditParams: { id: '', title: '', content: '' },
      projectApdateAtParams: { id: '', title: '', content: '', updated_at: '' },
      projectCompleteParams: { id: '', title: '', content: '', completed: true },
      taskEditParams: { project: { id: '' }, task: { id: '', title: '', content: '' } },
      taskCompleteParams: { project: { id: '' }, task: { id: '', title: '', content: '', completed: true } },
      tableHeaders: [
        { text: 'ID', width: 30, value: 'id', sortable: false },
        { text: 'Task名', width: 120, value: 'title', sortable: false },
        { text: '内容', width: 250, value: 'content', sortable: false },
        { text: '作成日', width: 100, value: 'created_at', sortable: false },
        { text: '更新日', width: 100, value: 'updated_at', sortable: false },
        { text: 'Actions', width: 50, class: 'pr-1', value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    currentProject () {
      const id = this.$store.state.project.current.id
      const title = this.$store.state.project.current.title
      const content = this.$store.state.project.current.content
      return { id, title, content }
    },
    updateCurrentProject () {
      const id = this.$store.state.project.current.id
      const title = this.$store.state.project.current.title
      const content = this.$store.state.project.current.content
      return { id, title, content }
    },
    recentTasks () {
      const copyTasks = Array.from(this.$store.state.project.task)
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
    async editProjectTitle () {
      if (this.updateCurrentProject.title !== this.currentProject.title) {
        this.projectEditParams.id = this.updateCurrentProject.id
        this.projectEditParams.title = this.updateCurrentProject.title
        this.projectEditParams.content = this.updateCurrentProject.content
        this.loading = true
        await this.$axios.$put('/api/v1/projects', this.projectEditParams)
          .then(response => this.successUpdate(response))
          .catch(error => this.failureUpdate(error))
      }
      this.loading = false
    },
    async successUpdate (response) {
      //  computedのcurrentProjectを取得し直すことで更新。これにより無駄なloadingがなくなる
      await this.$axios.$get('/api/v1/projects')
        .then(projects => this.$store.dispatch('getProjectList', projects))
      this.$store.dispatch('getCurrentProject', { id: this.updateCurrentProject.id })
    },
    failureUpdate (error) {
      console.log(error)
    },
    async editProjectContent () {
      if (this.updateCurrentProject.content !== this.currentProject.content) {
        this.projectEditParams.id = this.updateCurrentProject.id
        this.projectEditParams.title = this.updateCurrentProject.title
        this.projectEditParams.content = this.updateCurrentProject.content
        this.loading = true
        await this.$axios.$put('/api/v1/projects', this.projectEditParams)
          .then(response => this.successUpdate(response))
          .catch(error => this.failureUpdate(error))
      }
      this.loading = false
    },
    async createTask () {
      this.params.project.id = this.currentProject.id
      this.loading = true
      await this.$axios.$post('/api/v1/tasks', this.params)
        .then(response => this.setState(response))
        .catch(error => this.createFailure(error))
      this.loading = false
      this.dialog = false
      this.params.task.title = ''
      this.params.task.content = ''
    },
    setState (response) {
      const copyTasks = Array.from(this.$store.state.project.task)
      copyTasks.push(response)
      this.$store.dispatch('getTasks', copyTasks)
      this.projectUpdatedAt()
    },
    createFailure (error) {
      console.log(error)
    },
    // プロジェクトをupdateした際にupdate_atを更新するメソッド
    async projectUpdatedAt () {
      this.projectApdateAtParams.id = this.currentProject.id
      this.projectApdateAtParams.title = this.currentProject.title
      this.projectApdateAtParams.content = this.currentProject.content
      this.projectApdateAtParams.updated_at = new Date()
      await this.$axios.$put('/api/v1/projects', this.projectApdateAtParams)
        .then(response => this.successUpdate(response))
        .catch(error => this.failureUpdate(error))
    },
    taskEditDialogOpen (item) {
      this.taskEditParams.project.id = this.currentProject.id
      this.taskEditParams.task.id = item.id
      this.taskEditParams.task.title = item.title
      this.taskEditParams.task.content = item.content
      this.taskEditDialog = true
    },
    async editTask () {
      this.loading = true
      await this.$axios.$put('/api/v1/tasks', this.taskEditParams)
        .then(response => this.editComplete(response))
        .catch(error => this.editFailure(error))
      this.loading = false
      this.taskEditDialog = false
    },
    editComplete (response) {
      const ChangeBeforeTask = this.taskEditParams.task.id
      const copyTasks = Array.from(this.$store.state.project.task)
      const taskList = []
      copyTasks.forEach((tasks) => {
        if (ChangeBeforeTask !== tasks.id) {
          taskList.push(tasks)
        }
      })
      taskList.push(response)
      this.$store.dispatch('getTasks', taskList)
      this.projectUpdatedAt()
    },
    editFailure (error) {
      console.log(error)
    },
    taskCompleteDialogOpen (item) {
      this.taskCompleteParams.project.id = this.currentProject.id
      this.taskCompleteParams.task.id = item.id
      this.taskCompleteParams.task.title = item.title
      this.taskCompleteParams.task.content = item.content
      this.taskCompleteDialog = true
    },
    async taskComplete () {
      this.loading = true
      await this.$axios.$put('/api/v1/tasks', this.taskCompleteParams)
        .then(response => this.successCompleteTask(response))
        .catch(error => this.taskFailure(error))
      this.loading = false
      this.taskCompleteDialog = false
    },
    successCompleteTask (response) {
      const ChangeBeforeTask = this.taskCompleteParams.task.id
      const copyTasks = Array.from(this.$store.state.project.task)
      const taskList = []
      copyTasks.forEach((tasks) => {
        if (ChangeBeforeTask !== tasks.id) {
          taskList.push(tasks)
        }
      })
      this.$store.dispatch('getTasks', taskList)
      this.projectUpdatedAt()
    },
    taskFailure (error) {
      console.log(error)
    },
    projectCompleteDialogOpen () {
      this.projectCompleteParams.id = this.currentProject.id
      this.projectCompleteParams.title = this.currentProject.title
      this.projectCompleteParams.content = this.currentProject.content
      this.projectCompleteDialog = true
    },
    projectComplete () {
      this.loading = true
      this.$axios.$put('/api/v1/projects', this.projectCompleteParams)
        .then(response => this.successProjectComplete(response))
        .catch(error => this.failureProjectComplete(error))
      this.loading = false
      this.projectCompleteDialog = false
    },
    successProjectComplete (response) {
      alert('プロジェクトを完了しました')
      const copyProjects = Array.from(this.$store.state.project.list)
      const projectList = []
      copyProjects.forEach((projects) => {
        if (this.projectCompleteParams.id !== projects.id) {
          projectList.push(projects)
        }
      })
      this.$store.dispatch('getProjectList', projectList)
      this.projectUpdatedAt()
      this.$router.push('/projects')
    },
    failureProjectComplete (error) {
      console.log(error)
    }
  }
}
</script>
