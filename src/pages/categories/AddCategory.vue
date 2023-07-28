<script>
export default{
  data() {
    return {
      categoryName: "",
      description: "",
      imageUrl: "",
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
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<style scoped></style>
