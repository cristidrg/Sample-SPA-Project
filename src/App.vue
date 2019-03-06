<script>
import { countBy } from 'lodash';
import { ALL, createArrayOfUniqueValues } from './utils.js';
import { Navigation } from './routes/';
import { getAllData } from './queries.js';
import stringData from './strings.js';
import API from './configs.js';
import feather from 'feather-icons';

export default {
  name: 'app',

  data() {
    return {
      isDataLoading: false,
      filters: {
        activeYear: ALL,
        activeSTDLVL: ALL,
        activeCollege: ALL,
        activeMajor: ALL
      },
      data: {
        dump: [],
        years: [],
        stdntLevels: [],
        colleges: [],
        majors: []
      },
      strings: stringData
    }
  },

  computed: {
    filteredData() {
      const { activeYear, activeSTDLVL, activeCollege, activeMajor } = this.filters;

      return this.filterData(activeYear, activeSTDLVL, activeCollege, activeMajor);
    },

    getOutcomes() {
      return this.filteredData
        .map(element => element.employment_status)
        .filter(element => element != "NA");
    },

    getEmploymentTypes() {
      return this.filteredData
        .map(element => element.employment_type);
    },

    getSchools() {
      return this.filteredData
        .map(element => element.final_university)
        .filter(element => element != "NA");
    },

    getCoopNumbers() {
      return this.filteredData
        .map(element => element.final_coop_numbers.split(' ')[0]);
    },

    getIndustries() {
      return this.filteredData
        .map(element => element.final_industry)
        .filter(element => element != "Not Known")
    },

    getCompanies() {
      return this.filteredData
        .map(element => element.final_companyname)
        .filter(element => element != "NA")
    },

    getSalaries() {
      return this.filteredData
        .map(element => element.final_salary_recalculated)
        .filter(element => element != "NA")
    }
  },

  mounted() {
    this.fetchData();
    feather.replace();
  },

  methods: {
    async fetchData() {
      this.isDataLoading = true;
      try {
        const res = await API.post('/', {query: getAllData})
        
        const graduateDestinations = res.data.data.getGraduateDestinations;

        this.data = {
          years: [ALL, ...createArrayOfUniqueValues("job_year", graduateDestinations)],
          stdntLevels: [ALL, ...createArrayOfUniqueValues("student_level", graduateDestinations)],
          colleges: [ALL, ...createArrayOfUniqueValues("collegedesc", graduateDestinations)],
          majors: [ALL, ...createArrayOfUniqueValues("majordesc", graduateDestinations)],
          dump: graduateDestinations
        }
      } catch(e) {
        console.error(e);
      }
      this.isDataLoading = false;
    },

    filterData(yearFilter, studentFilter, collegeFilter, majorFilter) {
      return this.data.dump.filter(element => 
        ( yearFilter == ALL || element.job_year == yearFilter )
        && ( studentFilter == ALL || element.student_level == studentFilter )
        && ( collegeFilter == ALL || element.collegedesc == collegeFilter )
        && ( majorFilter == ALL || element.majordesc == majorFilter )
      );
    },

    isFilterValid(filterValue, filterType) {
      const { activeYear, activeSTDLVL, activeCollege, activeMajor } = this.filters;

      if ([activeYear, activeSTDLVL, activeCollege, activeMajor].every(el => el == ALL)) {
        return true;
      }

      switch(filterType) {
        case 'major': return this.filterData(activeYear, activeSTDLVL, activeCollege, filterValue).length != 0
        case 'college': return this.filterData(activeYear, activeSTDLVL, filterValue, activeMajor).length != 0
        case 'student': return this.filterData(activeYear, filterValue, activeCollege, activeMajor).length != 0
        case 'year': return this.filterData(filterValue, activeSTDLVL, activeCollege, activeMajor).length != 0
      }
    }
  },
  components: {
    Navigation
  }
};
</script>

<template>
  <main id="app">
    <section class="section --banner vh--100 bg--img" style="background-image: url(//facts.northeastern.edu/assets/images/16x9-campus.jpg);" role="banner">
      <div class="d--flex flex--col justify--around">
        <div class="__header mt--3">
          <h1 class="__title fs--d3 mb--1 fw--700 ta--c@d">
            <span class="fw--700">Student Outcomes</span>
          </h1>
        </div>
        <div class="section pa--1 bg--gray-700 ta--c@d">
          <h1 class="fs--d2">{{ strings.head.title }}</h1>
          <p class="fs--sm lh--loose">{{ strings.head.copy }}</p>
          <a class="btn bg--red tooltip" data-title="Tooltip Content" href="#app_content">Show me the money</a>
        </div>
      </div>
    </section>
    <header class="section bg--gray-700 ta--c">
      <h1 class="fs--d3">{{ strings.head.title }}</h1>
      <p>{{ strings.head.copy }}</p>
    </header>
    <section class="section bg--black filter-menu ta--l">
      <p>Filter data sets by:</p>
      <div class="row">
        <div class="col w--1/3 select__wrapper">
          <label for="year-filter" class="tc--gray-300">Year</label>
          <select v-model="filters.activeYear" id="year-filter">
            <option v-for="year in data.years" :value="year" :key="year" :disabled="!isFilterValid(year, 'year')">
              {{ year }}
            </option>
          </select>
        </div>
        <div class="col w--1/3 select__wrapper">
          <label for="college-filter" class="tc--gray-300">College</label>
          <select v-model="filters.activeCollege" id="college-filter">
            <option v-for="college in data.colleges" :value="college" :key="college" :disabled="!isFilterValid(college, 'college')">
              {{ college }}
            </option>
          </select>
        </div>
        <div class="col w--1/3 select__wrapper">
          <label for="major-filter" class="tc--gray-300">Major</label>
          <select v-model="filters.activeMajor" id="major-filter">
            <option v-for="major in data.majors" :value="major" :key="major" :disabled="!isFilterValid(major, 'major')">
              {{ major }}
            </option>
          </select>
        </div>
      </div>
    </section>

    <section class="section pa--0 filter-menu ta--l vh--100" id="app_content">
      <section id="app_nav_menus">
        <nav 
          class="navigation pa--1" 
          id="filter_menu" 
          role="navigation" 
          data-navigation-handle="#filter_menu_handle" 
          data-navigation-content="#app_nav_buttons">
          <h3>(Filter Menu)</h3>
          <p>Filter data sets by:</p>
          <div class="select__wrapper">
            <label for="year-filter" class="tc--gray-300">Year</label>
            <select v-model="filters.activeYear" id="year-filter">
              <option v-for="year in data.years" :value="year" :key="year">
                {{ year }}
              </option>
            </select>
          </div>
          <div class="select__wrapper">
            <label for="college-filter" class="tc--gray-300">College</label>
            <select v-model="filters.activeCollege" id="college-filter">
              <option v-for="college in data.colleges" :value="college" :key="college">
                {{ college }}
              </option>
            </select>
          </div>
          <div class="select__wrapper">
            <label for="major-filter" class="tc--gray-300">Major</label>
            <select v-model="filters.activeMajor" id="major-filter">
              <option v-for="major in data.majors" :value="major" :key="major">
                {{ major }}
              </option>
            </select>
          </div>
        </nav>

        <nav 
          class="navigation pa--1" 
          id="chart_menu" 
          role="navigation" 
          data-navigation-handle="#chart_menu_handle" 
          data-navigation-content="#app_nav_buttons">
          <h3>(Chart Menu)</h3>
          <p>Browse by:</p>
          <div class="chart-menu">
            <ul>
              <li class="active"><a href="#">Career Outcomes</a></li>
              <li><a href="#">Employment Status</a></li>
              <li><a href="#">Co-op participation</a></li>
              <li><a href="#">By industry/company</a></li>
              <li><a href="#">By graduate school</a></li>
              <li><a href="#">Starting salaries</a></li>
            </ul>
          </div>
        </nav>
      </section>
      
      <section class="section pa--1 pt--5" id="app_data_views">
        <section class="section graduate-data">
          <p>Graduate Data</p>
        </section>

        <section class="section industry-data">
          <p>Industry Data</p>
        </section>

        <div class="chart-content">
          <p>Northeastern graduates are in high-demand</p>
          <doughnut-chart :chartData="employmentStatusChartData" :options="{responsive: true}" />
          <bar-chart :chartData="startingSalariesData" :options="{responsive: true}" />
          <pie-chart :chartData="careerOutcomesChartData" :options="{responsive: true}" />
        </div>
      </section>

      <div class="bg--black hidden--up@t ta--c pa--1 d--flex justify--between pos--absolute pin--t w--100" id="app_nav_buttons">
        <button class="btn --sm __toggler" id="filter_menu_handle">
          <i data-feather="align-left"></i>
          Filter
        </button>
        <button class="btn --sm __toggler" id="chart_menu_handle">
          <i data-feather="align-left"></i>
          Browse
        </button>
      </div>
    </section>
    
    <div class="row">
      <div class="col w--20@t chart-menu">
        <ul>
          <router-link to="/outcomes"><li>Career Outcomes</li></router-link>
          <router-link to="/employment-status"><li>Employment Status</li></router-link>
          <router-link to="/coop-participation"><li>Co-op participation</li></router-link>
          <router-link to="/industries"><li>By industry/company</li></router-link>
          <router-link to="/graduate-outcomes"><li>By graduate school</li></router-link>
          <router-link to="/salaries"><li>Starting salaries</li></router-link>
        </ul>
      </div>
      <div class="col w--80@t chart-content">
        <router-view 
          :schools="this.getSchools"
          :industries="this.getIndustries"
          :companies="this.getCompanies"
          :outcomes="this.getOutcomes"
          :salaries="this.getSalaries"
          :coopNumbers="this.getCoopNumbers"
          :employmentTypes="this.getEmploymentTypes"
        />
      </div>
    </div>
    <navigation />
  </main>
</template>
