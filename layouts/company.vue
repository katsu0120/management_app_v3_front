<template>
  <v-app>
    <logged-in-app-bar />
    <v-main>
      <nuxt />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
export default {
  name: 'Company',
  middleware: ['authentication', 'get-company-list', 'get-company-current', 'get-company-project-list']
}
</script>
