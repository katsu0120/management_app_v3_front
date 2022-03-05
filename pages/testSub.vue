<template>
  <div
    id="companies"
  >
    <v-parallax>
      <v-img
        :src="errorImg"
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
                class="white--text pb-1"
              >
                <h3>エラー</h3>
              </v-card-title>

              <v-divider
                dark
              />
              <v-card-subtitle
                class="white--text"
              >
                <h4>management_apps</h4>
              </v-card-subtitle>

              <v-row
                align="center"
              >
                <!-- カンパニーの追加 --------------------------------------->
                <v-col
                  cols="12"
                  :sm="card.sm"
                  :md="card.md"
                >
                  <v-btn
                    block
                    :height="card.height"
                    :elevation="card.elevation"
                    @click="newCompanyDialog = true"
                  >
                    <div>
                      <v-icon
                        size="24"
                        color="myblue"
                        class="my-2 pl-2"
                      >
                        mdi-plus
                      </v-icon>
                    </div>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-parallax>
    <v-parallax>
      <v-img
        :src="TajMahalImg"
        alt="companyImg"
        :aspect-ratio="16/9"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
      >
        error
      </v-img>
    </v-parallax>
  </div>
</template>

<script>
import errorImg from '~/assets/images/logged-in/Daenerys Targaryen_Monochromatic.png'
import TajMahalImg from '~/assets/images/logged-in/Taj Mahal_Monochromatic.png'
export default {
  name: 'PagesAccount',
  layout: 'AccountDetails',
  data () {
    return {
      errorImg,
      TajMahalImg,
      container: {
        sm: 10,
        md: 8
      },
      card: {
        sm: 6,
        md: 4,
        height: 110,
        elevation: 4
      }
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
