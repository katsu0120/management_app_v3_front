<template>
  <v-app>
    <before-login-app-bar />
    <v-main>
      <app-toaster />
      <nuxt />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
export default {
  neme: 'LayoutsBeforeLogin',
  middleware: ['logged-in-redirect']
}
</script>
