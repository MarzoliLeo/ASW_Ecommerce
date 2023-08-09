import Cart from "@/backend/models/cartModel.js";
import User from "@/backend/models/userListModels.js";
import sweetalert from "sweetalert";

const cartModule = {
  state: {
    cart: []
  },
  mutations: {
    addToCart: async function(state, { course, email }) {
      const user = await User.findOne({ email });
      if (!user) {
        sweetalert.fire({
          icon: "error",
          title: "Oops...",
          text: "No user found with that email!",
        });
        return;
      }
      const cartItem = new Cart({ course: course.id, user: email });
      cartItem.save().then(() => {
        state.cart.push({
          id: course.id,
          name: course.name,
          price: course.price,
          quantity: 1,
          email: email
        });
      });
    },
    removeFromCart: async function(state, product) {
      const index = state.cart.findIndex(p => p.id === product.id);
      if (index !== -1) {
        const cartItem = await Cart.findOne({ course: product.id, user: product.email });
        await cartItem.remove();
        state.cart.splice(index, 1);
      }
    },

    clearCart(state) {
      state.cart = [];
    }
  },
  getters: {
    cartTotal(state) {
      return state.cart.reduce((total, product) => total + product.price * product.quantity, 0);
    },
    userCart(state) {
      return email => state.cart.filter(item => item.email === email);
    }
  },
  actions: {
    addToCart({ commit, rootState }, course) {
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
  },
};

export default cartModule;