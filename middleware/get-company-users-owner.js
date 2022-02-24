export default async ({ store, $axios, params }) => {
  await $axios.$get('/api/v1/company_users/owner', { params })
    .then(ownerUser => store.dispatch('getCompanyUsersOwnerList', ownerUser))
}
