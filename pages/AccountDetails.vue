<template>
  <v-container>
    <nuxt-child />
  </v-container>
</template>

<script>
export default {
  name: 'PagesAccount',
  layout: 'AccountDetails',
  middleware: ['authentication'],
  // falseを返すページのアクセスを制限する
  validate ({ route }) {
    return route.name !== 'AccountDetails'
  }
}
</script>
