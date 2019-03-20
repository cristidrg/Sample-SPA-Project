import 'jquery'
import 'kernl-ui'

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueAnimateNumber from 'vue-animate-number'
import { Graduate, Employment, CoopParticipation, Industries, Outcomes, Salaries } from './routes/'

//Order of routes is used in prev/next navigation.
//Routes with redirects are ignored.
/*
  https://stackoverflow.com/questions/51008803/laravel-vue-router-returns-404-page
*/
export const routes = [
  {
    path: '/',
    redirect: 'outcomes',
  },
  {
    path: '/outcomes',
    name: 'outcomes',
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
})

import $ from 'jquery'
import 'formstone/src/js/navigation'

import vueScrollto from 'vue-scrollto'
Vue.use(vueScrollto)

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueAnimateNumber)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

let $filter = $('#filter_menu')
let $browse = $('#chart_menu')

$filter.navigation({
  type: 'overlay',
  gravity: 'left',
  maxWidth: '991px',
  labels: { closed: 'Refine Results' }
})

$('.filter-menu__apply', $filter).on('click touch', (e) => {
  e.preventDefault()
  $filter.navigation('close')
})

$browse.navigation({
  type: 'overlay',
  gravity: 'right',
  maxWidth: '991px',
  labels: { closed: 'View Segments' }
})

$('.__link', $browse).on('click touch', () => {
  $browse.navigation('close')
})

$('.__toggler').on('click touch', () => {
  $('body').toggleClass('menu-open')
})

// Initialize Formstone carousel()
$('.carousel').carousel({
  theme: '',
  pagination: true,
  infinite: true
});

