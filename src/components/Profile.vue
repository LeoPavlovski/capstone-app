<template>
  <div>
    <div class="d-flex">
      <Navigation class="w-100 w-md-25"></Navigation>
      <v-row class="text-center pa-5">
        <v-col>

        </v-col>
        <v-col cols="12" md="6">

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
      number: 1000,
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
        {id: 1, name: "Yes"},
        {id: 0, name: "No"}
      ],
      internshipHeaders: [
        {text: "Created", value: "created"},
        {text: "Internship Name", value: "name"},
        {text: "Company", value: "company"},
        {text: "Description", value: "description"},
        {text: "Start Date", value: "start_date"},
        {text: "End Date", value: "end_date"},
        {text: "Location", value: "location"},
        {text: "Duration", value: "duration"},
        {text: "Scholarship", value: "stipend"},
        {text: "Deadline", value: "deadline"},
      ],
      courseHeaders: [
        {text: "Course Name", value: "name"},
        {text: "Course Code", value: "course_code"},
        {text: "Start Date", value: "start_date"},
        {text: "End Date", value: "end_date"},
        {text: "Time", value: "time"},
        {text: "Location", value: "location"},
        {text: "Max Students", value: "max_students"},
      ],
      courseItem: null,
    };
  },
  methods: {
    getStudentInvitations() {
      const body = {
        id: this.user.id
      }
      this.$store.dispatch('getStudentInvitations', body).then(res => {
        if (res.data.invitations.length > 0) {
          this.invitationsDialog = true;
        }
      })
    },
    getInternships() {
      this.$store.dispatch('getInternships').then(res => {
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
      this.courseItem = {...item};
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
