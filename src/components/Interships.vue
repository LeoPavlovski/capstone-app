<template>
  <div class="d-flex">
    <v-dialog v-model="dialog" width="500">

      <v-card class="pa-5" v-if="editItem">
        <v-text-field v-model="editItem.name" dense outlined label="Internship Name"></v-text-field>
        <v-textarea no-resize v-model="editItem.description" dense outlined label="Internship Description"></v-textarea>
        <v-text-field dense outlined label="Start Date" type="date" v-model="editItem.start_date"></v-text-field>
        <v-text-field dense outlined label="End Date" type="date" v-model="editItem.end_date"></v-text-field>
        <v-text-field dense outlined label="Location" v-model="editItem.location"></v-text-field>
        <v-text-field  dense outlined label="Enter Company" v-model="editItem.company"></v-text-field>
        <v-text-field v-model="editItem.duration" dense outlined label="Duration (e.g., 6 months)"></v-text-field>
        <v-select :items="stipendOptions" item-text="name" item-value="id" v-model="editItem.stipend" dense outlined label="Scholarship (optional)"></v-select>
        <v-text-field dense outlined label="Application Deadline" type="date" v-model="editItem.deadline"></v-text-field>
        <v-btn color="primary" class="mt-4" width="100%" @click="submitEdit">Submit</v-btn>
      </v-card>
    </v-dialog>
    <Navigation class="w-100 w-md-25"></Navigation>
    <v-row class="text-center pa-5">
      <v-col cols="12" md="4">
        <v-card color="primary" elevation="3">
          <v-card-title class="white--text">Create Internship</v-card-title>
          <v-card elevation="2" class="pa-5 internship-form overflow-auto" height="300">
            <v-text-field v-model="intershipForm.name" dense outlined label="Internship Name"></v-text-field>
            <v-textarea no-resize v-model="intershipForm.description" dense outlined label="Internship Description"></v-textarea>
            <v-text-field dense outlined label="Start Date" type="date" v-model="intershipForm.start_date"></v-text-field>
            <v-text-field dense outlined label="End Date" type="date" v-model="intershipForm.end_date"></v-text-field>
            <v-text-field dense outlined label="Location" v-model="intershipForm.location"></v-text-field>
            <v-select dense v-model="companyItem" item-text="name" item-value="id" outlined label="Company" :items="companies"></v-select>
            <v-text-field v-model="intershipForm.duration" dense outlined label="Duration (e.g., 6 months)"></v-text-field>
            <v-select :items="stipendOptions" item-text="name" item-value="id" v-model="intershipForm.stipend" dense outlined label="Scholarship (optional)"></v-select>
            <v-text-field dense outlined label="Application Deadline" type="date" v-model="intershipForm.deadline"></v-text-field>
            <v-btn :disabled="!isFormValid" color="primary" class="mt-4" width="100%" @click="addInternship">Submit</v-btn>
          </v-card>
        </v-card>
      </v-col>

      <!-- Active Internships Section -->
      <v-col cols="12" md="8">
        <v-card color="primary" class="elevation-3 white--text">
          <v-card-title>Active Internships By Professors</v-card-title>
          <v-data-table
              :items="enrichedInternships"
              :headers="internshipHeaders"
              item-key="id"
              class="elevation-2"
              height="240"
              :loading="loading"
              loading-text="loading..."
          >

            <template v-slot:item.created="{item}">
              {{item.firstName}} {{item.lastName}}
            </template>
            <template v-slot:item.start_date="{item}">
              <v-icon color="primary">mdi-calendar-today</v-icon>
              {{item.start_date}}
            </template>
            <template v-slot:item.end_date="{item}">
              <v-icon color="red">mdi-calendar-clock</v-icon>
              {{item.end_date}}
            </template>
            <template v-slot:item.actions="{item}">
              <div class="d-flex" v-if="user.id === item.user_id">
                <v-btn @click="openDialog(item)" class="mr-2 primary" small>edit</v-btn>
                <v-btn @click="deleteInternship(item)" class="red white--text" small >delete</v-btn>
              </div>
            </template>
            <template v-slot:item.stipend="{item}">
              <div class="d-flex">
                <span>{{item.stipend === 0 ? 'No' : 'Yes'}}</span>
              </div>
            </template>
            <template v-slot:item.duration="{item}">
              <div class="d-flex">
                <v-icon class="mr-2" color="orange">mdi-clock</v-icon>
                <span>{{item.duration}}</span>
              </div>
            </template>
            <template v-slot:item.courses="{ item }">
              <ul>
                <li v-for="course in item.courses" :key="course.id">{{ course.name }}</li>
              </ul>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12" class="text-left">
      <v-card color="primary" class="elevation-3">
        <v-card-title class="white--text">My Active Internships</v-card-title>
        <v-data-table :loading="loading" :headers="myHeaders" :items="getUserInternships" height="160">
          <template v-slot:item="{item}">
            <tr>
              <td>{{item.name}}</td>
              <td>{{item.company}}</td>
              <td>
                <v-icon color="primary">mdi-calendar-today</v-icon>
                {{item.start_date}}
              </td>
              <td>
                <v-icon color="red">mdi-calendar-clock</v-icon>
                {{item.end_date}}
              </td>
              <td>{{item.location}}</td>
              <td>
                <v-icon class="mr-2" color="orange">mdi-clock</v-icon>
                {{item.duration}}
              </td>
              <td>{{item.stipend === 0 ? 'No' : 'Yes'}}</td>
              <td>{{item.deadline}}</td>
              <td>
                <v-btn class="primary mr-2" @click="openDialog(item)" small>Edit</v-btn>
                <v-btn class="red white--text" @click="deleteInternship(item)" small>Delete</v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import { mapState } from "vuex";

export default {
  mounted() {
    this.getUsers();
    this.getInternships();
    this.getCompanies();
  },
  components: {
    Navigation,
  },
  computed: {
    ...mapState({
      internships: state => state.internships,
      user: state => state.user,
      users: state => state.users,
      companies:state=>state.companies
    }),
    // Computed property to merge user data into internships
    enrichedInternships() {
      return this.internships.map(internship => {
        const user = this.users.find(user => user.id === internship.user_id);
        return {
          ...internship,
          firstName: user ? user.name : '',
          lastName: user ? user.surname : '',
          userEmail: user ? user.email : ''
        };
      });
    },
      isFormValid() {
        return (
            this.intershipForm.name &&
            this.intershipForm.description &&
            this.intershipForm.start_date &&
            this.intershipForm.end_date &&
            this.intershipForm.location &&
            this.companyItem &&
            this.intershipForm.duration &&
            this.intershipForm.stipend !== '' &&
            this.intershipForm.deadline
        );
      },
    getUserInternships() {
      return this.enrichedInternships.filter(item => item.user_id === this.user.id);
    },
  },
  data() {
    return {
      companyItem:null,
      loading:false,
      dialog: false,
      stipendOptions: [
        { id: 1, name: "Yes" },
        { id: 0, name: "No" }
      ],
      internshipHeaders: [
        { text: "Created", value: "created" },
        { text: "Internship", value: "name" },
        { text: "Company", value: "company" },
        { text: "Start", value: "start_date" },
        { text: "End", value: "end_date" },
        { text: "Location", value: "location" },
        { text: "Duration", value: "duration" },
        { text: "Scholarship", value: "stipend" },
        { text: "Deadline", value: "deadline" },
        { text: "Actions", value: "actions" }
      ],
      myHeaders: [
        { text: "Internship ", value: "name" },
        { text: "Company", value: "company" },
        { text: "Start", value: "start_date" },
        { text: "End", value: "end_date" },
        { text: "Location", value: "location" },
        { text: "Duration", value: "duration" },
        { text: "Scholarship", value: "stipend" },
        { text: "Deadline", value: "deadline" },
        { text: "Actions", value: "actions" }
      ],
      intershipForm: {
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        company: "",
        duration: "",
        stipend: "",
        deadline: "",
        location: ''
      },
      editItem: null,
    };
  },
  methods: {
    getCompanies(){
      this.$store.dispatch('getCompanies');
    },
    getUsers() {
      this.$store.dispatch('getUsers');
    },
    getInternships() {
      this.loading=true
      this.$store.dispatch('getInternships').then(res=>{
        this.loading=false;
      });
    },
    submitEdit() {
      const body = {
        id: this.editItem.id,
        name: this.editItem.name,
        company: this.editItem.company,
        start_date: this.editItem.start_date,
        end_date: this.editItem.end_date,
        location: this.editItem.location,
        duration: this.editItem.duration,
        stipend: this.editItem.stipend,
        deadline: this.editItem.deadline,
        description: this.editItem.description
      };
      this.$store.dispatch('updateInternship', body).then(res => {
        this.getInternships();
        this.dialog = false;
      });
    },
    addInternship() {
      const body = {
        user_id: this.user.id,
        name: this.intershipForm.name,
        company: this.companyItem,
        start_date: this.intershipForm.start_date,
        end_date: this.intershipForm.end_date,
        location: this.intershipForm.location,
        duration: this.intershipForm.duration,
        stipend: this.intershipForm.stipend,
        deadline: this.intershipForm.deadline,
        description: this.intershipForm.description,
      };
      this.$store.dispatch('addInternship', body).then(res => {
        this.intershipForm = {
          name: '',
          company: '',
          start_date: '',
          end_date: '',
          location: '',
          duration: '',
          stipend: '',
          deadline: '',
          description: ''
        };
        this.getInternships();
      });
    },
    openDialog(item) {
      this.editItem = { ...item };
      this.dialog = true;
    },
    deleteInternship(item) {
      const body = {
        id: item.id
      };
      this.$store.dispatch('deleteInternship', body.id).then(res => {
        this.getInternships();
      });
    },
  },
};
</script>


<style scoped>
/* Add any custom styles here */
</style>
