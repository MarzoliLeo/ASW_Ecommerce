<script>
const axios = require("axios");
//Queste variabili verranno utilizzate nel backend tramite Axios.
export default{
  data() {
    return {
      categoryName: "",
      description: "",
      imageUrl: "",
    }
  },
  methods: {
    addCategory() {
      console.log(this.categoryName, this.description);
        //utilizziamo Axios(API Web) per creare un oggetto categoria.
        const newCategory = {
          categoryName: this.categoryName,
          description: this.description,
          imageUrl: this.imageUrl,
        };

        axios({
          method: 'post',
          //Utilizzo POSTMAN per verificare che le mie API siano corrette.
          url: `postman-echo.com/get?foo=bar`,
          data: JSON.stringify(newCategory),
          hearders: {
            'Content-Type': 'application/json'
          }
        }).then(() => {})
        .catch(err => console.log(err));
    }
  }
}
</script>

<template>

  <div class="container">
    <div class="row">
        <div class="col-12 text-center">
          <h3 class="pt-3">Add Category</h3>
        </div>
    </div>
    <div class ="row">
      <!--Utilizzo bootstrap per creare il form-->
      <div class="col-3"></div>
      <div class="col-6">
        <form>
          <div class="form-group">
            <label>Category Name</label>
            <input type="text" class="form-control" v-model="categoryName">
          </div>
          <div class="form-group">
            <label>Category Description</label>
            <textarea type="text" class="form-control" v-model="description"></textarea>
          </div>
          <div class="form-group">
            <label>Category Image</label>
            <input type="text" class="form-control" v-model="imageUrl">
          </div>
          <br>
          <div class="text-center">
            <button type="button" class="btn btn-primary" @click="addCategory">Submit</button>
          </div>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<style scoped></style>
