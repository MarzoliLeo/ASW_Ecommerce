<script>
import axios from "axios";
import sweetalert from "sweetalert";

export default {
  data() {
    return {
      Category: { categoryName: "", description: "", imageUrl: "" },
    };
  },
  methods: {
    addCategory() {
      console.log(
        this.Category.categoryName,
        this.Category.description,
        this.Category.imageUrl
      );
      const newCategory = {
        categoryName: this.Category.categoryName,
        description: this.Category.description,
        imageUrl: this.Category.imageUrl,
      };
      axios
        .post("http://127.0.0.1:3000/admin/addCategory", newCategory)
        .then((res) => {
          sweetalert({
            text: "Category added successfully",
            icon: "success",
          });
          console.log(newCategory);
        })
        .catch((err) => {
          sweetalert({
            text: "Info error. Category not registered.",
            icon: "error",
          });
          console.log("Errore di tipo: " + err);
        });
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Add Category</h3>
      </div>
    </div>
    <div class="row">
      <!--Utilizzo bootstrap per creare il form-->
      <div class="col-3"></div>
      <div class="col-6">
        <form>
          <div class="form-group">
            <label>Category Name</label>
            <input
              type="text"
              class="form-control"
              v-model="Category.categoryName"
            />
          </div>
          <div class="form-group">
            <label>Category Description</label>
            <textarea
              type="text"
              class="form-control"
              v-model="Category.description"
            ></textarea>
          </div>
          <div class="form-group">
            <label>Category Image</label>
            <input
              type="text"
              class="form-control"
              v-model="Category.imageUrl"
            />
          </div>
          <br />
          <div class="text-center">
            <button type="button" class="btn btn-primary" @click="addCategory">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<style scoped></style>
