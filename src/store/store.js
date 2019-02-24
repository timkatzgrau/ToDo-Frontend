import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    user: 0,
    isUserLoggedIn: false,
  },
  mutations: {
    setUser(state, user) {
      // eslint-disable-next-line no-param-reassign
      state.user = user;
    },
    loggedIn(state, loggedIn) {
      // eslint-disable-next-line no-param-reassign
      state.isUserLoggedIn = loggedIn;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    loggedIn({ commit }, loggedIn) {
      commit('loggedIn', loggedIn);
    },
  },
  getters: {
    getUser: state => state.user.id,
    getStatus: state => state.isUserLoggedIn,
  },
});
