<template>
  <v-app>
    <!-- toolbar -->
    <logged-in-app-bar clipped-left>
      <template
        #navigation-toggle-button
      >
        <v-app-bar-nav-icon
          color="white"
          @click="drawer = !drawer"
        />
      </template>
    </logged-in-app-bar>

    <!-- navigation drawer -->
    <completed-project-navigation-drawer
      :drawer.sync="drawer"
    />

    <!-- main content -->
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'LayoutsCompletedProject',
  middleware: ['authentication', 'get-project-list'],
  data () {
    return {
      drawer: null
    }
  }
}
</script>
