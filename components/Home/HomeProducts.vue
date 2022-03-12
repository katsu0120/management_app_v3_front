<template>
  <v-container>
    <v-row>
      <v-col class="py-0 my-0 text-center">
        <v-card-text class="pt-0 my-0">
          Mgt_App(マネジメントアップ)では<br>
          ①カンパニープロジェクト<br>
          ②パーソナルプロジェクト<br>
          上記2種類のプロジェクト管理方法があります。<br>
          達成目標を「プロジェクトタイトル」として記載。<br>
          その内容を「プロジェクト内容」として書き込みます。<br>
          そして、そのプロジェクトを達成する為のタスクをTASK欄に追加して行き、<br>
          全てのTASKが完了となったら、PROJECTを完了させるという設計です。
        </v-card-text>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="6"
      >
        <v-img
          :src="images.ExplanatoryImage1"
          alt="ExplanatoryImage1"
          :aspect-ratio="16/9"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-card-title>
        <h4>
          カンパニープロジェクト
        </h4>
      </v-card-title>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <v-img
          :src="images.ExplanatoryImage2"
          :aspect-ratio="16/9"
          alt="companyImg"
        />
        <v-card-text
          class="pl-0"
        >
          <ul>
            <li>カンパニープロジェクトは社内のメンバーと共有出来るプロジェクトです</li>
            <li>ログイン後Company一覧画面に遷移するので<br>[カンパニーを追加]ボタンを押してCompanyを作成します</li>
          </ul>
          <br>
        </v-card-text>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-img
          :src="images.ExplanatoryImage3"
          :aspect-ratio="16/8"
          alt="companyImg"
        />
        <v-card-text>
          <ul>
            <li>作成後、Company詳細画面に遷移します</li>
            <li>ここではCompanyが持っているprojectを一覧出来ます</li>
            <li>[参加ユーザー]ボタンを押してプロジェクトを共有するユーザーを追加する画面に遷移が可能です</li>
          </ul>
        </v-card-text>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-img
          :src="images.ExplanatoryImage4"
          :aspect-ratio="16/9"
          alt="companyImg"
        />
        <v-card-text>
          <ul>
            <li>[ユーザー追加]ボタンを押してCompanyに追加したいユーザーを検索します</li>
            <li>追加したいユーザーが検索できたら[追加]ボタンを押せば参加ユーザーとして追加されます。(Companyの作成者のみ、この画面から参加ユーザーの削除とCompanyの削除が可能です)</li>
          </ul>
        </v-card-text>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-img
          :src="images.ExplanatoryImage5"
          :aspect-ratio="16/9"
          alt="companyImg"
        />
        <v-card-text>
          <ul>
            <li>[プロジェクト追加]ボタンよりプロジェクトの追加が可能です</li>
            <li>追加したプロジェクトの詳細はCompany参加ユーザーなら誰でも参照、編集が可能です</li>
          </ul>
        </v-card-text>
      </v-col>
      <v-row justify="center">
        <v-col
          cols="12"
          sm="6"
        >
          <v-img
            :src="images.ExplanatoryImage6"
            :aspect-ratio="16/9"
            alt="companyImg"
          />
          <v-card-text>
            <ul>
              <li>また、Company参加ユーザーの誰がプロジェクトを弄ったのかは最終更新者の履歴で確認する事が可能です</li>
            </ul>
          </v-card-text>
        </v-col>
      </v-row>
    </v-row>
    <v-row>
      <v-card-title>
        <h4>
          パーソナルプロジェクト
        </h4>
      </v-card-title>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <v-img
          :src="images.ExplanatoryImage7"
          :aspect-ratio="16/8"
          alt="companyImg"
        />
        <v-card-text>
          <ul>
            <li>パーソナルプロジェクトは共有しない個人のプロジェクトです</li>
            <li>他者と共有しないプロジェクトに関してはコチラで管理が可能です</li>
          </ul>
        </v-card-text>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-img
          :src="images.ExplanatoryImage8"
          :aspect-ratio="16/8"
          alt="companyImg"
        />
        <v-card-text>
          <ul>
            <li>操作方法に関してはカンパニープロジェクトと同じです</li>
            <li>プロジェクトを作成して管理して下さい</li>
          </ul>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ExplanatoryImage1 from '~/assets/images/Explanatory/ExplanatoryImage(1).png'
import ExplanatoryImage2 from '~/assets/images/Explanatory/ExplanatoryImage(2).png'
import ExplanatoryImage3 from '~/assets/images/Explanatory/ExplanatoryImage(3).png'
import ExplanatoryImage4 from '~/assets/images/Explanatory/ExplanatoryImage(4).png'
import ExplanatoryImage5 from '~/assets/images/Explanatory/ExplanatoryImage(5).png'
import ExplanatoryImage6 from '~/assets/images/Explanatory/ExplanatoryImage(6).png'
import ExplanatoryImage7 from '~/assets/images/Explanatory/ExplanatoryImage(7).png'
import ExplanatoryImage8 from '~/assets/images/Explanatory/ExplanatoryImage(8).png'
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
      images: {
        ExplanatoryImage1,
        ExplanatoryImage2,
        ExplanatoryImage3,
        ExplanatoryImage4,
        ExplanatoryImage5,
        ExplanatoryImage6,
        ExplanatoryImage7,
        ExplanatoryImage8
      },
      points: [
        {
          icon: 'mdi-file-table-box-multiple-outline',
          color: 'blue',
          text: '直感的な操作で快適に事業計画書を作成'
        },
        {
          icon: 'mdi-chart-bar',
          color: 'green accent-4',
          text: 'KPIから考えた夢物語ではない経営計画値を算出'
        },
        {
          icon: 'mdi-chart-arc',
          color: 'deep-orange',
          text: 'ビジュアライズに優れたグラフツールで経営を可視化'
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
