<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Register Form</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form>
          <div class="form-group">
            <label>User First Name</label>
            <input type="text" class="form-control" v-model="user.firstName">
          </div>
          <div class="form-group">
            <label>User Last Name</label>
            <input type="text" class="form-control" v-model="user.lastName">
          </div>
          <br>
          <div>Would you like to be a:</div>
          <div class="form-check">
            <input class="form-check-input" type="radio" id="staff" value="Staff" v-model="user.permission">
            <label class="form-check-label" for="staff">Content creator</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" id="user" value="User" v-model="user.permission">
            <label class="form-check-label" for="user">User</label>
          </div>
          <br>
          <div class="form-group">
            <label>User email</label>
            <input type="text" class="form-control" v-model="user.email">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="user.password">
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

<script>
import axios from "axios";
import sweetalert from "sweetalert";

export default {
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        permission: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    addUserToDB() {
      axios
        .post("http://127.0.0.1:3000/register/checkExistingUser", this.user)
        .then(() => {
          return axios.post(
            "http://127.0.0.1:3000/register/createUser",
            this.user
          );
        })
        .then(() => {
          sweetalert({
            text: "User added successfully",
            icon: "success",
          });
        })
        .catch((err) => {
          if (err.response.status === 409) {
            sweetalert({
              text: "User already exists.",
              icon: "error",
            });
          } else {
            sweetalert({
              text: "Registration failed.",
              icon: "error",
            });
          }
          console.log("Error: ", err);
        });
    },
  },
};
</script>

<style scoped></style>