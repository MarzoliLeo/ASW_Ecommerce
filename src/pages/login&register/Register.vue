<script>
import axios from "axios"
import sweetalert from "sweetalert"
import userStore from "@/store/UserStore"

export default{
  data() {
    return {
      User: {first_name: '', last_name: '',permission: '', email: '', password: ''}
    }
  },
  methods: {
    addUserToDB(){
      let newUser = {
        first_name: this.User.first_name,
        last_name: this.User.last_name,
        permission: this.User.permission,
        email: this.User.email,
        password:this.User.password
      }
      console.log(newUser);
      axios.post('http://127.0.0.1:3000/register/checkExistingUser', newUser)
      .then((res) => {
        axios.post('http://127.0.0.1:3000/register/createUser', newUser)
        .then((res) => {
          sweetalert({
              text: "User added successfully",
              icon: "success"
            })
          console.log(res);
        })
        .catch((err) => {
          sweetalert({
              text: "Registration failed.",
              icon: "error"
            });
          console.log("Errore di tipo: "+ err)
        });
        console.log(res);
      })
      .catch((err) => {
        sweetalert({
            text: "User already exists.",
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
          <h3 class="pt-3">Register Form</h3>
        </div>
    </div>
    <div class ="row">
      <!--Utilizzo bootstrap per creare il form-->
      <div class="col-3"></div>
      <div class="col-6">
        <form>
          <div class="form-group">
            <label>User First Name</label>
            <input type="text" class="form-control" v-model="User.first_name">
          </div>
          <div class="form-group">
            <label>User Last Name</label>
            <input type="text" class="form-control" v-model="User.last_name">
          </div>
          <br>
          <div>Would you like to be a: </div>
            <input class="form-check-input" type="radio" id="one" value="Staff" v-model="User.permission" />
            <label class="form-check-label" for="one">Content creator</label>
            <br>
            <input class="form-check-input" type="radio" id="two" value="User" v-model="User.permission" />
            <label class="form-check-label" for="two">User</label>
          <br>
          <div class="form-group">
            <label>User email</label>
            <input type="text" class="form-control" v-model="User.email">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="text" class="form-control" v-model="User.password">
          </div>
          <br>
          <div class="text-center">
            <button type="button" class="btn btn-primary" @click="addUserToDB">Register</button>
          </div>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<style scoped></style>