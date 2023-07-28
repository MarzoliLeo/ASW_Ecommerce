<template>
  <div class="card">
    <div>
    <img class="card-img-top" :src="category.imageUrl" alt="Card image here">
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ category.categoryName }}</h5>
      <p class="card-text">{{ category.description }}</p>
      <a href="#" class="btn-primary">Premimi</a>
    </div>
  </div>
</template>

<script>
export default{
  name: CategoryBox,
  props: ["category"],
  methods:{},
};

</script>