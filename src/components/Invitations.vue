<template>
  <div>
    <div class="d-flex">
      <Navigation class="w-100 w-md-25"></Navigation>
      <v-row class="text-center pa-5">
        <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
          {{ snackbarMessage }}
        </v-snackbar>
        <v-col cols="12" md="6">
          <v-card color="primary white--text">
            <v-card-title>Your Internship Invitations </v-card-title>
            <v-data-table height="350"  :headers="myHeaders" :items="invitations.invitations">
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
            <v-data-table height="350" :headers="myHeaders" :items="invitations.invitations">
              <template v-slot:item="{item}">
                <tr v-if="item.status !== 'pending'">
                  <td class="text-left">{{item.internship_id}}</td>
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
        <v-col cols="6" md="6">
          <v-card color="primary" class="elevation-3 white--text">
            <v-card-title>News For CST Department</v-card-title>
            <v-data-table
                :items="newsData"
                :headers="newsHeaders"
                item-key="id"
                class="elevation-2"
                height="250"
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
        <v-col cols="6" md="6">
          <v-card color="primary" elevation="3" width="100%">
            <v-card-title class="white--text">Apply For Internship</v-card-title>
<!--
           Sending the internship id , and the userId . -->
            <v-card class="px-2" :height="310">
              <v-col class="elevation-0">
                <v-select
                    outlined
                    class="pt-2"
                    :items="getUserInternships"
                    item-text="name"
                    item-value="id"
                    label="Select An Internship"
                    v-model="internshipId"
                    :menu-props="{ offsetY: true }"

                ></v-select>
                <div class="d-flex justify-center">
                  <v-btn color="primary" width="200px" :disabled="internshipId === null" @click="joinInternship">Join</v-btn>
                </div>
              </v-col>


            </v-card>
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
    await this.getInternships();
  },
  components: {
    Navigation,
  },
  computed: {
    ...mapState({
      user: state => state.user,
      invitations :state=>state.invitations,
      newsData:state=>state.news,
      internships: state => state.internships,
    }),
    getUserInternships() {
      const invitedIds = (this.invitations?.invitations || []).map(invitation => invitation.internship_id);
      return this.internships.filter(internship => !invitedIds.includes(internship.id));
    }
  },
  data() {
    return {
      loading:false,
      internshipId:null,
      snackbarMessage :'',
      snackbarColor:null,
      snackbar:false,
      newsHeaders: [
        { text: "Title", value: "title" },
        { text: "Content", value: "content" },
        { text: "Author", value: "author" },
        { text: "Publication Date", value: "publication_date" },
      ],
      myHeaders: [
        { text: "Internship", value: "name" },
        { text: "Description", value: "description" },
        { text: "Company", value: "company" },
        { text: "Start", value: "start_date" },
        { text: "End", value: "end_date" },
        { text: "Location", value: "location" },
        { text: "Duration", value: "duration" },
        { text: "Scholarship", value: "stipend" },
        { text: "Deadline", value: "deadline" },
        { text: "Status", value: "status" },
      ],
    };
  },
  methods: {
    joinInternship() {
      const body = {
        internship_id: this.internshipId,
        user_id: this.user.id,
      };

          this.$store.dispatch('joinInternship', body).then(res=>{
            this.snackbarMessage = res.data.message
            this.snackbarColor = 'green';
            this.snackbar= true;
          })
          .catch((error) => {
            // Check if the error has a response and a message
            if (error.response && error.response.data && error.response.data.message) {
              console.error('Error Message:', error.response.data.message); // Logs the error message
              // You can display the message in your component, e.g.:
              this.snackbarMessage = error.response.data.message;
              this.snackbarColor = 'red';
              this.snackbar= true;
            } else {
              console.error('Unexpected Error:', error.message);
              this.snackbarMessage = error.message;
              this.snackbarColor = 'red';
              this.snackbar= true;
            }
          });

    },
    getInternships() {
      this.$store.dispatch('getInternships').then(res => {
      });
    },
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
