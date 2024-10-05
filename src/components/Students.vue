<template>
  <div class="d-flex">
    <!--    <v-dialog></v-dialog>-->
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
        <v-card color="primary" elevation="3" >
          <v-card-title class="white--text">Invite Student For An Internship</v-card-title>
          <v-card elevation="2" class="pa-5" max-height="300 " min-height="300">

            <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
              {{ snackbarMessage }}
            </v-snackbar>
            <!--            <v-text-field v-model="courseForm.name" dense outlined label="Course Name"></v-text-field>-->
            <!--            <v-textarea no-resize v-model="courseForm.description" dense outlined label="Course Description"></v-textarea>-->
            <!--            <v-text-field dense outlined label="Start Date" type="date" v-model="courseForm.start_date"></v-text-field>-->
            <!--            <v-text-field dense outlined label="End Date" type="date" v-model="courseForm.end_date"></v-text-field>-->
            <!--            <v-text-field dense outlined label="Time" type="time" v-model="courseForm.time"></v-text-field>-->
            <!--            <v-text-field dense outlined label="Location" v-model="courseForm.location"></v-text-field>-->
            <!--            <v-text-field dense outlined label="Course Code" v-model="courseForm.course_code"></v-text-field>-->
            <!--            <v-text-field dense outlined label="Max Students" type="number" v-model="courseForm.max_students"></v-text-field>-->
            <v-select
                :items="getUserInternships"
                item-text="name"
                item-value="id"
                label="Select An Internship"
                v-model="internshipId"
            ></v-select>
            <v-select
                v-if="formattedStudents.length"
                :items="formattedStudents"
                item-text="formattedName"
                item-value="id"
                label="Select A User"
                v-model="studentId"
            >
            </v-select>
            <!-- You can add more fields as needed -->

            <v-btn :disabled="studentId === null || internshipId === null"  color="primary" class="mt-16"  width="100%" @click="invite">Submit</v-btn>
          </v-card>
        </v-card>
      </v-col>

      <!-- Active Internships Section -->
      <v-col cols="12" md="8">
        <v-card color="primary" class="elevation-3 white--text">
          <v-card-title>My Students</v-card-title>
          <v-data-table
              :items="students"
              :headers="studentHeaders"
              item-key="id"
              class="elevation-2"
              height="240"
              :loading="loading"
              loading-text="loading..."
          >
            <!--            <template v-slot:item.start_date="{item}">-->
            <!--              <v-icon color="primary">mdi-calendar-today</v-icon>-->
            <!--              {{item.start_date}}-->
            <!--            </template>-->
            <!--            <template v-slot:item.end_date="{item}">-->
            <!--              <v-icon color="red">mdi-calendar-clock</v-icon>-->
            <!--              {{item.end_date}}-->
            <!--            </template>-->
            <!--            <template v-slot:item.time="{item}">-->
            <!--              <v-icon color="orange">mdi-clock</v-icon>-->
            <!--              {{item.time}}-->
            <!--            </template>-->
            <!--            <template v-slot:item.location="{item}">-->
            <!--              <v-icon color="purple">mdi-google-maps</v-icon>-->
            <!--              {{item.location}}-->
            <!--            </template>-->
            <!--            <template v-slot:item.max_students="{item}">-->
            <!--              <v-icon color="green">mdi-account-multiple</v-icon>-->
            <!--              {{item.max_students}}-->
            <!--            </template>-->
            <template v-slot:item="{item}">
              <tr>
                <td class="text-left font-weight-medium" >
                  <v-icon color="green">mdi-account-check</v-icon>
                  {{item.name}}
                </td>

                <td class="text-left font-weight-medium ">
                  {{item.surname}}
                </td>
                <td class="text-left px-0 mx-0">
                  <div :style="index !== item.courses.length - 1 ? 'border-bottom:1px solid #D6D6D6' : ''" v-for="(coursesDetails, index) in item.courses">
                    <div>
                      {{coursesDetails.name}}
                    </div>
                  </div>
                </td>

                <td  class="text-left px-0 mx-0">
                  <div :style="index !== item.courses.length - 1 ? 'border-bottom:1px solid #D6D6D6' : ''" v-for="(coursesDetails, index) in item.courses">
                    <div>
                      {{coursesDetails.description}}
                    </div>
                  </div>
                </td>

                <td  class="text-left px-0 mx-0">
                  <div  :style="index !== item.courses.length - 1 ? 'border-bottom:1px solid #D6D6D6' : ''" v-for="(coursesDetails, index) in item.courses">
                    <div>
                      {{coursesDetails.start_date}}
                    </div>
                  </div>
                </td>
                <td class="text-left px-0 mx-0" >
                  <div  :style="index !== item.courses.length - 1 ? 'border-bottom:1px solid #D6D6D6' : ''" v-for="(coursesDetails, index) in item.courses">
                    <div>
                      {{coursesDetails.end_date}}
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <v-col cols="12" class="text-left">
        <v-card color="primary" class="elevation-3">
          <v-card-title class="white--text">Student's Internships</v-card-title>
          <v-data-table :loading="loading" :headers="internshipHeaders" :items="professorInvitations"  height="160">
            <template v-slot:item="{item}">
              <tr>
                <td>{{item.student.name}}</td>
                <td>{{item.student.email}}</td>
                <td>{{item.internship.name}}</td>
                <td>{{item.internship.company}}</td>
                <td>{{item.internship.start_date}}</td>
                <td>{{item.internship.end_date}}</td>
                <td>{{item.internship.deadline}}</td>
                <td>{{item.internship.stipend}}</td>
                <td>
                  <v-chip :color="item.status === 'accepted' ? 'green white--text' : 'red white--text'">
                    {{item.status}}
                  </v-chip>
                </td>
              </tr>
              <!--              <tr>-->
              <!--                <td>{{item.students.id}}</td>-->
              <!--              </tr>-->
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
    await this.getInternships();
    await this.getCourses();
    await this.getStudents();
    await this.getProfessorInvitations();
  },
  components: {
    Navigation,
  },
  computed: {
    ...mapState({
      user: state => state.user,
      users: state => state.users,
      courses: state => state.courses,
      internships: state => state.internships,
      students: state => state.students,
      professorInvitations: state => state.professorInvitations
    }),
    getUserInternships() {
      return this.internships.filter(item => item.user_id === this.user.id);
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
    getMyCourses() {
      const myCourses = this.courses.filter(course => course.user_id === this.user.id);
      return myCourses;
    },
    getTodayCourses() {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      const myCourses = this.courses.filter(course =>
          course.user_id === this.user.id && course.start_date === today
      );
      return myCourses;
    },
    filterStudents() {
      if (!this.users) return []; // Return an empty array if users is not defined
      return this.users.filter(user => user.roleId === 1);
    },
    formattedStudents() {
      return this.filterStudents.map(student => ({
        ...student,
        formattedName: `${student.name} ${student.surname}`
      }));
    }
  },
  data() {
    return {
      snackbar: false,
      snackbarMessage: '',
      snackbarColor: 'success',  // 'success' or 'error'
      internshipHeaders: [
        {text: "Student Name", value: "student"},
        {text: "Student Email", value: "email"},
        {text: "Internship Name", value: "name"},
        {text: "Company", value: "company"},
        {text: "Start Date", value: "start_date"},
        {text: "End Date", value: "end_date"},
        {text: "Deadline", value: "deadline"},
        {text: "Scholarship", value: "stipend"},
        {text: "Status", value: "status"},
      ],
      internshipId: null,
      studentId: null,
      courseData: [],
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
      dialog: false,
      stipendOptions: [
        {id: 1, name: "Yes"},
        {id: 0, name: "No"}
      ],
      studentHeaders: [
        {text: "Name", value: "name"},
        {text: "Surname", value: 'surname'},
        {text: "Course Title", value: "title"},
        {text: "Course Description", value: 'description'},
        {text: "Start Date", value: "start_date"},
        {text: "End Date", value: "end_date"},
      ],
      MyHeaders: [
        {text: "Course Name", value: "name"},
        {text: "Course Code", value: "course_code"},
        {text: "Start Date", value: "start_date"},
        {text: "End Date", value: "end_date"},
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
    getProfessorInvitations() {
      const body = {
        id: this.user.id,
      }
      this.$store.dispatch('getProfessorInvitations', body)
          .then(res => {
            console.log('Res: ', res);
            this.snackbarMessage = 'Invitations Generated.';
            this.snackbarColor = 'success';
            this.snackbar = true;
          })
          .catch(err => {
            console.log('This is the error : ', err);
            this.snackbarMessage = err.response.data.message;
            this.snackbarColor = 'error';
            this.snackbar = true;
          });
    },
    getStudents() {
      this.loading = true
      const body = {
        id: this.user.id,
      }
      this.$store.dispatch('getMyStudents', body).then(res => {
        this.loading = false;
      });
    },
    invite() {
      const body = {
        internship_id: this.internshipId,
        student_id: this.studentId,
      };

      this.$store.dispatch('invite', body)
          .then(res => {
            console.log('Res: ', res);
            this.snackbarMessage = 'Student invited successfully!';
            this.snackbarColor = 'success';
            this.snackbar = true;
          })
          .catch(err => {
            this.snackbarMessage = err.message;
            this.snackbarColor = 'error';
            this.snackbar = true;
            console.error('Error:', err.message);
          });
    },
    getCourses() {
      this.$store.dispatch('getCourses')
    },
    getUsers() {
      this.$store.dispatch('getUsers');
    },
    getInternships() {
      this.$store.dispatch('getInternships').then(res => {
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
      this.$store.dispatch('updateCourse', body).then(res => {
        this.getCourses();
        this.dialog = false;
      });
    },
    openDialog(item) {
      this.courseItem = {...item};

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
