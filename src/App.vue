<script>
import axios from 'axios'

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

  computed: {
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
    this.getStarships();
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
        }, {})
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
    <h1>Vue.js + GraphQL scaffold</h1>
    <div v-if="isDataLoading">
      Data is currently loading...
    </div>
    <div v-else class="d--flex justify--center flex--wrap single-col-layout">
      <h2>Spaceships</h2>
      <p>Currently display spaceships with a hyper drive rating of 
        <select v-model="activeFilter" class='d--inline w--10 bw--0'>
          <option>ANY</option>
          <option v-for="rating in hyperdriveRatings">{{ rating }}</option>
        </select>
      </p>
      <table class="d--table">
        <tr>
          <th>NAME</th>
          <th>STARSHIP CLASS</th>
          <th>CARGO CAPACITY</th>
        </tr>
        <tr v-for="ship in filteredShips" :key="ship.id"> 
          <td>{{ship.name}}</td>
          <td>{{ship.starshipClass}}</td>
          <td>{{ship.cargoCapacity}}</td>
        </tr>
      </table>
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