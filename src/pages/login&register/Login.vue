<script>
import axios from "axios"
import sweetalert from "sweetalert"

export default{
  data() {
    return {
      email: '',
      first_name: '',
    }
  },
  methods: {
    checkIfRegistered(){
      const user = {
        email: this.email,
        first_name: this.first_name,
      };

      axios.post('http://127.0.0.1:3000/login', user)
      .then((res) => {
        sweetalert({
            text: "User added successfully",
            icon: "success"
          })   
      })
      .catch((err) => {
        sweetalert({
            text: "Login failed. User not registered.",
            icon: "error"
          });
        console.log("Errore di tipo: "+ err)
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
    <div class ="row">
      <!--Utilizzo bootstrap per creare il form-->
      <div class="col-3"></div>
      <div class="col-6">
        <form>
          <div class="form-group">
            <label>User email</label>
            <input type="text" class="form-control" v-model="email">
          </div>
          <div class="form-group">
            <label>User First Name</label>
            <input type="text" class="form-control" v-model="first_name">
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