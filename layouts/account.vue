<template>
  <v-app>
    <!-- toolbar -->
    <logged-in-app-bar clipped-left />

    <v-main>
      <app-toaster />
      <nuxt />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: null
    }
  }
}
</script>
