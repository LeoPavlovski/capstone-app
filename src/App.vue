<template>
  <v-app>
    <v-main>
      <router-view/>
      <v-app-bar
           v-if="$route.path !=='/login'"
          color="primary accent-4"
          dense
          dark
          absolute
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Internship Finder</v-toolbar-title>

        <v-spacer></v-spacer>

            <v-btn @click="toggleNotifications" icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-menu
            left
            bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
            <v-btn @click="performLogout">Logout</v-btn>
          </template>

          <v-list>
            <v-list-item
                v-for="n in 5"
                :key="n"
                @click="() => {}"
            >
              <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
      drawer: false,
      group: null,
  }),
  methods:{
    toggleNotifications() {
      this.$root.$emit('toggle-notifications');
    },
    performLogout(){
      this.$store.dispatch('logout');
    },
  }
};
</script>
