<template>
  <v-app-bar
    app
    dence
    elevation="1"
    :clipped-left="clippedLeft"
    color="grey darken-3"
    height="56"
  >
    <slot name="navigation-toggle-button" />

    <nuxt-link
      :to="homePath"
      class="text-decoration-none"
    >
      <app-logo />
    </nuxt-link>

    <!-- app title -->
    <nuxt-link
      :to="homePath"
      dark
      class="white--text text-decoration-none"
    >
      <app-title
        :class="{ 'hidden-mobile-and-down' : isNotHomePath }"
      />
    </nuxt-link>

    <!-- page title -->
    <logged-in-app-bar-breadcrumbs
      v-if="isNotHomePath"
      class="white--text"
    />

    <v-spacer />

    <!-- account menu -->
    <logged-in-app-bar-account-menu />
  </v-app-bar>
</template>

<script>
export default {
  props: {
    clippedLeft: {
      type: Boolean,
      default: false
    }
  },
  data ({ $store }) {
    return {
      homePath: $store.state.loggedIn.homePath
    }
  },
  computed: {
    isNotHomePath () {
      return this.$route.name !== this.homePath.name
    }
  }
}
</script>
