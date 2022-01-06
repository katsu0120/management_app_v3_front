<template>
  <v-container>
    <v-card
      :loading="loading"
      class="mx-auto mt-4 mb-4"
      max-width="1050"
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
                v-model="CurrentProject.title"
                readonly
                label="ProjectTitle"
                placeholder="projectのタイトル"
                max-width="100"
                class="mb-0 text-h6"
                height="30"
                @blur="notEditProject"
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
                readonly
                label="content"
                auto-grow
                placeholder="プロジェクト詳細"
                outlined
                rows="8"
                class=" mb-0"
                @blur="notEditProject"
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
  name: 'PagesProjectDetails',
  middleware: ['get-project-task'],
  data () {
    return {
      loading: false,
      // dialog: false,
      // taskEditDialog: false,
      // taskCompleteDialog: false,
      incompleteProjectDialog: false,
      deleteProjectDialog: false,
      // params一覧---------------------------------------------------------
      // params: { project: { id: '' }, task: { title: '', content: '' } },
      deleteProjectParams: { id: '', title: '', content: '', updated_at: '' },
      incompleteProjectParams: { id: '', title: '', content: '', completed: false },
      // taskEditParams: { project: { id: '' }, task: { id: '', title: '', content: '' } },
      // taskCompleteParams: { project: { id: '' }, task: { id: '', title: '', content: '', completed: true } },
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
    notEditProject () {
      console.log('readOnly')
    },
    // async createTask () {
    //   this.params.project.id = this.CurrentProject.id
    //   this.loading = true
    //   await this.$axios.$post('/api/v1/tasks', this.params)
    //     .then(response => this.setState(response))
    //     .catch(error => this.createFailure(error))
    //   this.loading = false
    //   this.dialog = false
    //   this.params.task.title = ''
    //   this.params.task.content = ''
    // },
    // setState (response) {
    //   const copyTasks = Array.from(this.$store.state.project.task)
    //   copyTasks.push(response)
    //   this.$store.dispatch('getTasks', copyTasks)
    //   this.projectUpdatedAt()
    // },
    // createFailure (error) {
    //   console.log(error)
    // },
    // // プロジェクトをupdateした際にupdate_atを更新するメソッド
    // async projectUpdatedAt () {
    //   this.projectEditParams.id = this.CurrentProject.id
    //   this.projectEditParams.title = this.CurrentProject.title
    //   this.projectEditParams.content = this.CurrentProject.content
    //   this.projectEditParams.updated_at = new Date()
    //   await this.$axios.$put('/api/v1/projects', this.projectEditParams)
    //     .then(response => this.successUpdate(response))
    //     .catch(error => this.failureUpdate(error))
    // },
    // taskEditDialogOpen (item) {
    //   this.taskEditParams.project.id = this.CurrentProject.id
    //   this.taskEditParams.task.id = item.id
    //   this.taskEditParams.task.title = item.title
    //   this.taskEditParams.task.content = item.content
    //   this.taskEditDialog = true
    // },
    // async editTask () {
    //   this.loading = true
    //   await this.$axios.$put('/api/v1/tasks', this.taskEditParams)
    //     .then(response => this.editComplete(response))
    //     .catch(error => this.editFailure(error))
    //   this.loading = false
    //   this.taskEditDialog = false
    // },
    // editComplete (response) {
    //   const ChangeBeforeTask = this.taskEditParams.task.id
    //   const copyTasks = Array.from(this.$store.state.project.task)
    //   const taskList = []
    //   copyTasks.forEach((tasks) => {
    //     if (ChangeBeforeTask !== tasks.id) {
    //       taskList.push(tasks)
    //     }
    //   })
    //   taskList.push(response)
    //   this.$store.dispatch('getTasks', taskList)
    //   this.projectUpdatedAt()
    // },
    // editFailure (error) {
    //   console.log(error)
    // },
    // taskCompleteDialogOpen (item) {
    //   this.taskCompleteParams.project.id = this.CurrentProject.id
    //   this.taskCompleteParams.task.id = item.id
    //   this.taskCompleteParams.task.title = item.title
    //   this.taskCompleteParams.task.content = item.content
    //   this.taskCompleteDialog = true
    // },
    // async taskComplete () {
    //   this.loading = true
    //   await this.$axios.$put('/api/v1/tasks', this.taskCompleteParams)
    //     .then(response => this.successCompleteTask(response))
    //     .catch(error => this.taskFailure(error))
    //   this.loading = false
    //   this.taskCompleteDialog = false
    // },
    // successCompleteTask (response) {
    //   const ChangeBeforeTask = this.taskCompleteParams.task.id
    //   const copyTasks = Array.from(this.$store.state.project.task)
    //   const taskList = []
    //   copyTasks.forEach((tasks) => {
    //     if (ChangeBeforeTask !== tasks.id) {
    //       taskList.push(tasks)
    //     }
    //   })
    //   this.$store.dispatch('getTasks', taskList)
    //   this.projectUpdatedAt()
    // },
    // taskFailure (error) {
    //   console.log(error)
    // },
    incompleteProjectDialogOpen () {
      this.incompleteProjectParams.id = this.CurrentProject.id
      this.incompleteProjectParams.title = this.CurrentProject.title
      this.incompleteProjectParams.content = this.CurrentProject.content
      this.incompleteProjectDialog = true
    },
    incompleteProject () {
      console.log('incompleteProject')
      this.loading = true
      this.$axios.$put('/api/v1/projects', this.incompleteProjectParams)
        .then(response => this.successIncompleteProject(response))
        .catch(error => this.failureIncompleteProject(error))
      this.loading = false
      this.incompleteProjectDialog = false
    },
    successIncompleteProject (response) {
      console.log(response)
      alert('プロジェクトを未完了に戻しました')
      const copyProjects = Array.from(this.$store.state.project.list)
      const projectList = []
      copyProjects.forEach((projects) => {
        if (this.incompleteProjectParams.id !== projects.id) {
          projectList.push(projects)
        }
      })
      this.$store.dispatch('getProjectList', projectList)
      this.projectUpdatedAt()
      this.$router.push('/projects')
    },
    failureIncompleteProject (error) {
      console.log(error)
    },
    deleteProjectDialogOpen () {
      this.deleteProjectParams.id = this.CurrentProject.id
      this.deleteProjectParams.title = this.CurrentProject.title
      this.deleteProjectParams.content = this.CurrentProject.content
      this.deleteProjectDialog = true
    },
    async deleteProject () {
      console.log('deleteProject')
      console.log(this.deleteProjectParams)
      this.loading = true
      await this.$axios.$delete('/api/v1/projects', { data: this.deleteProjectParams })
        .then(response => this.deleteComplete(response))
        .catch(error => this.deleteFailure(error))
      this.loading = false
      this.deleteProjectDialog = false
    },
    deleteComplete (response) {
      console.log('下記がdeleteCompleteのresponse')
      console.log(response)
      alert('プロジェクトを削除いたしました')
      const copyProjects = Array.from(this.$store.state.project.list)
      const projectList = []
      copyProjects.forEach((projects) => {
        if (this.deleteProjectParams.id !== projects.id) {
          projectList.push(projects)
        }
      })
      this.$store.dispatch('getProjectList', projectList)
      this.$router.push('/dashboard')
    },
    deleteFailure (error) {
      console.log(error)
    }
  }
}
</script>
