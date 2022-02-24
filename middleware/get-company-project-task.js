export default async ({ store, $axios, params }) => {
  // TODO削除
  console.log('この下がtasksのmiddleware')
  console.log('middleware/get-company-project-task.js', params)
  await $axios.$get('/api/v1/company_tasks', { params })
    .then(tasks => store.dispatch('getCompanyTasks', tasks))
}
