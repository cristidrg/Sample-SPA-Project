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
  <section class="section employment-status">
    <p class="employment-status__title">Placeholder Title</p>
    <div class="row">
      <div class="col w--70@t">
        <doughnut-chart :chartData="employmentStatusChartData" :styles="outcomesStyle" :options="{responsive: true}" />
      </div>
      <div class="col w--30@t">
        <p class="row career-outcomes__banner"><span class="fs--d5 tc--red mr--1 d--block">100%</span> Placeholder figure</p>
        <ul class="employment-status__legend">
          <li>Placeholder</li>
        </ul>
      </div>
    </div>
  </section>
</template>