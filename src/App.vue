<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import {mapState} from "vuex";

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
     localStorage.clear();
     this.$router.push('/');
    },
  },
  computed:{
   ...mapState({
     user: state => state.user,
   })
  }
};
</script>
