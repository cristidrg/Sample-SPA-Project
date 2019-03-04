<script>
import { countBy } from 'lodash';
import { PieChart, DoughnutChart, BarChart } from './charts/';
import { ALL, createArrayOfUniqueValues } from './utils.js';
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

      return this.data.dump.filter(element => 
        ( activeYear == ALL || element.job_year == activeYear )
        && ( activeSTDLVL == ALL || element.student_level == activeSTDLVL )
        && ( activeCollege == ALL || element.collegedesc == activeCollege )
        && ( activeMajor == ALL || element.majordesc == activeMajor )
      );
    },

    careerOutcomesChartData() {
      const data = countBy(this.filteredData.map(element => element.employment_status));
      
      return ({
        labels: Object.keys(data),
        datasets: [{
            backgroundColor: ['#d41b2c', '#b5b5b5', '#006eb5'],
            data: Object.values(data),
        }]
      })
    },

    employmentStatusChartData() {
      const data = countBy(this.filteredData.map(element => element.employment_type));

      return ({
        labels: Object.keys(data),
        datasets: [{
            backgroundColor: ['#006eb5', '#badb00', '#d41b2c', '#ff854f', '#824091'],
            data: Object.values(data),
        }]
      })
    },

    startingSalariesData() {
      const salaries = this.filteredData
        .map(element => Math.floor((element.final_salary_recalculated % 100000) / 10000))
        .filter(element => !isNaN(element))
        .reduce((acc, curr) => {
          acc[curr] ? acc[curr] += 1 : acc[curr] = 1;
          return acc;
        }, {});

      const labels = Object.keys(salaries).map(digit => `${digit}0k < ${digit}9k`);
      labels[0] = '< 10k'

      return ({
        labels: labels,
        datasets: [{
            backgroundColor: ['#d41b2c'],
            data: Object.values(salaries),
        }]
      })
    },

    schoolsSortedByName() {
      return createArrayOfUniqueValues("final_university", this.filteredData).filter(element => element != "NA").sort()
    },

    getSchoolsByPopularity() {
      const schoolsToCount = countBy(this.filteredData
        .map(element => element.final_university)
        .filter(element => element != "NA"));

      return Object.entries(schoolsToCount)
        .map(entry => ({name: entry[0], count: entry[1]}))
        .sort((a, b) => b.count - a.count);
    },
    
    hiringCompaniesSortedByName() {
      return createArrayOfUniqueValues("final_companyname", this.filteredData).sort()
    },

    industriesSortedByPopularity() {
      const listOfIndustries = countBy(this.filteredData
        .map(element => element.final_industry)
        .filter(element => element != 'Not Known'))

      const total = Object.values(listOfIndustries)
        .reduce((acc, curr) => acc + curr, 0);
    
      const result = Object.entries(listOfIndustries)
        .map(entry => ({name: entry[0], percentage: new Number((100 * entry[1]) / total).toFixed(2)}))
        .sort((a, b) => b.percentage - a.percentage)

      return result;
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
  },

  components: {
    PieChart,
    DoughnutChart,
    BarChart
  }
};
</script>

<template>
  <main id="app">
    <section class="section --banner flex--col vh--100 bg--img content--around" style="background-image: url(//facts.northeastern.edu/assets/images/16x9-campus.jpg);" role="banner">
      <div class="__header mt--3">
        <h1 class="__title fs--d3 mb--1 fw--700 ta--c@d">
          <span class="fw--700">Student Outcomes</span>
        </h1>
      </div>
      <div class="section pa--1 bg--gray-700 ta--c@d">
        <h1 class="fs--d2">{{ strings.head.title }}</h1>
        <p class="fs--sm lh--loose">{{ strings.head.copy }}</p>
        <a class="btn bg--white-alpha" href="#app_content">Show me the money</a>
      </div>
    </section>
    <section class="section pa--0 filter-menu ta--l" id="app_content">
      <div class="bg--red hidden--up@t ta--c pa--1 d--flex justify--between">
        <button class="btn --sm" data-toggle="nav" data-swap-target="#filter_menu">
          <i data-feather="align-left"></i>
          Filter
        </button>
        <button class="btn --sm" data-toggle="nav" data-swap-target="#chart_menu">
          <i data-feather="align-right"></i>
          Browse
        </button>
      </div>
      <nav class="__drawer" id="filter_menu" role="navigation">
        <h3>(Filter Menu)</h3>

        <p>Filter data sets by:</p>
        <div class="row">
          <div class="col w--1/3 select__wrapper">
            <label for="year-filter" class="tc--gray-300">Year</label>
            <select v-model="filters.activeYear" id="year-filter">
              <option v-for="year in data.years" :value="year" :key="year">
                {{ year }}
              </option>
            </select>
          </div>
          <div class="col w--1/3 select__wrapper">
            <label for="college-filter" class="tc--gray-300">College</label>
            <select v-model="filters.activeCollege" id="college-filter">
              <option v-for="college in data.colleges" :value="college" :key="college">
                {{ college }}
              </option>
            </select>
          </div>
          <div class="col w--1/3 select__wrapper">
            <label for="major-filter" class="tc--gray-300">Major</label>
            <select v-model="filters.activeMajor" id="major-filter">
              <option v-for="major in data.majors" :value="major" :key="major">
                {{ major }}
              </option>
            </select>
          </div>
        </div>
      </nav>
      <nav class="__drawer" id="chart_menu" role="navigation">
        <h3>(Chart Menu)</h3>
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

    <section class="section graduate-data">
      <p>Graduate Data</p>
    </section>

    <section class="section industry-data">
      <p>Industry Data</p>
    </section>

    <div class="col w--80@t chart-content">
      <p>Northeastern graduates are in high-demand</p>
      <doughnut-chart :chartData="employmentStatusChartData" :options="{responsive: true}" />
      <bar-chart :chartData="startingSalariesData" :options="{responsive: true}" />
      <pie-chart :chartData="careerOutcomesChartData" :options="{responsive: true}" />
    </div>
  </main>
</template>

<style scoped>
  .single-col-layout > * {
    flex-basis: 100%;
  }

  th {
    text-align: center;
  }
</style>
