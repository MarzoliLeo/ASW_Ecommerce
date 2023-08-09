import { createStore } from "vuex";
import userModule from "./UserModule.js";
import cartModule from "./CartModule.js";
import categoryModule from "./CategoryModule.js";

export default createStore({
  modules: {
    user: userModule,
    cart: cartModule,
    category: categoryModule,
  },
});