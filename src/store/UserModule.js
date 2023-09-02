import axios from "axios";

const baseURL = "http://127.0.0.1:3000";

const userModule = {
  namespaced: true,
  state: {
    email: localStorage.getItem("email") ? localStorage.getItem("email") : "",
    lastVisitedCategory: localStorage.getItem("lastVisitedCategory") ? localStorage.getItem("lastVisitedCategory") : "",
    lastVisitedCourse: localStorage.getItem("lastVisitedCourse") ? localStorage.getItem("lastVisitedCourse") : "",
    tokenBalance: localStorage.getItem("tokenBalance") ? localStorage.getItem("tokenBalance") : 0,
  },
  getters: {
    email: (state) => state.email,
    lastVisitedCategory: (state) => state.lastVisitedCategory,
    lastVisitedCourse: (state) => state.lastVisitedCourse,
    isLoggedIn: (state) => !!state.email,
    tokenBalance: (state) => state.tokenBalance,
  },
  mutations: {
    login(state, email) {
      state.email = email;
      localStorage.setItem("email", email);
    },
    logout(state) {
      state.email = "";
      localStorage.removeItem("email");
    },
    commitCategory(state, selectedCategory) {
      state.lastVisitedCategory = selectedCategory;
      localStorage.setItem("lastVisitedCategory", selectedCategory);
    },
    commitCourse(state, selectedCourse) {
      state.lastVisitedCourse = selectedCourse;
      localStorage.setItem("lastVisitedCourse", selectedCourse);
    },
    addTokens(state, amount) {
      state.tokenBalance += amount;
      localStorage.setItem("tokenBalance", state.tokenBalance.toString());
    },
    setTokens(state, amount) {
      state.tokenBalance = amount;
      localStorage.setItem("tokenBalance", state.tokenBalance.toString());
    }
  },
  actions: {
    addTokens({ commit, getters }, amount) {
      if (getters.isLoggedIn) {
        axios.post(`${baseURL}/addTokens`, {
          email: getters.email,
          amount: amount,
        });
        commit("addTokens", amount);
      } else {
        console.error("User is not logged in.");
      }
    },
    getTokenBalance({ commit, getters }) {
      if (getters.isLoggedIn) {
        axios.get(`${baseURL}/getTokenBalance`, {
          params: {
            email: getters.email,
          },
        }).then((response) => {
          commit("setTokens", response.data.token_balance);
        });
      } else {
        console.error("User is not logged in.");
      }
    },
    removeTokens({ commit, getters }, amount) {
      if (getters.isLoggedIn) {
        axios.post(`${baseURL}/removeTokens`, {
          email: getters.email,
          amount: amount,
        });
        commit("setTokens", getters.tokenBalance - amount);
      } else {
        console.error("User is not logged in.");
      }
    }
  },
};

export default userModule;