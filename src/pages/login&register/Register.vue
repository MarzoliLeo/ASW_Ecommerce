<script>
import axios from "axios"
import sweetalert from "sweetalert"

export default{
  data() {
    return {
      User: {first_name: '', last_name: '', email: ''}
    }
  },
  methods: {
    addUserToDB(){
      let newUser = {
        first_name: this.User.first_name,
        last_name: this.User.last_name,
        email: this.User.email
      }
      console.log(newUser);
      axios.post('http://127.0.0.1:3000/', newUser)
      .then((res) => {
        sweetalert({
            text: "User added successfully",
            icon: "success"
          })
        console.log(res);
      })
      .catch((err) => {
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
          <div class="form-group">
            <label>User email</label>
            <input type="text" class="form-control" v-model="User.email">
          </div>
          <br>
          <div class="text-center">
            <button type="button" class="btn btn-primary" @click="addUserToDB">Submit</button>
          </div>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<style scoped></style>