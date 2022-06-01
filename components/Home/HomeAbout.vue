<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <v-list
          flat
        >
          <v-list-item
            v-for="(point, i) in points"
            :key="`point-${i}`"
          >
            <v-list-item-icon>
              <v-icon
                size="50"
                :color="point.color"
                v-text="point.icon"
              />
            </v-list-item-icon>
            <v-list-item-content>
              <div
                class="text-h6"
                v-text="point.text"
              />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-list
          flat
        >
          <v-list-item
            v-for="(point2, i) in point2s"
            :key="`point2-${i}`"
          >
            <v-list-item-icon>
              <v-icon
                size="50"
                :color="point2.color"
                v-text="point2.icon"
              />
            </v-list-item-icon>
            <v-list-item-content>
              <div
                class="text-h6"
                v-text="point2.text"
              />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="py-0 my-0">
        <v-card-text class="pt-0 my-0 text-center text-h6">
          ①カンパニープロジェクト<br>
          ②パーソナルプロジェクト<br>
          2種類のプロジェクト管理方法があります。<br>
          達成目標を全力でサポートするプロダクトです。
        </v-card-text>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-card-actions>
        <nuxt-link
          :to="'/HowToUse'"
          class="text-decoration-none text-h6"
        >
          使い方はコチラ
        </nuxt-link>
      </v-card-actions>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      points: [
        {
          icon: 'mdi-file-table-box-multiple-outline',
          color: 'blue',
          text: '直感的で快適に操作'
        },
        {
          icon: 'mdi-chart-bar',
          color: 'green accent-4',
          text: 'プロジェクトクリアの為のタスクの見える化'
        },
        {
          icon: 'mdi-creation',
          color: 'yellow lighten-1',
          text: '未来を作る体験をあなたに'
        }
      ],
      point2s: [
        {
          icon: 'mdi-share-all',
          color: 'purple',
          text: 'チームメンバーとプロジェクトを楽々共有'
        },
        {
          icon: 'mdi-text-box-search-outline',
          color: 'grey',
          text: 'プロジェクトの後追い機能搭載'
        },
        {
          icon: 'mdi-chart-arc',
          color: 'deep-orange',
          text: '使うワクワクを全力応援'
        }
      ]
    }
  }
}
</script>
