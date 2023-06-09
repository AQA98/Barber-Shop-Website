import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import Routes from "./routes/routes.js";
import store from "./stores/index";

Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
  routes: Routes,
  mode: "history",
});

// middleware
router.beforeEach((to, _, next) => {
  // get token
  const token = router.app.$store.state.token;

  let publicPages = ["HomeRoute", "Home", 'BarbersManagement', 'Gallery', 'Appointment', 'AppointmentDetail', 'ProductsPage'];
// needed auth routes
  const authRequired = !publicPages.includes(to.name);

  // trying to access a restricted page + no token
  // redirect to home page
  if (authRequired && !!token == false) {
    console.log(to)
    next("/");
  }

  next();
});

new Vue({
  store,
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
