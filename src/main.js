// import 'jquery';
// import 'kernl-ui';

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { Graduate, Employment, CoopParticipation, Industries, Outcomes, Salaries } from './routes/';

const routes = [
  { path: '/graduate-outcomes', component: Graduate },
  { path: '/employment-status', component: Employment },
  { path: '/coop-participation', component: CoopParticipation },
  { path: '/industries', component: Industries },
  { path: '/outcomes', component: Outcomes },
  { path: '/salaries', component: Salaries },
];

const router = new VueRouter({
  routes
});

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')


