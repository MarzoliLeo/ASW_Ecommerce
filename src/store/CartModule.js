import sweetalert from "sweetalert";
import axios from "axios";

const cartModule = {
  namespaced: true,
  state: {
    cart: [],
  },
  mutations: {
    addToCart: async function (state, { course, email }) {
      axios
        .post("http://127.0.0.1:3000/addCourseToCart", {
          userEmail: email,
          courseName: course.coursesName,
        })
        .then(() => {
          state.cart.push({
            id: course.id,
            name: course.name,
            price: course.price,
            quantity: 1,
            email: email,
          });
          sweetalert({
            icon: "success",
            title: "Success!",
            text: "Item added to cart.",
          });
        })
        .catch((error) => {
          sweetalert({
            icon: "error",
            title: "Oops...",
            text: error.response.data.error,
          });
        });
    },
    removeFromCart: async function (state, product) {
      const index = state.cart.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
    setCart: function (state, cart) {
      state.cart = cart;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
  getters: {
    cartTotal(state) {
      return state.cart.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    },
    userCart(state) {
      return (email) => state.cart.filter((item) => item.email === email);
    },
  },
  actions: {
    addToCart({ commit }, course) {
      const email = this.state.user.email;
      if (!email) {
        sweetalert({
          icon: "error",
          title: "Oops...",
          text: "You must be logged in to add items to your cart!",
        });
        return;
      }
      commit("addToCart", { course, email });
    },
    async fetchCart({ commit }, email) {
      try {
        const response = await axios.get("http://127.0.0.1:3000/getCartItems", {
          params: { userEmail: email },
        });
        commit("setCart", response.data.cart);
      } catch (error) {
        sweetalert({
          icon: "error",
          title: "Oops...",
          text: "Problem fetching cart items!"
        });
      }
    },
  },
};

export default cartModule;
