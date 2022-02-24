export default async ({ store, $axios, params }) => {
  await $axios.$get('/api/v1/company_tasks', { params })
    .then(tasks => store.dispatch('getCompanyTasks', tasks))
}
