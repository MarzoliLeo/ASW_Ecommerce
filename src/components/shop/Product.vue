<template>
  <div :key="product.id" class="card text-center w-auto shadow-sm">
    <div class="card-body">
      <div class="row">
        <div class="col-md-12">
          <h2 class="card-title h-auto">{{ product.name }}</h2>
          <p class="card-text">{{ product.description }}</p>
          <p class="card-text">Price: {{ product.price }}</p>
          <div class="row justify-content-center">
            <div class="col-md-8">
              <div class="embed-responsive embed-responsive-16by9 rounded">
                <video :poster="product.previewImage" controls class="embed-responsive-item rounded"
                       style="width: 100%; height: 100%;">
                  <source :src="'https://joy1.videvo.net/videvo_files/video/free/2015-09/large_watermarked/Close_up_of_Bike_valve_preview.mp4'" type="video/mp4">
                </video>
              </div>
            </div>
          </div>
          <button @click="addToCart" class="btn btn-primary mt-3">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.product);
    },
  },
};
</script>

<style>
.card {
  margin-bottom: 100px;
  margin-right: 10px;
  margin-left: 10px;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease-in-out;
}

.card:hover {
  border-color: #007bff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  font-size: 1.2rem;
  font-weight: bold;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}
</style>