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
                 <td  class="text-left">{{item.internship.start_date}}</td>
                 <td  class="text-left">{{item.internship.end_date}}</td>
                 <td  class="text-left">{{item.internship.location}}</td>
                 <td class="text-left">{{item.internship.deadline}}</td>
                 <td class="text-left">{{item.internship.stipend}}</td>
                 <td  class="text-left">{{item.internship.deadline}}</td>
                 <td class="d-flex text-left">
                   <v-btn @click="declineInternship(item)" class="white--text mx-2" color="red">Deny</v-btn>
                   <v-btn @click="acceptInternship(item)" class="white--text" color="green">Accept</v-btn>
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
                    <v-chip class="white--text" :class="item.status === 'accepted' ?  'green' : 'red'">
                      {{item.status}}
                    </v-chip>
                  </td>
                </tr>
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
  },
  components: {
    Navigation,
  },
  computed: {
    ...mapState({
      user: state => state.user,
      invitations :state=>state.invitations
    }),
  },
  data() {
    return {
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
