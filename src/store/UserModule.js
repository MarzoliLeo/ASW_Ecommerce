const userModule = {
  state: {
    email: "",
    lastVisitedCategory: "",
  },
  getters: {
    email: (state) => state.email,
    lastVisitedCategory: (state) => state.lastVisitedCategory,
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
    initialiseStore(state) {
      if (localStorage.getItem("email")) {
        state.email = localStorage.getItem("email");
      }
    },
    commitCategory(state, selectedCategory) {
      state.lastVisitedCategory = selectedCategory;
      localStorage.setItem("lastVisitedCategory", selectedCategory);
    },
  },
  actions: {},
};

export default userModule;