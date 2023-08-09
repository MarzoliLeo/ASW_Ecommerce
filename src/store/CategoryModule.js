import { createStore } from 'vuex'

const categoryModule = createStore({
    state: {
      categories: []
    },
    getters: {
    },
    mutations: {
      setCategories(state, newCategories) {
        state.categories = newCategories;
        localStorage.setItem('categories', newCategories);
      }
    },
    actions: {
    },
    modules: {
    }
  });

export default categoryModule