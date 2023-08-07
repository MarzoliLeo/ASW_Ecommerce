import { createRouter, createWebHistory } from "vue-router"
import HomePage from "@/pages/HomePage.vue"
import AboutPage from "@/pages/AboutPage.vue"
import AddCategory from "@/pages/categories/AddCategory.vue"
import Category from "@/pages/categories/Category.vue"
import Register from "@/pages/login&register/Register.vue"
import Login from "@/pages/login&register/Login.vue"
import NotFound from "@/pages/NotFound.vue"
import Account from "@/pages/UserPage.vue"
import Courses from "@/pages/course/Course.vue"

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/about", name: "About", component: AboutPage },
  { path: "/admin/category", name: "Category", component: Category},
  { path: "/admin/category/add", name: "CategoryAdd", component: AddCategory},
  { path: "/admin/courses", name: "Courses", component: Courses},
  { path: "/admin/courses/add", name: "CoursesAdd", component: AddCategory},
  { path: "/user/register", name: "Register", component: Register},
  { path: "/user/login", name: "Login", component: Login},
  { path: "/user/account", name: "Account", component: Account},
  { path: "/", name: "Logout", component: HomePage },
  { path: "/404", name: "NotFound", component: NotFound },
  { path: "/:catchAll(.*)", redirect: "/404" }
]
    
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router



