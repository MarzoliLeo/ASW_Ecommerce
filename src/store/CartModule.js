import axios from "axios";
import sweetalert from "sweetalert";

const baseURL = "http://127.0.0.1:3000";

const cartModule = {
  namespaced: true,
  state: {
    cart: [],
  },
  mutations: {
    addToCart(state, cartEntry) {
      state.cart.push(cartEntry);
    },
    removeFromCart(state, cartEntry) {
      const index = state.cart.findIndex(
        (p) => p.courseName === cartEntry.courseName
      );
      if (index !== -1) {
        state.cart.splice(index, 1);
        sweetalert({
          icon: "success",
          title: "Success!",
          text: "Item removed from cart.",
        });
      }
    },
    setCart(state, cart) {
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
    async addToCart({ commit, rootState }, course) {
      const email = rootState.user.email;
      if (!email) {
        sweetalert({
          icon: "error",
          title: "Oops...",
          text: "You must be logged in to add items to your cart!",
        });
        return;
      }
      try {
        const response = await axios.post(`${baseURL}/addCourseToCart`, {
          userEmail: email,
          course: course,
        });
        commit("addToCart", {
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
      } catch (error) {
        sweetalert({
          icon: "error",
          title: "Oops...",
          text: error.response.data.error,
        });
      }
    },
    async removeFromCart({ commit }, cartEntry) {
      try {
        await axios.post(`${baseURL}/removeCartItem`, {
          userEmail: cartEntry.userEmail,
          courseName: cartEntry.courseName,
        });
        commit("removeFromCart", cartEntry);
      } catch (error) {
        sweetalert({
          icon: "error",
          title: "Oops...",
          text: error.response.data.error,
        });
      }
    },
    async fetchCart({ commit }, email) {
      try {
        const response = await axios.get(`${baseURL}/getCartItems`, {
          params: { userEmail: email },
        });
        commit("setCart", response.data.cart);
      } catch (error) {
        sweetalert({
          icon: "error",
          title: "Oops...",
          text: "Problem fetching cart items!",
        });
      }
    },
  },
};

export default cartModule;