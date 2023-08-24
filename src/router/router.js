import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import AboutPage from "@/pages/AboutPage.vue";
import AddCategory from "@/pages/categories/AddCategory.vue";
import Category from "@/pages/categories/Category.vue";
import Register from "@/pages/login&register/Register.vue";
import Login from "@/pages/login&register/Login.vue";
import NotFound from "@/pages/NotFound.vue";
import Account from "@/pages/UserPage.vue";
import Course from "@/pages/course/Course.vue";
import CoursePage from "@/pages/course/CoursePage.vue";
import AddCourse from "@/pages/course/AddCourse.vue";
import CartPage from "@/pages/CartPage.vue";
import BuyTokens from "@/pages/BuyTokens.vue";
import BoughtCourses from "@/pages/course/BoughtCourses.vue";
import BoughtCoursePage from "@/pages/course/BoughtCoursePage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/about", name: "About", component: AboutPage },
  //Categories Routes
  { path: "/admin/category", name: "Category", component: Category},
  { path: "/admin/category/add", name: "CategoryAdd", component: AddCategory},
  //Courses Routes
  { path: "/admin/courses", name: "Courses", component: Course},
  { path: "/admin/coursePage", name: "CoursePage", component: CoursePage},
  { path: "/admin/courses/add", name: "CourseAdd", component: AddCourse},
  //User Routes
  { path: "/user/register", name: "Register", component: Register},
  { path: "/user/login", name: "Login", component: Login},
  { path: "/user/account", name: "Account", component: Account},
  { path: "/user/account/boughtCourses", name: "BoughtCourses", component: BoughtCourses},
  { path: "/user/account/boughtCoursePage", name: "BoughtCoursePage", component: BoughtCoursePage},
  { path: "/user/cart", name: "Cart", component: CartPage },
  { path: "/user/buy-tokens", name: "BuyTokens", component: BuyTokens },
  { path: "/logout", name: "Logout", component: HomePage },
  //Remaining Routes
  { path: "/404", name: "NotFound", component: NotFound },
  { path: "/:catchAll(.*)", redirect: "/404" }
]
    
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router;