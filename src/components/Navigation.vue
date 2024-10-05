
<template>
  <div class="d-flex">
    <v-card width="300">
      <v-navigation-drawer
          left
          permanent
          absolute
          width="100%"
          height="100vh"
      >
        <template v-slot:prepend>
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/81.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="text-capitalize">{{user.name}} {{user.surname}}</v-list-item-title>
              <v-list-item-subtitle>Logged In</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-divider></v-divider>

        <v-list dense v-if="user.roleId === 2">
          <v-list-item
              v-for="(item,index) in items"
              :key="item.title"
              :to="item.title !== 'Logout' ? getRouteProfessor(item.title) : null"
              @click="item.title === 'Logout' ? handleLogout() : null"
          >
            <v-list-item-icon>
              <v-icon >{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title >{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list dense v-if="user.roleId === 3">
          <v-list-item
              v-for="(item,index) in adminRoute"
              :key="item.title"
              :to="item.title !== 'Logout' ? getRouteAdmin(item.title) : null"
              @click="item.title === 'Logout' ? handleLogout() : null"
          >
            <v-list-item-icon>
              <v-icon >{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title >{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list dense v-if="user.roleId === 1">
          <v-list-item
              v-for="(item,index) in studentRoute"
              :key="item.title"
              :to="item.title !== 'Logout' ? getRouteStudent(item.title) : null"
              @click="item.title === 'Logout' ? handleLogout() : null"

          >
            <v-list-item-icon class="d-flex">
              <v-icon >{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content class="d-flex">
              <v-list-item-title >{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            <div>
              <v-icon
                  color="primary"
                  small
                  v-if="index === 1 && notification"
                  :class="notification ? 'bell-ring' : ''"
                  style="position:relative;"
              >
                mdi-bell
              </v-icon>
              <v-icon style="position:absolute;top:9px;right:13px;" color="red" x-small   v-if="index === 1 && notification">mdi-checkbox-blank-circle</v-icon>
            </div>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  data () {
    return {
      notification:false,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Students', icon: 'mdi mdi-account-multiple' },
        { title: 'Courses', icon: 'mdi-book' },
        { title: 'Internships', icon: 'mdi-file-chart' },
        { title: 'Logout', icon: 'mdi-logout' },
      ],
      studentRoute: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Internship Invitations', icon: 'mdi-clipboard-text' },
        { title: 'Logout', icon: 'mdi-logout' },
      ],
      adminRoute: [
        { title: 'Companies', icon: 'mdi-view-dashboard' },
        { title: 'News', icon: 'mdi-newspaper' },
        { title: 'Logout', icon: 'mdi-logout' },
      ],
      right: null,
    }
  },
  computed:{
    ...mapState({
      user:state => state.user,
      invitations:state=>state.invitations
    })
  },
  mounted() {
   this.getStudentInvitations();
  },
  methods:{
    getStudentInvitations(){
      const body ={
        id:this.user.id
      }
      this.$store.dispatch('getStudentInvitations',body).then(res=>{
      const result = this.invitations.invitations.filter(invitation=>invitation.status === 'pending')

        if(result.length > 0 ){
          this.notification=true;
        }
      })
    },
    getRouteProfessor(title) {
      switch (title) {
        case 'Students':
          return '/students';
        case 'Courses':
          return '/courses';
        case 'Internships':
          return '/internships';
        case 'Dashboard':
          return '/professor';
        default:
          return '/dashboard';
      }
    },
    getRouteAdmin(title) {
      switch (title) {
        case 'Companies':
          return '/companies';
        case 'News':
          return '/news';
        default:
          return '/dashboard';
      }
    },
    getRouteStudent(title) {
      switch (title) {
        case 'Dashboard':
          return '/student';
        case 'Profile':
          return '/myProfile';
        case 'Internship Invitations':
          return '/invitations';
      }
    },
    handleLogout() {
      // Logic to handle logout, like calling the API or clearing auth tokens

      // Example: Clear token and redirect to login page
      localStorage.removeItem('authToken'); // or however you store auth
      this.$router.push('/login');
    }
  }
}
</script>
<style scoped>
@keyframes ring {
  0% { transform: rotate(0); }
  10% { transform: rotate(15deg); }
  20% { transform: rotate(-10deg); }
  30% { transform: rotate(10deg); }
  40% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
  60% { transform: rotate(0deg); }
}

.bell-ring {
  animation: ring 1s ease-in-out infinite;
}
</style>
