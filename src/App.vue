<script>
import axios from 'axios'
import PieChart from './components/PieChart.vue'

export default {
  name: 'app',

  data() {
    return {
      example1: '',
      starships: {},
      isDataLoading: false,
      activeFilter: 'ANY'
    }
  },

  components: {
    PieChart
  },

  computed: {
    hyperdriveRatings() {
      return [...new Set(
        Object.values(this.starships)
          .map(entry => entry.hyperdriveRating)
          .filter(Boolean)
        )]
    },

    starshipsAsList() {
      return Object.values(this.starships) // [ship,ship,ship]  {id->ship}
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
        <label for="employers">Employers</label>
        <select id="employers">
          <option value="1">London</option>
          <option value="2">Buenos Aires</option>
          <option value="3">Delhi</option>
        </select>
      </div>
      <div class="col w--20@t">
        <label for="employers">Schools Attended</label>
        <select id="employers">
          <option value="1">London</option>
          <option value="2">Buenos Aires</option>
          <option value="3">Delhi</option>
        </select>
      </div>
      <div class="col w--20@t">
        <label for="employers">Industries</label>
        <select id="employers">
          <option value="1">London</option>
          <option value="2">Buenos Aires</option>
          <option value="3">Delhi</option>
        </select>
      </div>
      <div class="col w--20@t">
        <label for="employers">Employment Type</label>
        <select id="employers">
          <option value="1">London</option>
          <option value="2">Buenos Aires</option>
          <option value="3">Delhi</option>
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
        <pie-chart/>
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