<script>
import { BarChart } from '../charts/';
import stringData from '../strings.js';
import { countBy } from 'lodash';

export default {
  name: 'graduate',
  data() {
    return {
        strings: stringData.graduate,
    }
  },
  computed: {
    startingSalariesData() {
      const salaries = this.salaries
        .map(element => Math.floor((element % 100000) / 10000))
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
  props: {
      salaries: Array,
  },
  components: {
    BarChart
  }
}
</script>

<template>
    <bar-chart :chartData="startingSalariesData" :options="{responsive: true}" />
</template>