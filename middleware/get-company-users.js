export default async ({ store, $axios, params }) => {
  await $axios.$get('/api/v1/company_users', { params })
    .then(companyUsers => store.dispatch('getCompanyUsersList', companyUsers))
}
