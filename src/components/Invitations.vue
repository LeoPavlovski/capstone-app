<template>
  <div>
    <div class="d-flex">
      <Navigation class="w-100 w-md-25"></Navigation>
      <v-row class="text-center pa-5">
        <v-col cols="12" md="6">
          <v-card color="primary white--text">
            <v-card-title>Your Internship Invitations </v-card-title>
            <v-data-table height="500"  :headers="myHeaders" :items="invitations.invitations">
              <template v-slot:item="{item}">
               <tr v-if="item.status === 'pending'">
                 <td  class="text-left">{{item.internship.name}}</td>
                 <td  class="text-left">{{item.internship.description}}</td>
                 <td  class="text-left">{{item.internship.company}}</td>
                 <td  class="text-left pa-2">{{item.internship.start_date}}</td>
                 <td  class="text-left pa-2">{{item.internship.end_date}}</td>
                 <td  class="text-left">{{item.internship.location}}</td>
                 <td class="text-left pa-2">{{item.internship.deadline}}</td>
                 <td class="text-left">{{item.internship.stipend}}</td>
                 <td  class="text-left pa-2">{{item.internship.deadline}}</td>
                 <td>
                   <div class="d-flex text-left">
                     <v-btn small @click="declineInternship(item)" class="white--text mx-2" color="red">Deny</v-btn>
                     <v-btn small @click="acceptInternship(item)" class="white--text" color="green">Accept</v-btn>
                   </div>
                 </td>
               </tr>
              </template>

            </v-data-table>
          </v-card>

        </v-col>
        <v-col cols="12" md="6">
          <v-card color="primary white--text">
            <v-card-title>Your Past Internships</v-card-title>
            <v-data-table height="500" :headers="myHeaders" :items="invitations.invitations">
              <template v-slot:item="{item}">
                <tr v-if="item.status !== 'pending'">
                  <td class="text-left">{{item.internship.name}}</td>
                  <td class="text-left">{{item.internship.description}}</td>
                  <td  class="text-left">{{item.internship.company}}</td>
                  <td  class="text-left">{{item.internship.start_date}}</td>
                  <td  class="text-left"> {{item.internship.end_date}}</td>
                  <td  class="text-left">{{item.internship.location}}</td>
                  <td  class="text-left">{{item.internship.deadline}}</td>
                  <td  class="text-left">{{item.internship.stipend}}</td>
                  <td  class="text-left">{{item.internship.deadline}}</td>
                  <td>
                    <v-chip  class="white--text" :class="item.status === 'accepted' ?  'green' : 'red'">
                      {{item.status}}
                    </v-chip>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col cols="12" md="12">
          <v-card color="primary" class="elevation-3 white--text">
            <v-card-title>News For CST Department</v-card-title>
            <v-data-table
                :items="newsData"
                :headers="newsHeaders"
                item-key="id"
                class="elevation-2"
                height="400"
                :loading="loading"
                loading-text="loading..."
            >
              <template v-slot:item.title="{item}">
                <v-icon x-small color="red">mdi-checkbox-blank-circle</v-icon>
                {{item.title}}
              </template>
              <template v-slot:item.content="{item}">
                <v-icon small color="red">mdi-book-open-page-variant</v-icon>
                {{item.content}}
              </template>
              <template v-slot:item.publication_date="{item}">
                <v-icon small color="blue">mdi-timetable</v-icon>
                {{item.publication_date}}
              </template>
              <template v-slot:item.author="{item}">
                <v-icon small color="orange">mdi-account-box</v-icon>
                {{item.author}}
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>

</template>

<script>
import Navigation from "@/components/Navigation.vue";
import {mapState} from "vuex";

export default {
  async mounted() {
    await this.getUsers();
    await this.getNews();
  },
  components: {
    Navigation,
  },
  computed: {
    ...mapState({
      user: state => state.user,
      invitations :state=>state.invitations,
      newsData:state=>state.news,
    }),
  },
  data() {
    return {
      loading:false,
      newsHeaders: [
        { text: "Title", value: "title" },
        { text: "Content", value: "content" },
        { text: "Author", value: "author" },
        { text: "Publication Date", value: "publication_date" },
      ],
      myHeaders: [
        { text: "Internship Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Company", value: "company" },
        { text: "Start Date", value: "start_date" },
        { text: "End Date", value: "end_date" },
        { text: "Location", value: "location" },
        { text: "Duration", value: "duration" },
        { text: "Scholarship", value: "stipend" },
        { text: "Deadline", value: "deadline" },
        { text: "Status", value: "status" },
      ],
    };
  },
  methods: {
    getNews(){
      this.$store.dispatch('getNews');
    },
    getStudentInvitations(){
      const body ={
        id:this.user.id
      }
      this.$store.dispatch('getStudentInvitations',body);
    },
    acceptInternship(item) {
      const body = {
        status: 'accepted'
      };
      // Use the actual invitation ID instead of internship_id
      this.$store.dispatch('manageInvitation', { invitationId: item.id, body }).then(res => {
        this.getStudentInvitations();
      });
    },
    declineInternship(item) {
      const body = {
        status: 'rejected'
      };
      this.$store.dispatch('manageInvitation', { invitationId: item.id, body }).then(res => {
        this.getStudentInvitations();
      });
    },
    getUsers() {
      this.$store.dispatch('getUsers');
    },
  },
};
</script>



<style scoped>
/* Add any custom styles here */
</style>
