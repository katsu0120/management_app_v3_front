<template>
  <v-container>
    <nuxt-child />
  </v-container>
</template>

<script>
export default {
  name: 'PagesAccount',
  layout: 'account',
  // middleware: ['authentication'],
  // falseを返すページのアクセスを制限する
  validate ({ route }) {
    return route.name !== 'account'
  }
}
</script>
