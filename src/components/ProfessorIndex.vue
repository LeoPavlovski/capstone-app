<template>
  <div class="d-flex">
    <Navigation class="w-100 w-md-25"></Navigation>
    <v-row class="text-center pa-5">
      <v-col cols="12" md="6">
        <v-card class="px-0" color="primary">
          <v-card-title class="white--text">Latest News</v-card-title>
          <v-card style="border-radius:0px !important;" class="pa-5 overflow-auto" elevation="1" height="280" min-height="280">
            <v-expansion-panels>
              <v-expansion-panel v-for="item in news" :key="item.id">
                <v-expansion-panel-header>
                  <div class="d-flex justify-space-between align-center">
                    <span>{{ item.title }}</span>
                    <span>{{ new Date(item.publication_date).toLocaleDateString() }}</span>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="text-left">
                    <p><strong>Author:</strong> {{ item.author }}</p>
                    <p>{{ item.content }}</p>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

          </v-card>
        </v-card>
      </v-col>

      <!-- Active Internships Section -->
      <v-col cols="6">
        <v-card height="343" min-height="343" elevation="8">
          <v-card-title class="primary white--text"  color="primary">Companies</v-card-title>
          <v-card elevation="0">
            <v-card-text>
              <v-expansion-panels>
                <v-expansion-panel
                    v-for="company in companies"
                    :key="company.id"
                    class="mb-2"
                >
                  <v-expansion-panel-header>
                    <v-chip color="">
                      <v-icon color="blue" class="mr-2">mdi-office-building</v-icon>
                      <span class="text-capitalize"> {{ company.name }}</span>
                    </v-chip>

                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-list style="max-height:300px; overflow:auto;">
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="green">mdi-account-multiple</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>{{ company.companySize }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="purple">mdi-web</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>{{ company.companyWebsite }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="orange">mdi-account-tie</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>{{ company.contactPersonName }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="red">mdi-email</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>{{ company.contactPersonEmail }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="green">mdi-phone</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>{{ company.contactPersonPhone }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="brown">mdi-factory</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>{{ company.industry }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="purple">mdi-map-marker</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>{{ company.address }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="blue">mdi-linkedin</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>{{ company.linkedin }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="light-blue">mdi-twitter</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>{{ company.twitter }}</v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>
          </v-card>
          </v-card>
      </v-col>
      <v-col cols="12" md="12">
        <v-card  class="elevation-5 white--text" height="300" style="overflow:auto;">
          <v-card-title class="primary" style="position:sticky; left:0;top:0; z-index:1;">Today's Lectures</v-card-title>
          <v-card-text >
              <v-row>
                <v-col
                    v-for="course in getTodayCourses"
                    :key="course.id"
                    cols="12"
                >
                  <v-card class="mb-2" elevation="1">
                    <v-card-title>
                      {{ course.name }}
                    </v-card-title>
                    <v-card-subtitle>
                      <v-chip color="orange" text-color="white">
                        <v-icon left>mdi-calendar-today</v-icon>
                        {{ course.start_date }}
                      </v-chip>
                      <v-chip color="red" text-color="white" class="ml-2">
                        <v-icon left>mdi-calendar-clock</v-icon>
                        {{ course.end_date }}
                      </v-chip>
                    </v-card-subtitle>
                    <v-card-text>
                      <p><v-icon color="purple">mdi-google-maps</v-icon> {{ course.location }}</p>
                      <p><v-icon color="orange">mdi-clock</v-icon> {{ course.time }}</p>
                      <p><v-icon color="green">mdi-account-multiple</v-icon> Max Students: {{ course.max_students }}</p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import { mapState } from "vuex";

export default {
  async mounted() {
    await this.getUsers();
    await this.getCourses();
    await this.getCompanies();
    await this.getNews();
    await this
  },
  components: {
    Navigation,
  },
  computed: {
    ...mapState({
      user: state => state.user,
      courses: state => state.courses,
      companies:state=>state.companies,
      news:state=>state.news
    }),
    getMyCourses(){
      const myCourses  = this.courses.filter(course =>course.user_id === this.user.id);
      return myCourses;
    },
    getTodayCourses() {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      const myCourses = this.courses.filter(course =>
          course.user_id === this.user.id && course.start_date === today
      );
      return myCourses;
    }
  },
  data() {
    return {
      courseData:[],
      courseForm: {
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        time: '',
        location: '',
        course_code: '',
        max_students: null,
      },
      loading:false,
      dialog: false,
      stipendOptions: [
        { id: 1, name: "Yes" },
        { id: 0, name: "No" }
      ],
      courseHeaders: [
        { text: "Course Name", value: "name" },
        { text: "Course Code", value: "course_code" },
        { text: "Start Date", value: "start_date" },
        { text: "End Date", value: "end_date" },
        { text: "Time", value: "time" },
        { text: "Location", value: "location" },
        { text: "Max Students", value: "max_students" },
      ],
      MyHeaders: [
        { text: 'Name', value: 'name' },
        { text: 'Company Size', value: 'companySize' },
        { text: 'Website', value: 'companyWebsite' },
        { text: 'Contact Name', value: 'contactPersonName' },
        { text: 'Contact Email', value: 'contactPersonEmail' },
        { text: 'Contact Phone', value: 'contactPersonPhone' },
        { text: 'Industry', value: 'industry' },
        { text: 'Address', value: 'address' },
        { text: 'LinkedIn', value: 'linkedin' },
        { text: 'Twitter', value: 'twitter' },
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
      courseItem: null,
    };
  },
  methods: {
    getNews(){
      this.$store.dispatch('getNews');
    },
    getCompanies(){
      this.$store.dispatch('getCompanies');
    },
    getCourses(){
      this.$store.dispatch('getCourses')
    },
    getUsers() {
      this.$store.dispatch('getUsers');
    },
    openDialog(item) {
      this.courseItem = { ...item };
      this.dialog = true;
    },
    deleteCourse(item) {
      const body = {
        id: item.id
      };
      this.$store.dispatch('deleteCourse', body.id).then(res => {
        this.getCourses();
      });
    },
  },
};
</script>


<style scoped>
/* Add any custom styles here */
</style>
