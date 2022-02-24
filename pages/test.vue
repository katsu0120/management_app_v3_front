<template>
  <!-- TODO削除 -->
  <v-container
    fuild
  >
    <v-card
      class="mx-auto"
      max-width="500"
    >
      <!--------- 下からツールバー ----------------------------------------------->
      <v-toolbar
        color="deep-purple accent-4"
        dark
      >
        <v-app-bar-nav-icon />

        <v-toolbar-title>New Chat</v-toolbar-title>

        <v-spacer />

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>
      <!-- 下からリストかな -------------------------------------------------------->
      <v-list subheader>
        <v-subheader>Recent chat</v-subheader>

        <v-list-item
          v-for="chat in recent"
          :key="chat.title"
        >
          <v-list-item-avatar>
            <!-- <v-img
              :alt="`${chat.title} avatar`"
              :src="chat.avatar"
            /> -->
            <v-icon>
              mdi-account-circle
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="chat.title" />
          </v-list-item-content>

          <v-list-item-icon>
            <!-- <v-icon :color="chat.active ? 'deep-purple accent-4' : 'grey'">
              mdi-message-outline
            </v-icon> -->
            <v-btn
              color="error"
            >
              追加
            </v-btn>
          </v-list-item-icon>
          <!-- <v-divider /> -->
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list subheader>
        <v-subheader>Previous chats</v-subheader>

        <v-list-item
          v-for="chat in previous"
          :key="chat.title"
        >
          <v-list-item-avatar>
            <v-img
              :alt="`${chat.title} avatar`"
              :src="chat.avatar"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="chat.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
// import member1 from '~/assets/images/member1.png'
import member2 from '~/assets/images/member2.png'
// import member3 from '~/assets/images/member3.png'
// import defaultAccount from '~/assets/images/member1.png'
export default {
  components: {
    // defaultAccount
  },
  data: () => ({
    recent: [
      {
        active: true,
        avatar: member2,
        title: 'Jason Oner'
      },
      {
        active: true,
        icon: 'mdi-domain',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Mike Carlson'
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Cindy Baker'
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Cindy Baker'
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Cindy Baker'
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Cindy Baker'
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Cindy Baker'
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Ali Connors'
      }
    ],
    previous: [{
      title: 'Travis Howard',
      avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'
    }]
  })
}
</script>
