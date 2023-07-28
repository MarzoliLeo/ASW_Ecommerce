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
      //TODO questo si dovrà connettere al database o all'API.
      url: `postman-echo.com/get?foo=bar`,
      categories: []
    };
  },
  methods: {
    async getCategories() {
      await axios.get(`${this.url}/category`) //TODO questo sarà il link al database o all'API.
      .then(res => this.categories = res.data)
      .catch(err => console.log(err))
    }
  },
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
          <router-link :to="{name : 'addCategory'}">
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
