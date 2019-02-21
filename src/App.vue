<script>
import axios from 'axios'
import PieChart from './components/CareerOutcomes.vue'

import { ALL, 
  employers as employerDATA,
  schools as schoolDATA,
  industries as industryDATA,
  emp_status as employmentDATA
} from './constants.js';

import dataDump from './data_dump.json';

export default {
  name: 'app',

  data() {
    return {
      example1: '',
      starships: {},
      isDataLoading: false,
      activeFilter: 'ANY',
      filters: {
        employers: ALL,
        schools: ALL,
        industries: ALL,
        employment: ALL
      },
      data: {
        employers: employerDATA,
        schools: schoolDATA,
        industries: industryDATA,
        emp_status: employmentDATA
      }
    }
  },

  components: {
    PieChart
  },

  computed: {
    /* Order of values returned must be: employed, grad school, seeking employment */
    outcomeValues() {
      return [82.12, 15.49, 2.39]
    },

    hyperdriveRatings() {
      return [...new Set(
        Object.values(this.starships)
          .map(entry => entry.hyperdriveRating)
          .filter(Boolean)
        )]
    },

    starshipsAsList() {
      return Object.values(this.starships)
    },

    filteredShips() {  
      return this.starshipsAsList.filter(ship => this.activeFilter == 'ANY' || ship.hyperdriveRating == this.activeFilter)
    }
  },

  filters: {
    arrayFieldMatches(array, field, value) {
      return array.filter(entry => entry[field] == value)
    },
  },

  mounted() {
    //this.getStarships();
  },

  updated() {
    console.log(this.activeFilter);
  },

  methods: {
    async getStarships () {
      this.isDataLoading = true;
      try {
        const res = await axios.post('http://localhost:59035/', {
          query: ` 
            query {
              allStarships {
                edges {
                  node {
                    id
                    name
                    cargoCapacity
                    starshipClass
                    hyperdriveRating
                  }
                }
              }
            }`
        })

        const data = res.data.data.allStarships.edges;

        this.starships = data.reduce((acc, curr) => {
            acc[curr.node.id] = curr.node
            return acc
        }, {}) // {id -> starship}
      } catch(err) {
        console.error(err)
      }
      this.isDataLoading = false
    },
  }
}
</script>

<template>
  <div id="app" class="ta--c">
    <div class="row bg--black filter-menu">
      <p class="col w--20@t d--flex my--0 justify--center items--center">Filter data sets by:</p>
      <div class="col w--20@t">
        <label for="employer-filter">Employers</label>
        <select v-model="filters.employers" id="employer-filter">
          <option v-for="employer in data.employers" v-bind:value="employer">
            {{ employer }}
          </option>
        </select>
      </div>
      <div class="col w--20@t">
        <label for="school-filter">Schools Attended</label>
        <select v-model="filters.schools" id="school-filter">
          <option v-for="school in data.schools" v-bind:value="school">
            {{ school }}
          </option>
        </select>
      </div>
      <div class="col w--20@t">
        <label for="industry-filter">Industries</label>
        <select v-model="filters.industries" id="industry-filter">
          <option v-for="industry in data.industries" v-bind:value="industry">
            {{ industry }}
          </option>
        </select>
      </div>
      <div class="col w--20@t">
        <label for="employment-filter">Employment Type</label>
        <select v-model="filters.employment" id="employment-filter">
          <option v-for="status in data.emp_status" v-bind:value="status">
            {{ status }}
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
        <pie-chart :values="outcomeValues"/>
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