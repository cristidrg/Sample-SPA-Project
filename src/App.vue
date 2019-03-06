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
