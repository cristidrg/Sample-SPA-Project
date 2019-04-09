import VueRouter from 'vue-router'
import { Graduate, Employment, CoopParticipation, Industries, Outcomes, Salaries } from './routes/'

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


export default router;