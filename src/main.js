import 'jquery'
import 'kernl-ui'

import "@babel/polyfill";
import Es6Promise from 'es6-promise'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueAnimateNumber from 'vue-animate-number'
import ToggleButton from 'vue-js-toggle-button'
import { Graduate, Employment, CoopParticipation, Industries, Outcomes, Salaries } from './routes/'

Es6Promise.polyfill();

const DEFAULT_TITLE = "Career Outcomes Powered by Experience - Northeastern University"

//Order of routes is used in prev/next navigation.
//Routes with redirects are ignored.
/*
  https://stackoverflow.com/questions/51008803/laravel-vue-router-returns-404-page
*/
export const routes = [
  {
    path: '/',
    redirect: 'careers',
  },
  {
    path: '/careers',
    name: 'careers',
    component: Outcomes,
    meta: {
      title: 'Career Outcomes Powered by Experience - Northeastern University',
      description: 'Northeastern students graduate with full resumés of real-world experience closely tied to their career paths. They’ve learned how to solve problems as part of a team of professionals and navigate the unexpected challengs of today’s fast-paced workplace.'
    }
  },
  {
    path: '/employment-status',
    component: Employment,
    meta: {
      title: 'Employment Status - Career Outcomes at Northeastern University',
      description: 'This data shows the percentages of graduates reporting their employment status, including whether they’re employed full- or part-time, in graduate school, volunteering or in the military, or still seeking employment.'
    }
  },
  {
    path: '/coop-participation',
    component: CoopParticipation,
    meta: {
      title: 'Co-op Participation - Career Outcomes at Northeastern University',
      description: 'Co-op (or cooperative education) is our flagship experiential program. It integrates classroom study with professional work experience, usually related to a student’s major or field of interest.'
    }
  },
  {
    path: '/industries',
    component: Industries,
    meta: {
      title: 'Industries - Career Outcomes at Northeastern University',
      description: 'Our students are hired by a range of industries and companies, from small startups to large organizations, to government and non-profits.',
    }
  },
  {
    path: '/graduate-school',
    component: Graduate,
    meta: {
      title: 'Graduate School - Career Outcomes at Northeastern University',
      description: 'The undergraduate research opportunities students have at Northeastern set our graduate school applicants apart from those at other institutions.'
    }
  },
  {
    path: '/salaries',
    component: Salaries,
    meta: {
      title: 'Starting Salaries - Career Outcomes at Northeastern University',
      description: 'The annual Destinations survey asks our graduating students to tell us their starting salary. View a breakdown of the percentage of students that fall into a particular salary range.'
    }
  },
];

const router = new VueRouter({
  routes
});

router.afterEach((to, from) => {
  document.title = to.meta.title || DEFAULT_TITLE;
  document.querySelector('meta[name="description"]').setAttribute("content", to.meta.description);
});

import $ from 'jquery'
import 'formstone/src/js/navigation'

import vueScrollto from 'vue-scrollto'
Vue.use(vueScrollto)

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueAnimateNumber)
Vue.use(ToggleButton)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

Vue.component('hero-button', {
  data: function () {
    return {}
  },
  template: '<a class="btn bg--red" v-scroll-to="`#app_content`" href="#/outcomes">See the numbers</a>'
})
new Vue({ el: '#hero_btn' })

let $filter = $('#filter_menu')
let $browse = $('#chart_menu')

$('#no_data_filter_menu').on('click', '.no-data', function() {
  alert('alert')
  // $filter.navigation('open')
})

$filter.navigation({
  type: 'overlay',
  gravity: 'left',
  maxWidth: '991px',
  labels: { closed: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg> Filter' }
})

$('.filter-menu__apply', $filter).on('click touch', (e) => {
  e.preventDefault()
  $filter.navigation('close')
})

$browse.navigation({
  type: 'overlay',
  gravity: 'right',
  maxWidth: '991px',
  labels: { closed: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg> Segments' }
})

$('.__link', $browse).on('click touch', () => {
  $browse.navigation('close')
})
