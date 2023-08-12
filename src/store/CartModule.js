import sweetalert from "sweetalert";
//  import axios
import axios from "axios";
import { compile } from "vue";

const cartModule = {
  state: {
    cart: [], // The initial state of the cart is an empty array
  },
  mutations: {
    addToCart: async function (state, { course, email }) {
      axios
        .post("http://127.0.0.1:3000/addCourseToCart", {
          userEmail: email,
          courseName: course.coursesName,
        })
        .then(() => {
          // Add a new item to the cart with the given course, email, and quantity of 1
          state.cart.push({
            id: course.id,
            name: course.name,
            price: course.price,
            quantity: 1,
            email: email,
          });
          // Show a success message using SweetAlert
          sweetalert({
            icon: "success",
            title: "Success!",
            text: "Item added to cart.",
          });
        })
        .catch((error) => {
          // Show an error message using SweetAlert
          sweetalert({
            icon: "error",
            title: "Oops...",
            // retrieve the error message from the response body
            text: error.response.data.error,
          });
        });
    },
    removeFromCart: async function (state, product) {
      // Find the index of the product in the cart
      const index = state.cart.findIndex((p) => p.id === product.id);
      // If the product is found, remove it from the cart
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },

    clearCart(state) {
      // Set the cart to an empty array to clear it
      state.cart = [];
    },
  },
  getters: {
    cartTotal(state) {
      // Calculate the total price of all items in the cart
      return state.cart.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    },
    userCart(state) {
      // Return a function that filters the cart items by email
      return (email) => state.cart.filter((item) => item.email === email);
    },
  },
  actions: {
    addToCart({ commit }, course) {
      // Get the user's email from the root state
      const email = this.state.user.email;
      // If the user is not logged in, show an error message and return
      if (!email) {
        sweetalert({
          icon: "error",
          title: "Oops...",
          text: "You must be logged in to add items to your cart!",
        });
        return;
      }
      // Call the addToCart mutation with the course and email
      commit("addToCart", { course, email });
    },
  },
};

export default cartModule;
