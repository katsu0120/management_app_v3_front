<template>
  <v-app-bar
    app
    height="56"
    color="grey darken-3"
  >
    <nuxt-link
      :to="'/'"
      class="text-decoration-none"
    >
      <app-logo />
    </nuxt-link>
    <nuxt-link
      :to="'/'"
      class="white--text text-decoration-none"
    >
      <app-title
        class="hidden-mobile-and-down"
      />
    </nuxt-link>

    <v-spacer />

    <before-login-app-bar-signup-button />
    <before-login-app-bar-login-button />
  </v-app-bar>
</template>

<script>

export default {
}
</script>
