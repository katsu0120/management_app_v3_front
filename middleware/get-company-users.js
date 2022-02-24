export default async ({ store, $axios, params }) => {
  // TODO削除
  console.log('get-company-users', params)
  await $axios.$get('/api/v1/company_users', { params })
    .then(companyUsers => store.dispatch('getCompanyUsersList', companyUsers))
}
