<template>
  <div
    id="companies"
  >
    <v-parallax>
      <v-img
        :src="companyImg"
        alt="companyImg"
        :aspect-ratio="16/9"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
      >
        <v-container
          fill-height
        >
          <v-row
            justify="center"
            align="center"
          >
            <v-col
              cols="12"
              :sm="container.sm"
              :md="container.md"
            >
              <v-card-title
                class="white--text"
              >
                最近選択したカンパニー
              </v-card-title>

              <v-divider
                dark
                class="mb-4"
              />

              <v-row
                align="center"
              >
                <!-- カンパニーの追加 -->
                <v-col
                  cols="12"
                  :sm="card.sm"
                  :md="card.md"
                >
                  <v-btn
                    block
                    :height="card.height"
                    :elevation="card.elevation"
                    to="/newProject"
                  >
                    <div>
                      <v-icon
                        size="24"
                        color="myblue"
                        class="my-2 pl-10"
                      >
                        mdi-plus
                      </v-icon>
                      <div
                        class="caption myblue--text"
                      >
                        カンパニーを追加
                      </div>
                    </div>
                  </v-btn>
                </v-col>
                <!-- 最近のカンパニー -->
                <v-col
                  v-for="(company, i) in recentCompanies.slice(0, 2)"
                  :key="`card-company-${i}`"
                  cols="12"
                  :sm="card.sm"
                  :md="card.md"
                >
                  <v-card
                    block
                    :height="card.height"
                    :elevation="card.elevation"
                    :to="$my.companyLinkTo(company.id)"
                    class="v-btn text-capitalize"
                  >
                    <v-card-title
                      class="pb-1 d-block text-truncate"
                    >
                      {{ company.name }}
                    </v-card-title>
                    <v-card-text
                      class="caption"
                    >
                      <v-icon
                        size="14"
                      >
                        mdi-update
                      </v-icon>
                      {{ $my.dateFormat(company.updated_at) }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-parallax>
    <!-- 全てのプロジェクト -->
    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          :sm="container.sm"
          :md="container.md"
        >
          <v-card-title>
            Company一覧
          </v-card-title>

          <v-divider class="mb-4" />

          <v-data-table
            :headers="tableHeaders"
            :items="recentCompanies"
            :items-per-page="5"
            item-key="id"
          >
            <template #[`item.id`]="{ item }">
              {{ item.id }}
            </template>
            <template #[`item.name`]="{ item }">
              <nuxt-link
                :to="$my.companyLinkTo(item.id)"
                class="text-decoration-none"
              >
                {{ item.name }}
              </nuxt-link>
            </template>
            <template #[`item.created_at`]="{ item }">
              {{ $my.dateFormat(item.created_at) }}
            </template>
            <template #[`item.updated_at`]="{ item }">
              {{ $my.dateFormat(item.updated_at) }}
            </template>
            <template #no-data>
              <h3>プロジェクトがありません</h3>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import companyImg from '~/assets/images/logged-in/City buildings_Flatline.png'
export default {
  name: 'PagesAccount',
  layout: 'company',
  data () {
    return {
      companyImg,
      container: {
        sm: 10,
        md: 8
      },
      card: {
        sm: 6,
        md: 4,
        height: 120,
        elevation: 4
      },
      tableHeaders: [
        { text: 'ID', width: 50, value: 'id', sortable: false },
        { text: 'カンパニー名', value: 'name', sortable: false },
        { text: '作成日', width: 100, value: 'created_at', sortable: false },
        { text: '更新日', width: 100, value: 'updated_at', sortable: false }
      ]
    }
  },
  computed: {
    recentCompanies () {
      const copyCompanies = Array.from(this.$store.state.company.list)
      return copyCompanies.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
        return 0
      })
    }
  },
  methods: {
    async test () {
      this.loading = true
      // // await console.log('test')
      await this.$axios.$get('/api/v1/companies')
        .then(response => this.Successful(response))
        .catch(error => this.Failure(error))
      this.loading = false
    },
    Successful (response) {
      console.log('この下がSuccessful')
      console.log(response)
    },
    Failure () {
      console.log('エラー?')
    }
  }
}
</script>

<style lang="scss">
#companies {
  .v-parallax__content {
    padding: 0;
  }
}
</style>
