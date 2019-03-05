<script>
import stringData from '../strings.js';
import { countBy } from 'lodash';

export default {
  name: 'graduate',
  data() {
    return {
        strings: stringData,
    }
  },
  computed: {
    careerOutcomesChartData() {
      const data = countBy(this.outcomes);
      
      return ({
        labels: Object.keys(data),
        datasets: [{
            backgroundColor: ['#d41b2c', '#b5b5b5', '#006eb5'],
            data: Object.values(data),
        }]
      })
    },
  },
  props: {
      outcomes: Array,
  },
}
</script>

<template>
    <pie-chart :chartData="careerOutcomesChartData" :options="{responsive: true}" />
</template>