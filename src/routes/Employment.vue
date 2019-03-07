<script>
import { DoughnutChart } from '../charts/';
import stringData from '../strings.js';
import { countBy } from 'lodash';

export default {
  name: 'employment',
  computed: {
    employmentStatusChartData() {
      const data = countBy(this.employmentTypes);

      return ({
        labels: Object.keys(data),
        datasets: [{
            backgroundColor: ['#006eb5', '#badb00', '#d41b2c', '#ff854f', '#824091'],
            data: Object.values(data),
        }]
      })
    },
  },
  props: {
    employmentTypes: Array,
  },
  components: {
    DoughnutChart
  }
};
</script>

<template>
    <doughnut-chart :chartData="employmentStatusChartData" :options="{responsive: true}" />
</template>