<script>
import axios from "axios"
import CategoryBox from "../../components/categories/CategoryBox.vue"
import categoryStore from "@/store/CategoryStore"
import { socket } from "@/socket/socket"



//Queste variabili verranno utilizzate nel backend tramite Axios.
export default{
  name:"Category",
  components: {CategoryBox},
  data() {
    return{
      categories: []
    }
  },
  methods: {
    async getCategories() {
      console.log("Getting categories")
      await axios.get("http://localhost:3000/showCategories") 
      .then(res => {
          console.log(this.categories)
          // var diff = res.data.filter(e => !this.categories.some(o => o.id == e))
          // this.categories.push(diff)
          
          this.categories = res.data
          // res.data.forEach(element => {
          //   this.categories.push(element)
          // });
          console.log(this.categories)
      })
      .catch(err => 
        console.log(err)
      )
    },
    
  },
  //Questo metodo viene invocato non appena la classe viene istanziata.
  mounted() {
    this.getCategories();

    socket.on("refreshCategories", () => {
      console.log("Refreshing categories")
      this.getCategories();
    });
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
    <div class ="row" v-if="categories && categories.length">
      <div v-for="(category, index) in categories" :key="index" class="col-xl-4 col-md-6 pt-3 d-flex" >
        <CategoryBox :category="category"></CategoryBox>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
