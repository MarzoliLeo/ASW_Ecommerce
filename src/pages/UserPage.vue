<script setup>
import userModule from '@/store/UserModule';
</script>

<template>
    <h2 class="d-flex align-items-center justify-content-center mt-2 mb-5">Benvenuto sulla tua User Page</h2>
    <div class="card">
      <h1 class="mt-1 mb-1">{{ this.creatorInfo.first_name }}</h1>
      <h1 class="mt-1 mb-3">{{ this.creatorInfo.last_name }}</h1>
      <h2 class="mt-1 mb-4">{{ this.email }}</h2>
      <p class="title">Premi il pulsante qui sotto per visualizzare i corsi!</p>
      <p>Qui troverai i dati a te associati:</p>
      <p>Tokens disponibili: {{ this.tokenBalance }} tokens</p>
      <p><RouterLink class="nav-link" :to="{ name: 'BoughtCourses' }">    
              <button>Visita i tuoi corsi!</button>
          </RouterLink>
      </p>
    </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { mapGetters } from "vuex";

const CourseBox = ref({});
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  data() {
    return {
      creatorInfo: [],
    }
  },
  computed: {
    ...mapGetters("user", ["email", "tokenBalance"]),
  },
  methods: {
    async getOwnerInfo(email) {
        try {
          await api.get("/getUserByEmail", {
            params: {
              email: email,
            },
          })
          .then(res => {
            this.creatorInfo = res.data[0]
        });
        } catch (err) {
          console.log(err);
        }
    },
  },
  mounted() {
    this.getOwnerInfo(this.email);
  },
};
</script>

<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
}

.title {
  color: grey;
  font-size: 18px;
}

button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

button:hover, a:hover {
  opacity: 0.7;
}
</style>