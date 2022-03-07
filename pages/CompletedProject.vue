<template>
  <v-container>
    <!-- {{ $store.state.project.current }} -->
    <nuxt-child />
  </v-container>
</template>

<script>
export default {
  name: 'PagesProject',
  layout: 'completed-project',
  // falseを返すページのアクセスを制限する
  validate ({ store, route }) {
    return !!store.state.project.current && route.name !== 'CompletedProject'
  }
}
</script>
