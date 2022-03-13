<template>
  <v-container>
    <v-row justify="center">
      <v-col class="py-0 my-0 text-center">
        <v-card-text class="pt-0 my-0">
          Mgt_App(マネジメントアップ)では<br>
          ①カンパニープロジェクト<br>
          ②パーソナルプロジェクト<br>
          上記2種類のプロジェクト管理方法があります。<br>
          達成目標を「プロジェクトタイトル」として記載。<br>
          その内容を「プロジェクト内容」として書き込みます。<br>
          そして、そのプロジェクトを達成する為のタスクをTASK欄に追加して行き、<br>
          全てのTASKが完了となったら、PROJECTを完了させるという設計です。<br>
        </v-card-text>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-card-actions>
        <nuxt-link
          :to="'/HowToUse'"
          class="text-decoration-none"
        >
          使い方はコチラ
        </nuxt-link>
      </v-card-actions>
    </v-row>
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
      <v-col
        cols="12"
        sm="6"
      >
        <v-sparkline
          :value="sparkline.value"
          :gradient="sparkline.gradient"
          :smooth="sparkline.radius || false"
          :padding="sparkline.padding"
          :line-width="sparkline.width"
          :stroke-linecap="sparkline.lineCap"
          :gradient-direction="sparkline.gradientDirection"
          :fill="sparkline.fill"
          :type="sparkline.type"
          :auto-line-width="sparkline.autoLineWidth"
          auto-draw
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    const gradients = [
      ['#222'],
      ['#42b3f4'],
      ['red', 'orange', 'yellow'],
      ['purple', 'violet'],
      ['#00c6ff', '#F0F', '#FF0']
    ]
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
      ],
      sparkline: {
        width: 4,
        radius: 10,
        padding: 4,
        lineCap: 'round',
        gradient: gradients[4],
        value: [0, 2, 5, 9, 5, 10, 8, 2, 9, 20],
        gradientDirection: 'right',
        gradients,
        fill: false,
        type: 'trend',
        autoLineWidth: true
      }
    }
  }
}
</script>
