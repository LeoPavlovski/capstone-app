<template>
  <div class="d-flex">
    <v-dialog v-model="dialog" width="500">
      <v-card color="primary" elevation="3" v-if="courseItem">
        <v-card-title class="white--text">Edit Course</v-card-title>
        <v-card elevation="2" class="pa-5" max-height="1000" min-height="795">
          <v-text-field v-model="courseItem.name" dense outlined label="Course Name"></v-text-field>
          <v-textarea no-resize v-model="courseItem.description" dense outlined label="Course Description"></v-textarea>
          <v-text-field dense outlined label="Start Date" type="date" v-model="courseItem.start_date"></v-text-field>
          <v-text-field dense outlined label="End Date" type="date" v-model="courseItem.end_date"></v-text-field>
          <v-text-field dense outlined label="Time" type="time" v-model="courseItem.time"></v-text-field>
          <v-text-field dense outlined label="Location" v-model="courseItem.location"></v-text-field>
          <v-text-field dense outlined label="Course Code" v-model="courseItem.course_code"></v-text-field>
          <v-text-field dense outlined label="Max Students" type="number" v-model="courseItem.max_students"></v-text-field>
          <!-- You can add more fields as needed -->

          <v-btn  :disabled="!isFormValidForEdit" color="primary" class="mt-16"  width="100%" @click="submitEdit">Submit</v-btn>
        </v-card>
      </v-card>
    </v-dialog>
    <Navigation class="w-100 w-md-25"></Navigation>
    <v-row class="text-center pa-5">
      <v-col cols="12" md="4">
        <v-card color="primary" elevation="3">
          <v-card-title class="white--text">Create Course</v-card-title>
          <v-card elevation="2" class="pa-5 overflow-auto" max-height="300" min-height="300">
            <v-text-field v-model="courseForm.name" dense outlined label="Course Name"></v-text-field>
            <v-textarea no-resize v-model="courseForm.description" dense outlined label="Course Description"></v-textarea>
            <v-text-field dense outlined label="Start Date" type="date" v-model="courseForm.start_date"></v-text-field>
            <v-text-field dense outlined label="End Date" type="date" v-model="courseForm.end_date"></v-text-field>
            <v-text-field dense outlined label="Time" type="time" v-model="courseForm.time"></v-text-field>
            <v-text-field dense outlined label="Location" v-model="courseForm.location"></v-text-field>
            <v-text-field dense outlined label="Course Code" v-model="courseForm.course_code"></v-text-field>
            <v-text-field dense outlined label="Max Students" type="number" v-model="courseForm.max_students"></v-text-field>
            <!-- You can add more fields as needed -->

            <v-btn  :disabled="!isFormValid" color="primary" class="mt-16"  width="100%" @click="addCourse">Submit</v-btn>
          </v-card>
        </v-card>
      </v-col>

      <!-- Active Internships Section -->
      <v-col cols="12" md="8">
        <v-card color="primary" class="elevation-3 white--text">
          <v-card-title>Today's Lectures</v-card-title>
          <v-data-table
              :items="getTodayCourses"
              :headers="courseHeaders"
              item-key="id"
              class="elevation-2"
              height="240"
              :loading="loading"
              loading-text="loading..."
          >
            <template v-slot:item.start_date="{item}">
              <v-icon color="primary">mdi-calendar-today</v-icon>
              {{item.start_date}}
            </template>
            <template v-slot:item.end_date="{item}">
              <v-icon color="red">mdi-calendar-clock</v-icon>
              {{item.end_date}}
            </template>
            <template v-slot:item.time="{item}">
              <v-icon color="orange">mdi-clock</v-icon>
              {{item.time}}
            </template>
            <template v-slot:item.location="{item}">
              <v-icon color="purple">mdi-google-maps</v-icon>
              {{item.location}}
            </template>
            <template v-slot:item.max_students="{item}">
              <v-icon color="green">mdi-account-multiple</v-icon>
              {{item.max_students}}
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12" class="text-left">
        <v-card color="primary" class="elevation-3">
          <v-card-title class="white--text">My Courses</v-card-title>
          <v-data-table :loading="loading" :headers="MyHeaders" :items="getMyCourses"  height="160">
            <template v-slot:item="{item}">
              <tr>
                <td>{{item.name}}</td>
                <td>{{item.course_code}}</td>
                <td>
                  <v-icon color="primary">mdi-calendar-today</v-icon>
                  {{item.start_date}}
                </td>
                <td>
                  <v-icon color="red">mdi-calendar-clock</v-icon>
                  {{item.end_date}}
                </td>
                <td>
                  <v-icon class="mr-2" color="orange">mdi-clock</v-icon>
                  {{item.time}}</td>
                <td>
                  <v-icon color="purple">mdi-google-maps</v-icon>
                  {{item.location}}
                </td>
                <td>
                  <v-icon color="green">mdi-account-multiple</v-icon>
                  {{item.max_students}}</td>
                <td>
                  <v-btn class="primary mr-2" @click="openDialog(item)" small>Edit</v-btn>
                  <v-btn class="red white--text" @click="deleteCourse(item)" small>Delete</v-btn>
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
  async mounted() {
    await this.getUsers();
    await this.getCourses();
  },
  components: {
    Navigation,
  },
  computed: {
    ...mapState({
      user: state => state.user,
      courses: state => state.courses
    }),
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
        { text: "Course Name", value: "name" },
        { text: "Course Code", value: "course_code" },
        { text: "Start Date", value: "start_date" },
        { text: "End Date", value: "end_date" },
        { text: "Time", value: "time" },
        { text: "Location", value: "location" },
        { text: "Max Students", value: "max_students" },
        { text: "Actions", value: "actions" },
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
    getCourses(){
      this.$store.dispatch('getCourses')
    },
    addCourse(){
      const body={
        name: this.courseForm.name,
        description: this.courseForm.description,
        start_date: this.courseForm.start_date,
        end_date: this.courseForm.end_date,
        time: this.courseForm.time,
        location: this.courseForm.location,
        course_code: this.courseForm.course_code,
        max_students: this.courseForm.max_students,
        user_id:this.user.id
      };
      this.$store.dispatch('addCourse',body).then(res=>{
        this.courseForm.name= '';
        this.courseForm.description= '';
        this.courseForm.start_date= '';
        this.courseForm.end_date= '';
        this.courseForm.time= '';
        this.courseForm.location= '';
        this.courseForm.course_code= '';
        this.courseForm.max_students= '';
        this.getCourses()
      })
    },
    getUsers() {
      this.$store.dispatch('getUsers');
    },
    // getInternships() {
    //   this.loading=true
    //   this.$store.dispatch('getInternships').then(res=>{
    //     this.loading=false;
    //   });
    // },
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
        id:this.courseItem.id,
      };
      this.$store.dispatch('updateCourse', body).then(res => {
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
