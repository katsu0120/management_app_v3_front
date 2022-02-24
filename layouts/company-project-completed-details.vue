<template>
  <v-app>
    <!-- toolbar -->
    <logged-in-app-bar clipped-left>
      <template
        #navigation-toggle-button
      >
        <v-app-bar-nav-icon
          @click="drawer = !drawer"
        />
      </template>
    </logged-in-app-bar>

    <!-- navigation drawer -->
    <company-project-completed-details-navigation-drawer
      :drawer.sync="drawer"
    />

    <!-- main content -->
    <v-main>
      <app-toaster />
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'LayoutsCompanyDetails',
  middleware: ['authentication', 'get-company-list'],
  data () {
    return {
      drawer: null
    }
  }
}
</script>
