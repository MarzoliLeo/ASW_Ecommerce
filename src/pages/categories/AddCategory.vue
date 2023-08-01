<script>
import axios from "axios"
import sweetalert from "sweetalert"
//Queste variabili verranno utilizzate nel backend tramite Axios.
export default{
  data() {
    return {
      categoryName: "",
      description: "",
      imageUrl: "",

      User: {first_name: '', last_name: '', email: ''},
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

        //TODO questo oggetto andrà messo dentro al database, ma intanto è opportuno
        //vedere se fa con POSTMAN.

        axios({
          method: 'post',
          //Utilizzo POSTMAN per verificare che le mie API siano corrette.
          //TODO momentaneamente danno errore perché non so usare bene POSTMAN,
            //ma dovrebbero funzionare.
          url: `postman-echo.com/get?foo=bar`,
          data: JSON.stringify(newCategory),
          hearders: {
            'Content-Type': 'application/json'
          }
        }).then(() => {
          sweetalert({
            text: "Category added successfully",
            icon: "success"
          })
        })
        .catch(err => console.log(err));
    },

    addUserToDB(){
      let newUser = {
        first_name: this.User.first_name,
        last_name: this.User.last_name,
        email: this.User.email
      }
      console.log(newUser);
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

    <!--Form per gli utenti (momentaneamente messo qua per una prova, ma avrà una sua pagina dedicata)-->
    <div class="row">
        <div class="col-12 text-center">
          <h3 class="pt-3">Login Form</h3>
        </div>
    </div>
    <div class ="row">
      <!--Utilizzo bootstrap per creare il form-->
      <div class="col-3"></div>
      <div class="col-6">
        <form>
          <div class="form-group">
            <label>User First Name</label>
            <input type="text" class="form-control" v-model="User.first_name">
          </div>
          <div class="form-group">
            <label>User Last Name</label>
            <textarea type="text" class="form-control" v-model="User.last_name"></textarea>
          </div>
          <div class="form-group">
            <label>User email</label>
            <input type="text" class="form-control" v-model="User.email">
          </div>
          <br>
          <div class="text-center">
            <button type="button" class="btn btn-primary" @click="addUserToDB">Submit</button>
          </div>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<style scoped></style>
