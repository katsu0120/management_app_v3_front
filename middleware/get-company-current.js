export default async ({ store, params }) => {
  // TODO削除
  console.log('これがget-company-currentのparams')
  console.log(params)
  if (store.state.company.current !== params) {
    await store.dispatch('getCurrentCompany', params)
    console.log('この下がカンパニーカレント')
    console.log(store.state.company.current)
  }
}
