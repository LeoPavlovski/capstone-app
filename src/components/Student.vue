<template>
  <div>
    <div class="d-flex">
      <Navigation class="w-100 w-md-25"></Navigation>
      <v-row class="text-center pa-5">
        <v-col cols="12" md="6">
          <v-card color="primary">
            <v-card-title class="white--text">Apply For Internship</v-card-title>
          </v-card>
          <v-card elevation="2" class="pa-5">
            <v-select :items="enrichedInternships" item-text="name" dense outlined label="Select Internship"></v-select>
            <v-btn  :disabled="!isFormValid" color="primary" width="100%" @click="addCourse">Submit</v-btn>
            <v-col cols="12" class="text-left px-0 mx-0">
              <v-card color="primary" class="elevation-3">
                <v-card-title class="white--text">Apply For Courses (CST Department)</v-card-title>
                <v-data-table :loading="loading" :headers="courseHeaders" :items="filteredCourses"  height="250 ">
                  <template v-slot:item="{item}">
                    <tr>
                      <td>{{item.name}}</td>
                      <td>{{item.course_code}}</td>
                      <td>
                        <div class="d-flex" style="width:100px;">
                          <v-icon color="primary">mdi-calendar-today</v-icon>
                          {{item.start_date}}
                        </div>
                      </td>
                      <td>
                        <div class="d-flex" style="width:100px;">
                          <v-icon color="red">mdi-calendar-clock</v-icon>
                          {{item.end_date}}
                        </div>
                      </td>
                      <td>
                        <div class="d-flex">
                          <v-icon color="orange">mdi-clock</v-icon>
                          {{item.time}}
                        </div>
                      </td>
                      <td class="d-flex align-center">
                        <div class="d-flex" style="width:100px;">
                          <v-icon color="purple">mdi-google-maps</v-icon>
                          {{item.location}}
                        </div>

                      </td>
                      <td>
                        <v-icon color="green">mdi-account-multiple</v-icon>
                        {{item.max_students}}</td>
                      <td>
                        <v-btn class="green mr-2 white--text" @click="applyCourse(item)" small>Apply</v-btn>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-card>
          <v-card  color="primary" class="mt-5">
            <v-card-title class="white--text">My Courses</v-card-title>
            <v-data-table height="420" :items="myCourses" :headers="courseHeaders">

            </v-data-table>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card color="primary" class="elevation-3 white--text">
            <v-card-title>Available Internships</v-card-title>
            <v-data-table
                :items="enrichedInternships"
                :headers="internshipHeaders"
                item-key="id"
                class="elevation-2"
                height="480"
                :loading="loading"
                loading-text="loading..."
            >

              <template v-slot:item.created="{item}">
                <div>
                  {{item.firstName}} {{item.lastName}}
                </div>
              </template>
              <template v-slot:item.start_date="{item}">
                <div class="d-flex" style="width:100px;">
                  <v-icon color="primary">mdi-calendar-today</v-icon>
                  {{item.start_date}}
                </div>
              </template>
              <template v-slot:item.description="{item}">
                <div class="d-flex" style="width:200px;">
                  {{item.description}}
                </div>
              </template>
              <template v-slot:item.end_date="{item}">
                <div class="d-flex" style="width:100px;">
                  <v-icon color="red">mdi-calendar-clock</v-icon>
                  {{item.end_date}}
                </div>
              </template>
              <template v-slot:item.stipend="{item}">
                <div class="d-flex" style="width:100px;">
                  <span>{{item.stipend === 0 ? 'No' : 'Yes'}}</span>
                </div>
              </template>
              <template v-slot:item.duration="{item}">
                <div class="d-flex" style="width:100px;">
                  <v-icon class="mr-2" color="orange">mdi-clock</v-icon>
                  <span>{{item.duration}}</span>
                </div>
              </template>
              <template v-slot:item.deadline="{item}">
                <div class="d-flex" style="width:120px;">
                  <span>{{item.deadline}}</span>
                </div>
              </template>
              <template v-slot:item.courses="{ item }">
                <ul>
                  <li v-for="course in item.courses" :key="course.id">{{ course.name }}</li>
                </ul>
              </template>
            </v-data-table>
          </v-card>
          <v-card  color="primary" class="mt-5">
            <v-card-title class="white--text">Today's Lectures</v-card-title>
            <v-data-table height="420" :items="filteredCoursesToday" :headers="courseHeaders">

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
    await this.getCourses();
    await this.getInternships();
    await this.getStudentCourses();
    await this.getStudentInvitations();
  },
  components: {
    Navigation,
  },
  computed: {
    ...mapState({
      user: state => state.user,
      courses: state => state.courses,
      internships: state => state.internships,
      users: state => state.users,
      myCourses: state => state.myCourses,
      invitations :state=>state.invitations

    }),
    filteredCourses() {
      const joinedCourseIds = this.myCourses.map(course => course.id);
      const availableCourses = this.courses.filter(course => !joinedCourseIds.includes(course.id));

      return availableCourses;
    },
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
    joinedCourses() {
      return this.myCourses;
    },
    filteredCoursesToday() {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      return this.myCourses.filter(course => {
        return course.start_date === today || course.end_date === today;
      });
    },
    isFormValid() {
      return (
          this.courseForm.name &&
          this.courseForm.description &&
          this.courseForm.start_date &&
          this.courseForm.end_date &&
          this.courseForm.time &&
          this.courseForm.location &&
          this.courseForm.max_students
      );
    },
    isFormValidForEdit() {
      return (
          this.courseItem.name &&
          this.courseItem.description &&
          this.courseItem.start_date &&
          this.courseItem.end_date &&
          this.courseItem.time &&
          this.courseItem.location &&
          this.courseItem.max_students
      );
    },
  },
  data() {
    return {
      number : 1000,
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
      loading: false,
      invitationsDialog: false,
      stipendOptions: [
        { id: 1, name: "Yes" },
        { id: 0, name: "No" }
      ],
      internshipHeaders: [
        { text: "Created", value: "created" },
        { text: "Internship Name", value: "name" },
        { text: "Company", value: "company" },
        { text: "Description", value: "description" },
        { text: "Start Date", value: "start_date" },
        { text: "End Date", value: "end_date" },
        { text: "Location", value: "location" },
        { text: "Duration", value: "duration" },
        { text: "Scholarship", value: "stipend" },
        { text: "Deadline", value: "deadline" },
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
      courseItem: null,
    };
  },
  methods: {
    getStudentInvitations(){
      const body ={
        id:this.user.id
      }
      this.$store.dispatch('getStudentInvitations',body).then(res=>{
        if(res.data.invitations.length >0){
          this.invitationsDialog=true;
        }
      })
    },
    getInternships() {
      this.$store.dispatch('getInternships').then(res=>{
      });
    },
    getUsers() {
      this.$store.dispatch('getUsers');
    },
    getStudentCourses() {
      const body = {
        id: this.user.id,
      };
      this.$store.dispatch('getMyCourses', body);
    },
    applyCourse(item) {
      const body = {
        user_id: this.user.id,
        course_id: item.id,
      };
      this.$store.dispatch('joinCourse', body).then(() => {
        this.getStudentCourses(); // Refresh the joined courses
      });
    },
    getCourses() {
      this.$store.dispatch('getCourses');
    },
    addCourse() {
      const body = {
        name: this.courseForm.name,
        description: this.courseForm.description,
        start_date: this.courseForm.start_date,
        end_date: this.courseForm.end_date,
        time: this.courseForm.time,
        location: this.courseForm.location,
        course_code: this.courseForm.course_code,
        max_students: this.courseForm.max_students,
        user_id: this.user.id,
      };
      this.$store.dispatch('addCourse', body).then(() => {
        this.courseForm.name = '';
        this.courseForm.description = '';
        this.courseForm.start_date = '';
        this.courseForm.end_date = '';
        this.courseForm.time = '';
        this.courseForm.location = '';
        this.courseForm.course_code = '';
        this.courseForm.max_students = '';
        this.getCourses();
      });
    },
    submitEdit() {
      const body = {
        name: this.courseItem.name,
        description: this.courseItem.description,
        start_date: this.courseItem.start_date,
        end_date: this.courseItem.end_date,
        time: this.courseItem.time,
        location: this.courseItem.location,
        course_code: this.courseItem.course_code,
        max_students: this.courseItem.max_students,
        id: this.courseItem.id,
      };
      this.$store.dispatch('updateCourse', body).then(() => {
        this.getCourses();
        this.dialog = false;
      });
    },
    openDialog(item) {
      this.courseItem = { ...item };
      this.dialog = true;
    },
    deleteCourse(item) {
      const body = {
        id: item.id,
      };
      this.$store.dispatch('deleteCourse', body).then(() => {
        this.getCourses();
      });
    },
  },
};
</script>



<style scoped>
/* Add any custom styles here */
</style>
