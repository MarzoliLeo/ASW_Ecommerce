<script>
import axios from "axios"
import sweetalert from "sweetalert"
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapGetters("user", ["email"]),
  },
  methods: {
    checkIfRegistered() {
      const user = {
        email: this.email,
        password: this.password,
      };

      axios
        .post('http://127.0.0.1:3000/login', user)
        .then((res) => {
          sweetalert({
            text: "User logged in succesfully",
            icon: "success"
          })
          this.$store.commit("user/login", this.email)
          // console.log(this.email)
          this.$router.push("/")

        })
        .catch((err) => {
          sweetalert({
            text: "Login failed. User not registered.",
            icon: "error"
          });
          console.log("Errore di tipo: " + err)
        });
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Login Form</h3>
      </div>
    </div>
    <div class="row">
      <!--Utilizzo bootstrap per creare il form-->
      <div class="col-3"></div>
      <div class="col-6">
        <form>
          <div class="form-group">
            <label>User email</label>
            <input type="text" class="form-control" v-model="email">
          </div>
          <div class="form-group">
            <label>User Password</label>
            <input type="password" class="form-control" v-model="password">
          </div>
          <br>
          <div class="text-center">
            <button type="button" class="btn btn-primary" @click="checkIfRegistered">Login</button>
          </div>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<style scoped></style>