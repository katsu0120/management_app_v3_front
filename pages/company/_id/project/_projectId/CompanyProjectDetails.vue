<template>
  <div>
    {{ $store.state.loggedIn.rememberPath.name }}
    <h3>フルパス</h3>
    {{ $route.fullPath }}<br>
    <h3>選択カンパニーリスト</h3>
    {{ $store.state.company.list }}
    <h3>選択カンパニー</h3>
    {{ $store.state.company.current }}
    <h3>選択カンパニープロジェクト</h3>
    {{ $store.state.companyProject.current }}
    <h3>選択カンパニープロジェクトリスト</h3>
    {{ $store.state.companyProject.list }}
  </div>
</template>

<script>
export default {
  // layout: 'company',
  middleware: ['authentication', 'get-company-list', 'get-company-current', 'get-company-project-list', 'get-company-project-current'],
  mounted () {
    console.log(this.$route)
  }
  // middleware: ['get-company-project-current']
}
</script>
