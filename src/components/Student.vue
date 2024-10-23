<template>
  <div>
    <div class="d-flex">
      <Navigation class="w-100 w-md-25"></Navigation>
      <v-row class="text-center pa-5">
        <v-col cols="12" md="6">
            <v-col cols="12" class="text-left ">
              <v-card color="primary" class="elevation-3 mt-n3" >
                <v-card-title class="white--text">Apply For Courses (CST Department)</v-card-title>
                <v-data-table :loading="loading" :headers="courseHeaders" :items="filteredCourses"  height="480 ">
                  <template v-slot:item="{item}">
                    <tr>
                      <td>{{item.name}}</td>
                      <td>{{item.course_code}}</td>
<!--                      <td>-->
<!--                        <div class="d-flex" style="width:100px;">-->
<!--                          <v-icon color="primary">mdi-calendar-today</v-icon>-->
<!--                          {{item.start_date}}-->
<!--                        </div>-->
<!--                      </td>-->
<!--                      <td>-->
<!--                        <div class="d-flex" style="width:100px;">-->
<!--                          <v-icon color="red">mdi-calendar-clock</v-icon>-->
<!--                          {{item.end_date}}-->
<!--                        </div>-->
<!--                      </td>-->
                      <td class="text-left">{{ getDayOfWeek(item.start_date) }}</td>
                      <td>
                        <div class="d-flex">
                          <v-icon color="orange">mdi-clock</v-icon>
                          {{item.time}}
                        </div>
                      </td>
                      <td>
                        <div class="d-flex" style="width:130px;">
                          <v-icon color="purple">mdi-google-maps</v-icon>
                          {{item.location}}
                        </div>

                      </td>
                      <td>
                        <div>
                          <v-icon color="green">mdi-account-multiple</v-icon>
                          {{item.max_students}}
                        </div>
                      </td>
                      <td>
                        <v-btn :disabled="item.max_students === 0" class="green mr-2 white--text" @click="applyCourse(item)" small>Apply</v-btn>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          <v-card  color="primary" class="mt-5">
            <v-card-title class="white--text">My Courses</v-card-title>
            <v-data-table height="420" :items="myCourses" :headers="myCoursesHeaders">
              <template v-slot:item="{item}">
                <tr>
                  <td class="text-left">{{item.name}}</td>
                  <td class="text-left">{{item.course_code}}</td>
                  <td class="text-left">{{ getDayOfWeek(item.start_date) }}</td>
                  <td class="text-left">{{ item.time.slice(0, 5) }}</td>
                  <td class="text-left">{{item.location}}</td>
                  <td>
                    <v-btn small color="red" class="white--text" @click="leaveCourse(item)">Leave Course</v-btn>
                  </td>
                </tr>
              </template>
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
                <div class="d-flex" style="width:120px;">
                  <v-icon color="primary" class="mr-2">mdi-calendar-today</v-icon>
                  {{item.start_date}}
                </div>
              </template>
              <template v-slot:item.description="{item}">
                <div class="d-flex" style="width:100px;">
                  {{item.description}}
                </div>
              </template>
              <template v-slot:item.end_date="{item}">
                <div class="d-flex" style="width:130px;">
                  <v-icon color="red" class="mr-2">mdi-calendar-clock</v-icon>
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
                    <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-chip
                          class="white--text"
                          v-bind="attrs"
                          v-on="on"
                          :color="isDeadlineViable(item.deadline) ? 'green' : 'red'"
                      >
                        {{ item.deadline }}
                      </v-chip>
                    </template>
                    <span>{{ isDeadlineViable(item.deadline) ? 'Available' : 'Deadline passed' }}</span>
                  </v-tooltip>
                  </div>
              </template>
              <template v-slot:item.courses="{ item }">
                <ul>
                  <li v-for="course in item.courses" :key="course.id">{{ course.name }}</li>
                </ul>
              </template>
            </v-data-table>
          </v-card>
          <v-card  color="primary" class="mt-8">
            <v-card-title class="white--text">Today's Lectures</v-card-title>
            <v-data-table height="420" :items="filteredCoursesByWeekday" :headers="myCoursesHeaders">
              <template v-slot:item="{item}">
                <tr>
                  <td class="text-left">{{item.name}}</td>
                  <td class="text-left">{{item.course_code}}</td>
                  <td class="text-left">{{ getDayOfWeek(item.start_date) }}</td>
                  <td class="text-left">{{ item.time.slice(0, 5) }}</td>
                  <td class="text-left">{{item.location}}</td>
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
    filteredCoursesByWeekday() {
      const today = new Date().getDay(); // Get today's day of the week (0 = Sunday, 1 = Monday, etc.)

      return this.myCourses.filter(course => {
        const courseStartDate = new Date(course.start_date); // Parse the course's start date
        const courseDay = courseStartDate.getDay(); // Get the weekday for the course's start date

        return courseDay === today; // Return only courses where the start date matches today's day of the week
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
        { text: "Created", value: "created", sortable:false, },
        { text: "Internship", value: "name",sortable:false, },
        { text: "Company", value: "company", sortable:false,  },
        { text: "Description", value: "description", sortable:false,  },
        { text: "Start", value: "start_date" , sortable:false,  },
        { text: "End", value: "end_date" , sortable:false,  },
        { text: "Location", value: "location" , sortable:false,  },
        { text: "Duration", value: "duration" , sortable:false,  },
        { text: "Scholarship", value: "stipend" , sortable:false,  },
        { text: "Deadline", value: "deadline", sortable:false,  },
      ],
      myCoursesHeaders: [
        { text: "Course Name", value: "name" },
        { text: "Course Code", value: "course_code" },
        { text: "Day", value: "day" },
        { text: "Time", value: "time" },
        { text: "Location", value: "location" },
        { text: "", value: "", sortable:false },
      ],
      courseHeaders: [
        { text: "Course Name", value: "name" },
        { text: "Course Code", value: "course_code" },
        { text: "Day", value: "day" },
        { text: "Time", value: "time" },
        { text: "Location", value: "location" },
        { text: "Available", value: "max_students", sortable:false, width:100 },
        { text: "Apply", value: "Apply", sortable:false, width:100 },
      ],
      courseItem: null,
    };
  },
  methods: {
    leaveCourse(item){
      console.log(item);
      const body= {
        user_id:this.user.id,
        course_id:item.id,
      }
      console.log('body : ' , body);
      this.$store.dispatch('leaveCourse',body).then(res=>{
        this.getStudentCourses();
      });
    },
    isDeadlineViable(deadline) {
      const today = new Date(); // Get today's date
      const deadlineDate = new Date(deadline); // Convert the deadline string to a Date object

      return today <= deadlineDate; // Return true if the deadline hasn't passed, false otherwise
    },
    getDayOfWeek(dateString) {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const date = new Date(dateString);
      return daysOfWeek[date.getDay()];
    },
    getNews(){
      this.$store.dispatch('getNews');
    },
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
