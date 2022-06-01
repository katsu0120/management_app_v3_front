<template>
  <v-app>
    <home-app-bar
      :menus="menus"
      :img-height="imgHeight"
    />

    <v-img
      id="scroll-top"
      dark
      :src="TopImg"
      :height="imgHeight"
      class="mt-14"
    >
      <v-row
        align="center"
        justify="center"
        :style="{ height: `${imgHeight}px` }"
      >
        <v-col
          cols="12"
          class="text-center"
        >
          <h1
            class="display-1 mb-4 black--text"
            color="black"
          >
            使いたいを追求したプロジェクト管理ツール
          </h1>
          <h4
            class="subheading black--text"
            :style="{ letterSpacing: '5px' }"
          >
            直感的で論理的なワクワク体験を
          </h4>
        </v-col>
      </v-row>
    </v-img>
    <v-sheet>
      <v-container
        fluid
        :style="{ maxWidth: '1280px' }"
      >
        <v-row
          v-for="(menu, i) in menus"
          :key="`menu-${i}`"
        >
          <v-col
            :id="menu.title"
            cols="12"
          >
            <v-card flat>
              <v-card-title class="justify-center display-1">
                {{ $t(`menus.${menu.title}`) }}
              </v-card-title>
              <v-card-text class="text-center">
                {{ menu.subtitle }}
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12">
            <div :is="`home-${menu.title}`" />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <app-footer />
  </v-app>
</template>

<script>
import HomeAbout from '~/components/Home/HomeAbout'
import HomeCompany from '~/components/Home/HomeCompany'
import TopImg from '~/assets/images/KAZUKIcghvbnkm_TP_V.jpg'

export default {
  name: 'PagesIndex',
  components: {
    HomeAbout,
    HomeCompany
  },
  middleware: ['logged-in-redirect'],
  data () {
    return {
      imgHeight: 500,
      TopImg,
      menus: [
        { title: 'about', subtitle: 'このサイトはプロジェクト管理を行う為の業務管理プロダクトです' },
        { title: 'company', subtitle: '作成者の情報' }
      ]
    }
  }
}
</script>
