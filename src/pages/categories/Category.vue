<script>
import axios from "axios"
import sweetalert from "sweetalert"
import { state } from "@/socket/socket"
import CategoryBox from "../../components/categories/CategoryBox.vue"

import { io } from 'socket.io-client'

//Queste variabili verranno utilizzate nel backend tramite Axios.
export default{
  name:"Category",
  components: {CategoryBox},
  data() {
    return {
      categories: []
    };
  },
  methods: {
    async getCategories() {
      await axios.get("http://localhost:3000/showCategories") 
      .then(res => 
          this.categories = res.data
      )
      .catch(err => 
        console.log(err)
      )
    }
  },
  //This part is used to use the socket.io functions
  computed: {
    connected() {
      console.log(state.connected);
    }
  },
  //Questo metodo viene invocato non appena la classe viene istanziata.
  mounted() {
    this.getCategories();
  }
};

</script>

<template>

  <div class="container">
    <div class="row">
        <div class="col-12 text-center">
          <h3 class="pt-3">Our Categories</h3>
          <router-link :to="{name : 'CategoryAdd'}">
            <button class="btn" style="float:right">Add Category</button>
          </router-link>
        </div>
    </div>
    <div class ="row">
      <div v-for="category of categories" :key="category.id" class="col-xl-4 col-md-6 pt-3 d-flex" >
        <CategoryBox :category="category"></CategoryBox>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
