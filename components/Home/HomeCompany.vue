<template>
  <div>
    <v-card-title
      class="font-weight-bold justify-center"
    >
      情報
    </v-card-title>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="10"
        md="8"
      >
        <v-list
          flat
          dense
        >
          <v-divider />
          <template v-for="(info, i) in infomations">
            <v-list-item :key="`info-list-${i}`">
              <v-list-item-icon>
                <v-icon v-text="info.icon" />
              </v-list-item-icon>
              <v-list-item-content>
                <a
                  v-if="info.link"
                  :href="info.link"
                  rel="nofollow"
                  target="_blank"
                  class="text-decoration-none"
                >
                  {{ info.link }}
                </a>
                <div
                  v-else
                  class="text-subtitle-1"
                  v-text="info.text"
                />
              </v-list-item-content>
            </v-list-item>
            <v-divider
              :key="`info-divider-${i}`"
            />
          </template>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  data () {
    const companyUrl = 'https://twitter.com/katsu1357911'
    return {
      infomations: [
        { icon: 'mdi-account', text: 'カツ' },
        { icon: 'mdi-twitter', link: companyUrl },
        { icon: 'mdi-calendar-text-outline ', text: '独学で学習し当サイトを作成しました。' }
      ]
    }
  }
}
</script>
