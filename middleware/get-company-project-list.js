export default async ({ store, $axios, params }) => {
  await $axios.$get('/api/v1/company_projects', { params })
    .then(projects => store.dispatch('getCompanyProjectList', projects))
}
