<script setup>
</script>

<template>

  <div class="container">
    <div class="row">
        <div class = "text-center">
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
            <input type="text" class="form-control">
          </div>
          <div class="form-group">
            <label>Category Description</label>
            <input type="text" class="form-control">
          </div>
          <div class="form-group">
            <label>Category Image</label>
            <input type="text" class="form-control">
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<style scoped></style>
