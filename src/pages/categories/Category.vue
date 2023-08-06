<script>
import axios from "axios"
import sweetalert from "sweetalert"
import { state } from "@/socket/socket"
import CategoryBox from "../../components/categories/CategoryBox.vue"
import { ref } from 'vue';

import { io } from 'socket.io-client'

//Queste variabili verranno utilizzate nel backend tramite Axios.
export default{
  name:"Category",
  components: {CategoryBox},
  data() {
    return{
      categories: [],
    }
  },
  computed: {
      categoriesGet() {
        return this.categories;
      }
  },
  methods: {
    async getCategories() {
      console.log("Getting categories")
      await axios.get("http://localhost:3000/showCategories") 
      .then(res => {
          console.log(this.categoriesGet)
          // var diff = res.data.filter(e => !this.categories.some(o => o.id == e))
          // this.categories.push(diff)
          
          res.data.forEach(element => {
            this.categoriesGet.push(element)
          });
          // categoriesUpdated.value = res.data
          console.log(this.categoriesGet)
      })
      .catch(err => 
        console.log(err)
      )
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
      <div v-for="(category, index) in categories" :key="index" class="col-xl-4 col-md-6 pt-3 d-flex" >
        <CategoryBox :category="category"></CategoryBox>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
