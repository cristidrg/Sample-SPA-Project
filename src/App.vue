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
<div>
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

    <div class="section industry-data">
      <p class="industry-data__title">{{ strings.industry.title }}</p>
      <p class="industry-data__header"> {{ strings.industry.list1_header }}</p>
      <ul class="industry-data__list --b-first">
        <li v-for="(industry, idx) in industriesSortedByPopularity" :key="idx">
          <span class="industry-data__perc">{{ industry.percentage }}%</span> {{ industry.name }}
        </li>
      </ul>

      <p class="industry-data__header"> {{ strings.industry.list2_header }}</p>
      <ul class="industry-data__list">
        <li v-for="(company, idx) in hiringCompaniesSortedByName.slice(0, 16)" :key="idx">
          {{ company }}
        </li>
      </ul>

      <a class="industry-data__button btn">{{ strings.industry.list2_button }}</a>
    </div>

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
  </div>
</template>

<style scoped>
  .single-col-layout > * {
    flex-basis: 100%;
  }

  th {
    text-align: center;
  }
</style>