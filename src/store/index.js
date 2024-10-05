import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios' // Assuming you're using Axios for API calls

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    points: 10,
    user: null,  // To store the logged-in user
    token: null, // To store the authentication token
    isAuthenticated: false, // To track the authentication status
    internships:[],
    users:null,
    courses:[],
    myCourses:[],
    students:[],
    invitations:[],
    companies:[],
    professorInvitations:[],
    news:[],
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    getUser: state => state.user,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      state.isAuthenticated = true;
    },
    LOGOUT(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    GET_INTERNSHIPS(state, payload) {
      state.internships = payload.data
    },
    GET_USERS(state, payload) {
      state.users = payload.data
    },
    GET_COURSES(state, payload) {
      state.courses = payload.data
    },
    GET_MY_COURSES(state, payload) {
      state.myCourses = payload.data
    },
    GET_MY_STUDENTS(state,payload){
      state.students = payload.data;
    },
    GET_MY_INVITATIONS(state,payload){
      state.invitations = payload.data
    },
    GET_COMPANIES(state,payload){
      state.companies = payload.data
    },
    GET_NEWS(state,payload){
        state.news = payload.data
    },
    GET_PROFESSOR_INVITATIONS(state,payload){
      state.professorInvitations = payload.data.students
    }

  },
  actions: {
    async login({ commit }, credentials) {
      try {
        // Replace with your login API endpoint
        const response = await axios.post('http://127.0.0.1:8000/api/auth/login', credentials);

        const { user, token } = response.data;

        // Commit the user data and token to the state
        commit('SET_USER', user);
        commit('SET_TOKEN', token);

        // Optionally, save the token in local storage for persistence
        localStorage.setItem('authToken', token);

        return user;
      } catch (error) {
        console.error('Login failed:', error);
        throw new Error('Invalid credentials');
      }
    },
    async logout({ commit }) {
      const response = await axios.post('http://127.0.0.1:8000/api//logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      commit('LOGOUT');
      localStorage.removeItem('authToken');
    },
    async register({ commit }, credentials) {
      try {

        // Replace with your login API endpoint
        const response = await axios.post('http://127.0.0.1:8000/api/auth/register', credentials);

        const { user, token } = response.data;

        // Commit the user data and token to the state
        commit('SET_USER', user);
        commit('SET_TOKEN', token);

        return user;
      } catch (error) {
        console.error('Login failed:', error);
        throw new Error('Invalid credentials');
      }
    },
    async getUserWithToken({ commit }, token) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/signin-with-token', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const { user } = response.data;
        commit('SET_USER', user);
        return user;
      } catch (error) {
        console.error('Error fetching user with token:', error);
        throw error; // Rethrow the error so it can be handled by the caller
      }
    },
    // Interships
    async getInternships({ commit }) {
        const response = await axios.get(`http://localhost:8000/api/internships`);
      commit('GET_INTERNSHIPS', response);
        return response;
    },
    async deleteInternship({ commit } , body) {

      const response = await axios.delete(`http://localhost:8000/api/internships/${body}`);
      return response;
    },
    async updateInternship({ commit } , body) {

      const response = await axios.put(`http://localhost:8000/api/internships/${body.id}`, body);
      return response;
    },
    async addInternship({ commit } , body) {

      const response = await axios.post(`http://localhost:8000/api/internships`, body);
      return response;
    },
    //user
    async getUsers({ commit }) {
      const response = await axios.get(`http://localhost:8000/api/user/getUsers`);
      commit('GET_USERS', response);
      return response;
    },
    //course
    async addCourse({ commit } , body) {
      const response = await axios.post(`http://localhost:8000/api/courses`, body);
      return response;
    },
    async getCourses({ commit }  ) {
      const response = await axios.get(`http://localhost:8000/api/courses`);
      commit('GET_COURSES', response);
      return response;
    },
    async deleteCourse({ commit }, body  ) {
      const response = await axios.delete(`http://localhost:8000/api/courses/${body}`);
      return response;
    },
    async updateCourse({ commit } , body) {
      const response = await axios.put(`http://localhost:8000/api/courses/${body.id}`, body);
      return response;
    },

    //invite

    async invite({ commit }, body) {
      try {
        // Attempt to make the POST request
        const response = await axios.post('http://localhost:8000/api/invite', body);

        // Optionally, commit a mutation if you want to update the store with the response
        // commit('someMutation', response.data);

        // Return the response to the component
        return response;
      } catch (error) {
        // Check if error response exists and handle specific backend errors
        if (error.response && error.response.data && error.response.data.message) {
          // Throw the specific error message for the component to handle
          throw new Error(error.response.data.message);
        } else {
          // Throw a generic error message for any other errors
          throw new Error('An error occurred while sending the invitation.');
        }
      }
    },

    async getInvite({ commit } , body) {
      const response = await axios.get(`http://localhost:8000/api/student/${body.id}/invitations`, body);
      return response;
    },

    // join course ( student )

    async joinCourse({ commit } , body) {
      const response = await axios.post(`http://localhost:8000/api/join-course`, body);
      return response;
    },

    async getMyCourses({ commit } , body) {
      const response = await axios.get(`http://localhost:8000/api/students/${body.id}/courses`, body);
      commit('GET_MY_COURSES', response);
      return response;
    },
    async getMyStudents({ commit } , body) {
      const response = await axios.get(`http://localhost:8000/api/professors/${body.id}/students`, body);
      commit('GET_MY_STUDENTS', response);
      return response;
    },
    async getStudentInvitations({ commit } , body) {
      const response = await axios.get(`http://localhost:8000/api/student/${body.id}/invitations`, body);
      commit('GET_MY_INVITATIONS', response);
      return response;
    },

    async manageInvitation({ commit }, { invitationId, body }) {
      const response = await axios.put(`http://localhost:8000/api/invitation/${invitationId}`, body);
      return response;
    },

    // companies

    async getCompanies({ commit } , body) {
      const response = await axios.get(`http://localhost:8000/api/companies`, body);
      commit('GET_COMPANIES', response);
      return response;
    },
    async deleteCompany({ commit }, body  ) {
      const response = await axios.delete(`http://localhost:8000/api/companies/${body}`);
      return response;
    },
    async addCompany({ commit } , body) {
      const response = await axios.post(`http://localhost:8000/api/companies`, body);
      return response;
    },

    //Get Professor invitiations.

    async getProfessorInvitations({ commit } , body) {
      const response = await axios.get(`http://localhost:8000/api/professor/${body.id}/internships`, body);
      commit('GET_PROFESSOR_INVITATIONS', response);
      return response;
    },

    //latest news
    async getNews({ commit } , body) {
      const response = await axios.get(`http://localhost:8000/api/news`);
      commit('GET_NEWS', response);
      return response;
    },

    async deleteNews({ commit }, body  ) {
      const response = await axios.delete(`http://localhost:8000/api/news/${body}`);
      return response;
    },
    async updateNews({ commit } , body) {
      const response = await axios.put(`http://localhost:8000/api/news/${body.id}` , body);
      return response;
    },
    async getNews1({ commit } , body) {
      const response = await axios.get(`http://localhost:8000/api/news/${body}` , body);
      return response;
    },
    async createNews({ commit } , body) {
      const response = await axios.post(`http://localhost:8000/api/news`, body);
      return response;
    },

  },
  modules: {
  }
})
