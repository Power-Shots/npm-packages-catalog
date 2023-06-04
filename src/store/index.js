import { createStore } from "vuex";
import packagesModule from "./modules/packagesModule";

export default createStore({
  modules: {
    package: packagesModule,
  },
  strict: true,
});
