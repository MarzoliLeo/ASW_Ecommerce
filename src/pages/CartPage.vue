<template>
  <div class="cart-page">
    <div class="container">
      <h2 class="text-center my-4">Cart</h2>
      <div v-if="!isLoggedIn" class="alert alert-danger" role="alert">
        You must be logged in to view your cart.
      </div>
      <div v-else-if="cart.length === 0" class="alert alert-info" role="alert">
        Your cart is empty.
      </div>
      <div v-else class="row">
        
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Cart Items</h5>
            </div>
            <div class="card-body">
              <CartItem v-for="item in cart" :key="item.id" :item="item" @remove-from-cart="removeFromCart"
                class="mb-3" />
              <div class="text-center">
                <p>Total: {{ cartTotal }} tokens</p>
                <p>Current Balance: {{ $store.state.user.tokenBalance }} tokens</p>
              </div>
            </div>
          </div>
          <div class="text-center">
                            <button class="btn my-3 btn-primary" @click.prevent="validateCheckout">Checkout</button>
                            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from "@/components/shop/CartItem.vue";
import { mapState, mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  components: {
    CartItem,
  },
  data() {
    return {
      name: "",
      surname: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
      buying_info: {
        userEmail: this.email,
        coursesName: this.cart == undefined ? undefined : JSON.parse(JSON.stringify(this.cart))
      }
    };
  },
  computed: {
    ...mapState("cart", ["cart", "cartTotal"]),
    ...mapGetters("user", ["isLoggedIn", "email"]),
  },
  methods: {
    ...mapActions("cart", ["removeFromCart"]),
    ...mapActions("cart", ["fetchCart"]),

    validateCheckout() {
      if (this.name && this.surname && this.cardNumber && this.expirationDate && this.cvv) {
        this.checkout();
      } else {
        sweetAlert("Attention", "Please fill all the fields", "error");
      }
    },
    checkout() {
      if (this.$store.state.user.tokenBalance >= this.totalPrice) {
        // Handle checkout process
        this.buying_info.userEmail = this.email
        this.cart.forEach((item) => {
          this.buying_info.coursesName = item.courseName
          axios.post( "http://127.0.0.1:3000/addBoughtCourse", this.buying_info)
        });
        
        sweetAlert("Success", "Your purchase is complete!", "success");
        setTimeout(() => {
          this.$router.push("/");
        }, 1000);
        setTimeout(() => {
          this.cart.forEach((item) => {
            this.removeFromCart(item);
          });
        }, 1010);
        setTimeout(() => {
          this.$store.dispatch("user/removeTokens", this.totalPrice);
        });

        
      } else {
        sweetAlert("Attention", "You do not have enough tokens to complete the purchase", "error");
      }
    },
  },
  watch: {
    cart: function (newValue) {
      // console.log("Cart changed", newValue);
      this.totalPrice = 0;
      newValue.forEach((item) => {
        this.totalPrice += item.price;
      });
    },
    cardNumber: function (newValue) {
      if (newValue.toString().length === 16) {
        this.$nextTick(() => {
          const expirationDateInput = document.getElementById("expiration-date");
          expirationDateInput.focus();
        });
      }
    },
    expirationDate: function (newValue) {
      if (newValue.toString().length === 5) {
        this.$nextTick(() => {
          const cvvInput = document.getElementById("cvv");
          cvvInput.focus();
        });
      }
    },
  },
  created() {
    if (this.$store.state.user.email !== "") {
      // console.log(this.email)
      this.fetchCart(this.email);
      // set the user.state.tokenBalance to the value of the tokenBalance in the database
      this.$store.dispatch("user/getTokenBalance", this.email); +
        console.log("CartTotal: ", this.cartTotal);
    }
  },
};
</script>

<style scoped>
.cart-page {
  padding: 50px 0;
}

.card {
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.card-title {
  margin-bottom: 0;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-control {
  border-radius: 0;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

.btn-primary:focus,
.btn-primary.focus {
  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
}

.text-center {
  text-align: center;
}

.alert {
  border-radius: 0;
}
</style>