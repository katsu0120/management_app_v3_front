<template>
  <v-container>
    <v-card
      :loading="loading"
      class="mx-auto my-12"
      max-width="1900"
    >
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
              完了したタスク
              <!-- <v-row justify="end">
                <v-btn
                  color="primary"
                  dark
                  @click="dialog = true"
                >
                  追加
                </v-btn>
              </v-row> -->
            </v-card-title>

            <v-divider class="mb-4" />

            <v-data-table
              :headers="tableHeaders"
              :items="incompleteTasks"
              :items-per-page="15"
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
                  @click="undoTaskDialogOpen(item)"
                >
                  mdi-arrow-u-left-top-bold
                </v-icon>
                <v-icon
                  small
                  class="mr-2"
                  @click="deleteDialogOpen(item)"
                >
                  mdi-delete
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
    <!-- Taskの完了を元に戻すdialog------------------------------------------>
    <v-dialog
      v-model="undoTaskDialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title class="text-h5">
          タスクを未完了に戻しますか？
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="undoTaskDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="undoTask"
          >
            OK
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-------------------------------------------------------------->
    <!--Task削除のdialog-->
    <v-dialog
      v-model="deleteDialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title class="text-h5">
          完了タスクを削除しますか？
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="deleteDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="deleteTask"
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
      // dialog: false,
      deleteDialog: false,
      undoTaskDialog: false,
      // params: { project: { id: '' }, task: { title: '', content: '' } },
      editProjectParams: { id: '', title: '', content: '', updated_at: '' },
      editTaskParams: { project: { id: '' }, task: { id: '', title: '', content: '' } },
      undoTaskParams: { project: { id: '' }, task: { id: '', title: '', content: '', completed: false } },
      deleteTaskParams: { project: { id: '' }, task: { id: '', title: '', content: '' } },
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
        if (task.completed) {
          taskList.push(task)
        }
      })
      return taskList
    }
  },
  methods: {
    async projectUpdatedAt () {
      this.editProjectParams.id = this.CurrentProject.id
      this.editProjectParams.title = this.CurrentProject.title
      this.editProjectParams.content = this.CurrentProject.content
      this.editProjectParams.updated_at = new Date()
      await this.$axios.$put('/api/v1/projects', this.editProjectParams)
        .then(response => this.successUpdate(response))
        .catch(error => this.failureUpdate(error))
    },
    async successUpdate (response) {
      await this.$axios.$get('/api/v1/projects')
        .then(projects => this.$store.dispatch('getProjectList', projects))
    },
    failureUpdate (response) {
      console.log(response)
    },
    undoTaskDialogOpen (item) {
      this.undoTaskParams.project.id = this.CurrentProject.id
      this.undoTaskParams.task.id = item.id
      this.undoTaskParams.task.title = item.title
      this.undoTaskParams.task.content = item.content
      this.undoTaskDialog = true
    },
    async undoTask () {
      this.loading = true
      await this.$axios.$put('/api/v1/tasks', this.undoTaskParams)
        .then(response => this.succecUndoTask(response))
        .catch(error => this.undoTaskFailure(error))
      this.loading = false
      this.undoTaskDialog = false
    },
    succecUndoTask (response) {
      const ChangeBeforeTask = this.undoTaskParams.task.id
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
    undoTaskFailure (error) {
      console.log(error)
    },
    deleteDialogOpen (item) {
      this.deleteTaskParams.project.id = this.CurrentProject.id
      this.deleteTaskParams.task.id = item.id
      this.deleteTaskParams.task.title = item.title
      this.deleteTaskParams.task.content = item.content
      this.deleteDialog = true
    },
    async deleteTask () {
      this.loading = true
      await this.$axios.$delete('/api/v1/tasks', { data: this.deleteTaskParams })
        .then(response => this.successDelete(response))
        .catch(error => this.failureDelete(error))
      this.loading = false
      this.deleteDialog = false
    },
    successDelete (responce) {
      const ChangeBeforeTask = responce.id
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
    failureDelete (error) {
      console.log(error)
    }

  }
}
</script>
