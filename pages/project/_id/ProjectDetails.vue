<template>
  <v-container>
    <v-card
      :loading="loading"
      class="mx-auto my-12"
      max-width="1000"
    >
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
                v-model="CurrentProject.title"
                label="ProjectTitle"
                placeholder="projectのタイトル"
                max-width="100"
                class="mb-0 text-h6"
                height="30"
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
                v-model="CurrentProject.content"
                label="content"
                auto-grow
                placeholder="プロジェクト詳細"
                outlined
                rows="8"
                class=" mb-0"
                @blur="editProject"
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
                  追加
                </v-btn>
              </v-row>
            </v-card-title>

            <v-divider class="mb-4" />

            <v-data-table
              :headers="tableHeaders"
              :items="incompleteTasks"
              :items-per-page="10"
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
                  @click="editDialogOpen(item)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  small
                  @click="completeDialogOpen(item)"
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
      v-model="editDialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Taskの編集</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-text-field
              v-model="editTaskParams.task.title"
              label="titleの編集"
            />
            <v-textarea
              v-model="editTaskParams.task.content"
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
            @click="editDialog = false"
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
      v-model="completeDialog"
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
            @click="completeDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="completeTask"
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
  middleware: ['get-project-task'],
  data () {
    return {
      loading: false,
      dialog: false,
      editDialog: false,
      completeDialog: false,
      params: { project: { id: '' }, task: { title: '', content: '' } },
      editProjectParams: { id: '', title: '', content: '', updated_at: '' },
      editTaskParams: { project: { id: '' }, task: { id: '', title: '', content: '' } },
      completeTaskParams: { project: { id: '' }, task: { id: '', title: '', content: '', completed: true } },
      tableHeaders: [
        { text: 'ID', width: 30, value: 'id', sortable: false },
        { text: 'Task名', width: 120, value: 'title', sortable: false },
        { text: '内容', width: 250, value: 'content', sortable: false },
        { text: '作成日', width: 100, value: 'created_at', sortable: false },
        { text: '更新日', width: 100, value: 'updated_at', sortable: false },
        { text: 'Actions', width: 50, class: 'px-1', value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    CurrentProject () {
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
    async editProject () {
      this.loading = true
      await this.$axios.$put('/api/v1/projects', this.CurrentProject)
        .then(response => this.successUpdate(response))
        .catch(error => this.failureUpdate(error))
      this.loading = false
    },
    async successUpdate (response) {
      await this.$axios.$get('/api/v1/projects')
        .then(projects => this.$store.dispatch('getProjectList', projects))
    },
    failureUpdate (response) {
      console.log(response)
    },
    async createTask () {
      this.params.project.id = this.CurrentProject.id
      // TODO削除
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
    async projectUpdatedAt () {
      this.editProjectParams.id = this.CurrentProject.id
      this.editProjectParams.title = this.CurrentProject.title
      this.editProjectParams.content = this.CurrentProject.content
      this.editProjectParams.updated_at = new Date()
      await this.$axios.$put('/api/v1/projects', this.editProjectParams)
        .then(response => this.successUpdate(response))
        .catch(error => this.failureUpdate(error))
    },
    editDialogOpen (item) {
      this.editTaskParams.project.id = this.CurrentProject.id
      this.editTaskParams.task.id = item.id
      this.editTaskParams.task.title = item.title
      this.editTaskParams.task.content = item.content
      this.editDialog = true
    },
    async editTask () {
      this.loading = true
      await this.$axios.$put('/api/v1/tasks', this.editTaskParams)
        .then(response => this.editComplete(response))
        .catch(error => this.editFailure(error))
      this.loading = false
      this.editDialog = false
    },
    editComplete (response) {
      const ChangeBeforeTask = this.editTaskParams.task.id
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
    completeDialogOpen (item) {
      this.completeTaskParams.project.id = this.CurrentProject.id
      this.completeTaskParams.task.id = item.id
      this.completeTaskParams.task.title = item.title
      this.completeTaskParams.task.content = item.content
      this.completeDialog = true
    },
    async completeTask () {
      this.loading = true
      await this.$axios.$put('/api/v1/tasks', this.completeTaskParams)
        .then(response => this.succecCompleteTask(response))
        .catch(error => this.taskFailure(error))
      this.loading = false
      this.completeDialog = false
    },
    succecCompleteTask (response) {
      const ChangeBeforeTask = this.completeTaskParams.task.id
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
    }
  }
}
</script>
