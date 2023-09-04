<script>
import axios from "axios"
import CategoryBox from "@/components/categories/CategoryBox.vue"
import { socket } from "@/socket/socket"
import { mapGetters } from "vuex";

//Queste variabili verranno utilizzate nel backend tramite Axios.
export default{
  name:"Category",
  components: {CategoryBox},
  data() {
    return{
      categories: [],
      adminLogged: false,
    }
  },
  computed: {
    ...mapGetters("user", ["email"]),
  },
  methods: {
    async getCategories() {
      // console.log("Getting categories")
      await axios.get("http://localhost:3000/showCategories") 
      .then(res => {
          // console.log(this.categories)
          this.categories = res.data
          // console.log(this.categories)
      })
      .catch(err => 
        console.log(err)
      )
    },
    isAdminLogged(email) {
      if(this.email != '' && this.email != undefined) {
        axios.get("http://localhost:3000/usersPermission", {
          params: {
            email: email,
          }
        })
        .then(res => {
          this.adminLogged = res.data[0].permission == "Admin" ? true : false
        })
        .catch(err => 
          console.log(err)
        )
      }
    }
  },
  computed: {
    
  },
  //Questo metodo viene invocato non appena la classe viene istanziata.
  mounted() {
    this.getCategories();
    this.isAdminLogged(this.email);
    
    socket.on("refreshCategories", () => {
      // console.log("Refreshing categories")
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
          <div class="w-100 d-flex align-items-center justify-content-center">
            <router-link v-if="adminLogged" :to="{name : 'CategoryAdd'}">
              <button class="btn btn-info" style="float:right">Add Category</button>
            </router-link>
          </div>
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
