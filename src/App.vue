<script>
import axios from 'axios'
import { countBy } from 'lodash';
import { PieChart, DoughnutChart, BarChart } from './charts/';

import { ALL, 
  years as yearDATA,
  stdnt_level as stndtDATA,
  colleges as collegeDATA,
  majors as majorDATA
} from './constants.js';

import dataDump from './data_dump.json';

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
        dump: dataDump,
        years: yearDATA,
        stdntLevels: stndtDATA,
        colleges: collegeDATA,
        majors: majorDATA
      }
    }
  },

  computed: {
    filteredData() {
      const { activeYear, activeSTDLVL, activeCollege, activeMajor } = this.filters;

      return this.data.dump.filter(element => 
        ( activeYear == ALL || element.job_YEAR == activeYear )
        && ( activeSTDLVL == ALL || element.student_LEVEL == activeSTDLVL )
        && ( activeCollege == ALL || element.collegedesc == activeCollege )
        && ( activeMajor == ALL || element.majordesc == activeMajor )
      );
    },

    careerOutcomesChartData() {
      const data = countBy(this.filteredData.map(element => element.employment_STATUS));
      return ({
        labels: Object.keys(data),
        datasets: [{
            backgroundColor: ['#FF0000', '#C2C2C2', '#0000FF'],
            data: Object.values(data),
        }]
      })
    },

    employmentStatusChartData() {
      const data = countBy(this.filteredData.map(element => element.employment_TYPE));
      return ({
        labels: Object.keys(data),
        datasets: [{
            backgroundColor: ['blue', 'green', 'red', 'orange', 'purple'],
            data: Object.values(data),
        }]
      })
    },

    startingSalariesData() {
      const salaries = this.filteredData
        .map(element => Math.floor((element.final_SALARY_RECALCULATED % 100000) / 10000))
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
            backgroundColor: ['red'],
            data: Object.values(salaries),
        }]
      })
    },

  },

  components: {
    PieChart,
    DoughnutChart,
    BarChart
  }
}
</script>

<template>
  <div id="app" class="ta--c">
    <div class="row bg--black filter-menu">
      <p class="col w--20@t d--flex my--0 justify--center items--center">Filter data sets by:</p>
      <div class="col w--20@t">
        <label for="year-filter">Years</label>
        <select v-model="filters.activeYear" id="year-filter">
          <option v-for="year in data.years" :value="year" :key="year">
            {{ year }}
          </option>
        </select>
      </div>
      <div class="col w--20@t">
        <label for="school-filter">Schools Attended</label>
        <select v-model="filters.activeSTDLVL" id="school-filter">
          <option v-for="stdntLevel in data.stdntLevels" :value="stdntLevel" :key="stdntLevel">
            {{ stdntLevel }}
          </option>
        </select>
      </div>
      <div class="col w--20@t">
        <label for="college-filter">Industries</label>
        <select v-model="filters.activeCollege" id="college-filter">
          <option v-for="college in data.colleges" :value="college" :key="college">
            {{ college }}
          </option>
        </select>
      </div>
      <div class="col w--20@t">
        <label for="major-filter">Employment Type</label>
        <select v-model="filters.activeMajor" id="major-filter">
          <option v-for="major in data.majors" :value="major" :key="major">
            {{ major }}
          </option>
        </select>
      </div>
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
        <pie-chart :chartData="careerOutcomesChartData" :options="{responsive: true}" />
        <doughnut-chart :chartData="employmentStatusChartData" :options="{responsive: true}" />
        <bar-chart :chartData="startingSalariesData" :options="{responsive: true}" />
      </div>
    </div>
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