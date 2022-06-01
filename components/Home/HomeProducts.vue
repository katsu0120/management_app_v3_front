<!-- <template> -->
  <!-- <v-container> -->
    <!-- <v-row justify="center">
      <v-col class="py-0 my-0">
        <v-card-text class="pt-0 my-0">
          ①カンパニープロジェクト<br>
          ②パーソナルプロジェクト<br>
          上記2種類のプロジェクト管理方法があります。<br>
          達成目標を「プロジェクトタイトル」として記載。<br>
          その内容を「プロジェクト内容」として書き込みます。<br>
          そして、そのプロジェクトを達成する為のタスクをTASK欄に追加して行き、<br>
          全てのTASKが完了となったら、PROJECTを完了させるという設計です。<br>
        </v-card-text> -->
      <!-- </v-col>
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
                size="30"
                :color="point.color"
                v-text="point.icon"
              />
            </v-list-item-icon>
            <v-list-item-content>
              <div
                class="text-subtitle-1"
                v-text="point.text"
              />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row> -->
  <!-- <v-row justify="center">
      <v-card-actions>
        <nuxt-link
          :to="'/HowToUse'"
          class="text-decoration-none"
        >
          使い方はコチラ
        </nuxt-link>
      </v-card-actions>
    </v-row>
  </v-container> -->
<!-- </template> -->

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
          icon: 'mdi-chart-arc',
          color: 'deep-orange',
          text: '使うワクワクを全力応援'
        }
      ]
    }
  }
}
</script>
