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
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        console.log('credentials : ' , credentials);
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

    async register({ commit }, credentials) {
      try {
        console.log('credentials : ' , credentials);
        // Replace with your login API endpoint
        const response = await axios.post('http://127.0.0.1:8000/api/auth/register', credentials);

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
      const response = await axios.post('http://127.0.0.1:8000/api/auth/logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      commit('LOGOUT');
      localStorage.removeItem('authToken');
    },
  },
  modules: {
  }
})
