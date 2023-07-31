import { createRouter, createWebHistory } from "vue-router"
import HomePage from "@/pages/HomePage.vue"
import AboutPage from "@/pages/AboutPage.vue"
import AddCategory from "@/pages/categories/AddCategory.vue"
import Category from "@/pages/categories/Category.vue"
import NotFound from "@/pages/NotFound.vue"

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/about", name: "About", component: AboutPage },
  { path: "/admin/category/add", name: "addCategory", component: AddCategory},
  { path: "/admin/category", name: "Category", component: Category},
  { path: "/404", name: "NotFound", component: NotFound },
  { path: "/:catchAll(.*)", redirect: "/404" }
]
    
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router



