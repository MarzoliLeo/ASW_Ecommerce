import { createStore } from 'vuex'

const categoryStore = createStore({
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

export default categoryStore