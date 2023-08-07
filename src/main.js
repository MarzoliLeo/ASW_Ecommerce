import { createApp } from "vue"
import App from "./App.vue"
import router from "@/router/router"
import userStore from "@/store/UserStore"
import Vuex from 'vuex'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap"

const app = createApp(App)
app.use(router)
app.use(userStore)

app.mount("#app")
