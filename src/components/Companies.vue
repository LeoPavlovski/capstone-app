<template>
  <div class="d-flex">
    <v-dialog v-model="dialog" width="500">

      <v-card class="pa-5" v-if="editItem">
        <!-- Company Name -->
        <v-text-field
            v-model="editItem.name"
            dense
            outlined
            label="Company Name">
        </v-text-field>

        <!-- Company Website -->
        <v-text-field
            v-model="editItem.companyWebsite"
            dense
            outlined
            label="Company Website">
        </v-text-field>

        <!-- Company Size -->
        <v-select
            :items="companySizes"
            item-text="name"
            item-value="id"
            v-model="editItem.companySize"
            dense
            outlined
            label="Company Size">
        </v-select>

        <!-- Industry -->
        <v-select
            :items="industries"
            item-text="name"
            item-value="name"
            v-model="editItem.industry"
            dense
            outlined
            label="Industry">
        </v-select>

        <!-- Contact Person Name -->
        <v-text-field
            v-model="editItem.contactPersonName"
            dense
            outlined
            label="Contact Person Name">
        </v-text-field>

        <!-- Contact Person Email -->
        <v-text-field
            v-model="editItem.contactPersonEmail"
            dense
            outlined
            label="Contact Person Email">
        </v-text-field>

        <!-- Contact Person Phone -->
        <v-text-field
            v-model="editItem.contactPersonPhone"
            dense
            outlined
            label="Contact Person Phone">
        </v-text-field>

        <!-- Company Address -->
        <v-text-field
            v-model="editItem.address"
            dense
            outlined
            label="Company Address">
        </v-text-field>

        <!-- LinkedIn -->
        <v-text-field
            v-model="editItem.linkedin"
            dense
            outlined
            label="LinkedIn (optional)">
        </v-text-field>

        <!-- Twitter -->
        <v-text-field
            v-model="editItem.twitter"
            dense
            outlined
            label="Twitter (optional)">
        </v-text-field>

        <!-- Submit Button -->
        <v-btn color="primary" class="mt-4" width="100%" @click="submitEdit">Submit</v-btn>
      </v-card>
    </v-dialog>
    <Navigation class="w-100 w-md-25"></Navigation>
    <v-row class="text-center pa-5">
      <v-col cols="12" md="4">
        <v-card color="primary" elevation="3">
          <v-card-title class="white--text overflow-auto">Create Company</v-card-title>
          <v-card elevation="2" class="pa-5 internship-form overflow-auto" height="510" >
            <v-text-field dense outlined label="Name" v-model="company.name"></v-text-field>
            <v-text-field dense outlined label="Company Website" v-model="company.companyWebsite"></v-text-field>
            <v-select :items="companySizes" item-text="name" item-value="id" v-model="company.companySize" dense outlined label="Company Size"></v-select>
            <v-select :items="industries" item-text="name" item-value="name" v-model="company.industry" dense outlined label="Industry"></v-select>
            <v-text-field dense outlined label="Contact Person Name" v-model="company.contactPersonName"></v-text-field>
            <v-text-field dense outlined label="Contact Person Email" v-model="company.contactPersonEmail"></v-text-field>
            <v-text-field dense outlined label="Contact Person Phone" v-model="company.contactPersonPhone"></v-text-field>
            <v-text-field dense outlined label="Company Address" v-model="company.address"></v-text-field>
            <v-text-field dense outlined label="LinkedIn (optional)" v-model="company.linkedin"></v-text-field>
            <v-text-field dense outlined label="Twitter (optional)" v-model="company.twitter"></v-text-field>
            <v-btn :disabled="!isFormValid" color="primary" class="mt-4" width="100%" @click="addCompany">Submit</v-btn>
          </v-card>
        </v-card>
      </v-col>

      <!-- Active Internships Section -->
      <v-col cols="12" md="8">
        <v-card color="primary" class="elevation-3 white--text">
          <v-card-title>All Existing Companies</v-card-title>
          <v-data-table
              :items="companies"
              :headers="companyHeaders"
              item-key="id"
              class="elevation-2"
              height="450"
              :loading="loading"
              loading-text="loading..."
          >
            <template v-slot:item.companyName="{ item }">
              {{ item.name }}
            </template>

            <template v-slot:item.companySize="{ item }">
              <v-icon color="primary" class="mr-2">mdi-account-group</v-icon>
              {{ (item.companySize) }}
            </template>

            <template v-slot:item.industry="{ item }">
              <div class="d-flex align-center">
                <v-icon class="mr-2" color="orange">mdi-factory</v-icon>
                {{ (item.industry) }}
              </div>

            </template>

            <template v-slot:item.contactPersonName="{ item }">
              <div class="d-flex align-center">
              <v-icon class="mr-2" color="green">mdi-account-circle</v-icon>
              {{ item.contactPersonName }}
              </div>
            </template>

            <template v-slot:item.contactPersonEmail="{ item }">
              <div class="d-flex align-center">
              <v-icon class="mr-2" color="blue">mdi-email</v-icon>
              {{ item.contactPersonEmail }}
              </div>
            </template>

            <template v-slot:item.contactPersonPhone="{ item }">
              <div class="d-flex align-center">
              <v-icon color="purple" class="mr-2">mdi-phone</v-icon>
              {{ item.contactPersonPhone }}
              </div>
            </template>

            <template v-slot:item.companyWebsite="{ item }">
              <div class="d-flex align-center">
              <v-icon color="teal" class="mr-2">mdi-web</v-icon>
              <a :href="item.companyWebsite" target="_blank">{{ item.companyWebsite }}</a>
              </div>
            </template>

            <template v-slot:item.linkedin="{ item }">
              <div class="d-flex align-center">
              <v-icon color="blue" class="mr-2">mdi-linkedin</v-icon>
              <a :href="item.linkedin" target="_blank">{{ item.linkedin || 'N/A' }}</a>
              </div>
            </template>

            <template v-slot:item.twitter="{ item }">
              <div class="d-flex align-center">
              <v-icon color="cyan" class="mr-2">mdi-twitter</v-icon>
              <a :href="item.twitter" target="_blank">{{ item.twitter || 'N/A' }}</a>
              </div>
            </template>
            <template v-slot:item.actions="{ item }">
              <div class="d-flex" v-if="user.id === item.user_id">
                <v-btn @click="openDialog(item)" class="mr-2 primary" small>edit</v-btn>
                <v-btn @click="deleteCompany(item)" class="red white--text" small>delete</v-btn>
              </div>
            </template>

          </v-data-table>
        </v-card>

      </v-col>
      <v-col cols="12" md="12">
        <v-card color="primary" class="elevation-3 white--text">
          <v-card-title>My Created Companies</v-card-title>
          <v-data-table
              :items="filteredCompanies"
              :headers="companyHeaders"
              item-key="id"
              class="elevation-2"
              height="150"
              :loading="loading"
              loading-text="loading..."
          >
            <template v-slot:item.companyName="{ item }">
              {{ item.name }}
            </template>

            <template v-slot:item.companySize="{ item }">
              <v-icon class="mr-2" color="primary">mdi-account-group</v-icon>
              {{ (item.companySize) }}
            </template>

            <template v-slot:item.industry="{ item }">
              <div class="d-flex align-center">
                <v-icon color="orange" class="mr-2">mdi-factory</v-icon>
                {{ (item.industry) }}
              </div>

            </template>

            <template v-slot:item.contactPersonName="{ item }">
              <div class="d-flex align-center">
                <v-icon class="mr-2" color="green">mdi-account-circle</v-icon>
                {{ item.contactPersonName }}
              </div>
            </template>

            <template v-slot:item.contactPersonEmail="{ item }">
              <div class="d-flex align-center">
                <v-icon class="mr-2" color="blue">mdi-email</v-icon>
                {{ item.contactPersonEmail }}
              </div>
            </template>

            <template v-slot:item.contactPersonPhone="{ item }">
              <div class="d-flex align-center">
                <v-icon color="purple" class="mr-2">mdi-phone</v-icon>
                {{ item.contactPersonPhone }}
              </div>
            </template>

            <template v-slot:item.companyWebsite="{ item }">
              <div class="d-flex align-center">
                <v-icon color="teal" class="mr-2">mdi-web</v-icon>
                <a :href="item.companyWebsite" target="_blank">{{ item.companyWebsite }}</a>
              </div>
            </template>

            <template v-slot:item.linkedin="{ item }">
              <div class="d-flex align-center">
                <v-icon color="blue" class="mr-2">mdi-linkedin</v-icon>
                <a :href="item.linkedin" target="_blank">{{ item.linkedin || 'N/A' }}</a>
              </div>
            </template>

            <template v-slot:item.twitter="{ item }">
              <div class="d-flex align-center">
                <v-icon class="mr-2" color="cyan">mdi-twitter</v-icon>
                <a :href="item.twitter" target="_blank">{{ item.twitter || 'N/A' }}</a>
              </div>
            </template>

            <template v-slot:item.actions="{ item }">
              <div class="d-flex" v-if="user.id === item.user_id">
                <v-btn @click="openDialog(item)" class="mr-2 primary" small>edit</v-btn>
                <v-btn @click="deleteCompany(item)" class="red white--text" small>delete</v-btn>
              </div>
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
    //this.getUsers();
    this.getCompanies();

    //this.getInternships();
  },
  components: {
    Navigation,
  },
  computed: {
    ...mapState({
      //internships: state => state.internships,
      user: state => state.user,
      users: state => state.users,
      companies:state=>state.companies
    }),
    // Computed property to merge user data into internships
    // enrichedInternships() {
    //   return this.internships.map(internship => {
    //     const user = this.users.find(user => user.id === internship.user_id);
    //     return {
    //       ...internship,
    //       firstName: user ? user.name : '',
    //       lastName: user ? user.surname : '',
    //       userEmail: user ? user.email : ''
    //     };
    //   });
    // },
    filteredCompanies(){
      const filtered = this.companies.filter(company =>company.user_id  === this.user.id)
      return filtered;
    },
    isFormValid() {
      return (
          this.company.companyWebsite &&
          this.company.companySize &&
          this.company.industry &&
          this.company.contactPersonName &&
          this.company.contactPersonEmail &&
          this.company.contactPersonPhone &&
          this.company.address &&
          this.company.name
      );
    },
    // getUserInternships() {
    //   return this.enrichedInternships.filter(item => item.user_id === this.user.id);
    // },
  },
  data() {
    return {
      companyHeaders: [
        { text: 'Company Name', value: 'companyName' },
        { text: 'Company Size', value: 'companySize' },
        { text: 'Industry', value: 'industry' },
        { text: 'Contact Person Name', value: 'contactPersonName' },
        { text: 'Contact Person Email', value: 'contactPersonEmail' },
        { text: 'Contact Person Phone', value: 'contactPersonPhone' },
        { text: 'Company Website', value: 'companyWebsite' },
        { text: 'LinkedIn', value: 'linkedin' },
        { text: 'Twitter', value: 'twitter' },
        { text: 'Actions', value: 'actions' },
      ],
      company: {
        companyWebsite: '',
        companySize: '',
        industry: '',
        contactPersonName: '',
        contactPersonEmail: '',
        contactPersonPhone: '',
        address: '',
        linkedin: '',
        twitter: '',
        name:'',
      },
      companySize: null,
      industry: null,
      companySizes: [
        { id: 1, name: "Small (1-50 employees)" },
        { id: 2, name: "Medium (51-200 employees)" },
        { id: 3, name: "Large (201-1000 employees)" },
        { id: 4, name: "Enterprise (1000+ employees)" }
      ],
      industries: [
        { id: 1, name: "Information Technology" },
        { id: 2, name: "Healthcare" },
        { id: 3, name: "Finance" },
        { id: 4, name: "Education" },
        { id: 5, name: "Manufacturing" },
        { id: 6, name: "Retail" },
        { id: 7, name: "Construction" },
        { id: 8, name: "Marketing & Advertising" },
        { id: 9, name: "Telecommunications" },
        { id: 10, name: "Automotive" }
      ],
      loading:false,
      dialog: false,
      stipendOptions: [
        { id: 1, name: "Yes" },
        { id: 0, name: "No" }
      ],
      internshipHeaders: [
        { text: "Created", value: "created" },
        { text: "Internship Name", value: "name" },
        { text: "Company", value: "company" },
        { text: "Start Date", value: "start_date" },
        { text: "End Date", value: "end_date" },
        { text: "Location", value: "location" },
        { text: "Duration", value: "duration" },
        { text: "Scholarship", value: "stipend" },
        { text: "Deadline", value: "deadline" },
        { text: "Actions", value: "actions" }
      ],
      myHeaders: [
        { text: "Internship Name", value: "name" },
        { text: "Company", value: "company" },
        { text: "Start Date", value: "start_date" },
        { text: "End Date", value: "end_date" },
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
    addCompany(){
      const body = {
        companyWebsite: this.company.companyWebsite,
        companySize: this.company.companySize,
        industry: this.company.industry,
        contactPersonName: this.company.contactPersonName,
        contactPersonEmail: this.company.contactPersonEmail,
        contactPersonPhone: this.company.contactPersonPhone,
        address: this.company.address,
        linkedin: this.company.linkedin,
        twitter: this.company.twitter,
        name: this.company.name,
        user_id:this.user.id,
        department:this.user.department
      };
      this.$store.dispatch('addCompany', body).then(res=>{
        this.getCompanies();
        //
        // companyWebsite: '',
        //     companySize: '',
        //     industry: '',
        //     contactPersonName: '',
        //     contactPersonEmail: '',
        //     contactPersonPhone: '',
        //     address: '',
        //     linkedin: '',
        //     twitter: '',
        //     name:'',
        this.company = {
          name: '',
          companySize: '',
          industry: '',
          contactPersonName: '',
          contactPersonEmail: '',
          contactPersonPhone: '',
          address: '',
          linkedin: '',
          twitter: '',
          companyWebsite:''
        };
      })
    },
    deleteCompany(item){
      const body ={
        id: item.id
      }
      this.$store.dispatch('deleteCompany', body.id).then(res=>{
        this.getCompanies();
      })
    },
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
        address: this.editItem.address,
        companySize: this.editItem.companySize,
        companyWebsite: this.editItem.companyWebsite,
        contactPersonEmail: this.editItem.contactPersonEmail,
        contactPersonName: this.editItem.contactPersonName,
        contactPersonPhone: this.editItem.contactPersonPhone,
        industry: this.editItem.industry,
        linkedin: this.editItem.linkedin,
        name: this.editItem.name,
        twitter: this.editItem.twitter,
      };
      this.$store.dispatch('editCompany', body).then(res => {
        // this.getInternships();
        this.getCompanies();
        this.dialog = false;
      });
    },
    openDialog(item) {
      this.editItem = { ...item };
      this.dialog = true;
    },
    // deleteInternship(item) {
    //   const body = {
    //     id: item.id
    //   };
    //   this.$store.dispatch('deleteInternship', body.id).then(res => {
    //     this.getInternships();
    //   });
    // },
  },
};
</script>


<style scoped>
/* Add any custom styles here */
</style>
