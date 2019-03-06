import 'jquery';
import 'kernl-ui';

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { Graduate, Employment, CoopParticipation, Industries, Outcomes, Salaries } from './routes/';

//ORDER OF ROUTES IS USED IN NEXT/BACK LOGIC!
export const routes = [
  {
    path: '/outcomes',
    component: Outcomes,
    meta: {
      title: 'Outcomes - Career',
      metaTags: [
        {
          name: 'description',
          content: 'Almost all of our students are employed right away!'
        }
      ]
    }
  },
  {
    path: '/employment-status',
    component: Employment,
    meta: {
      title: 'Outcomes - Employment',
      metaTags: [
        {
          name: 'description',
          content: 'So many employers to choose from!'
        }
      ]
    }
  },
  {
    path: '/coop-participation',
    component: CoopParticipation,
    meta: {
      title: 'Outcomes - Coop Participation',
      metaTags: [
        {
          name: 'description',
          content: 'Our students take advantage of our programs!'
        }
      ]
    }
  },
  {
    path: '/industries',
    component: Industries,
    meta: {
      title: 'Outcomes - Industries',
      metaTags: [
        {
          name: 'description',
          content: 'Our students are employed only by top companies'
        }
      ]
    }
  },
  {
    path: '/graduate-outcomes',
    component: Graduate,
    meta: {
      title: 'Home Page - Example App',
      metaTags: [
        {
          name: 'description',
          content: 'The home page of our example app.'
        }
      ]
    }
  },
  {
    path: '/salaries',
    component: Salaries,
    meta: {
      title: 'Outcomes - Salaries',
      metaTags: [
        {
          name: 'description',
          content: 'Our students make so much money!'
        }
      ]
    }
  },
];

const router = new VueRouter({
  routes
});

import $ from 'jquery';
import 'formstone/src/js/navigation';

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

$("#filter_menu").navigation({
  type: "overlay",
  gravity: "left",
  maxWidth: "700px",
  labels: { closed: "Filter" }
});

$("#chart_menu").navigation({
  type: "overlay",
  gravity: "right",
  maxWidth: "700px",
  labels: { closed: "Browse" }
});

$('.__toggler').on('click touch', () => {
  $('body').toggleClass('menu-open')
});

