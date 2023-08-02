<script>
import axios from "axios"
import sweetalert from "sweetalert"

import CategoryBox from "../../components/categories/CategoryBox.vue"

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
      await axios.get("http://127.0.0.1:3000/categories") //la route della get è il nome della collection (a differenza del post).
      .then(res => this.categories = res.data)
      .catch(err => console.log(err))
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
