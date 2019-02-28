<script>
import { countBy } from 'lodash';
import { PieChart, DoughnutChart, BarChart } from './charts/';
import { ALL, createArrayOfUniqueValues } from './utils.js';
import { getAllData } from './queries.js';
import stringData from './strings.js';
import API from './configs.js';

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
      console.log('~~~');
      console.log(this.filteredData);
      const data = countBy(this.filteredData.map(element => element.employment_status));
      console.log(data);
      console.log('END~~');
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

  },

  mounted() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      this.isDataLoading = true;
      try {
        const res = await API.post('/', {query: getAllData})
        
        const graduateDestinations = res.data.data.getGraduateDestinations;

        this.data = {
          years: createArrayOfUniqueValues("job_year", graduateDestinations),
          stdntLevels: createArrayOfUniqueValues("student_level", graduateDestinations),
          colleges: createArrayOfUniqueValues("collegedesc", graduateDestinations),
          majors: createArrayOfUniqueValues("majordesc", graduateDestinations),
          dump: graduateDestinations
        }
        
        console.log(graduateDestinations);
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
  <main id="app" class="ta--c">
    <header class="section bg--gray-700">
      <h1 class="fs--d3">{{ strings.head.title }}</h1>
      <p>{{ strings.head.copy }}</p>
    </header>
    <section class="section bg--black filter-menu ta--l">
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
        <!-- <div class="col w--1/3@t">
          <label for="school-filter">Schools Attended</label>
          <select v-model="filters.activeSTDLVL" id="school-filter">
            <option v-for="stdntLevel in data.stdntLevels" :value="stdntLevel" :key="stdntLevel">
              {{ stdntLevel }}
            </option>
          </select>
        </div> -->
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
    </section>

    <div class="row">
      <div class="col w--20@t chart-menu">
        <ul>
          <li class="active">Career Outcomes</li>
          <li>Employment Status</li>
          <li>Co-op participation</li>
          <li>By industry/company</li>
          <li>By graduate school</li>
          <li>Starting salaries</li>
        </ul>
      </div>
      <div class="col w--80@t chart-content">
        <p>Northeastern graduates are in high-demand</p>
        <doughnut-chart :chartData="employmentStatusChartData" :options="{responsive: true}" />
        <bar-chart :chartData="startingSalariesData" :options="{responsive: true}" />
        <pie-chart :chartData="careerOutcomesChartData" :options="{responsive: true}" />
      </div>
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