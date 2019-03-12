<script>
import { PieChart } from '../charts/';
import stringData from '../strings.js';
import { countBy } from 'lodash';

export default {
  name: 'outcomes',
  data() {
    return {
      strings: stringData.career,
      outcomesStyle: {
        width: "90%",
        position: "relative",
        margin: "0 auto"
      },
      outcomesOptions: {
        responsive: true,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        plugins: {
          labels: {
            render: 'value',
            fontColor: '#000',
            position: 'outside',
            fontSize: 20,
            textMargin: 16
          }
        },
        maintainAspectRatio: false,
      }
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
  components: {
      PieChart
  }
};
</script>

<template>
  <section class="section career-outcomes">
    <h2 class="section-title">{{ strings.title }}</h2>
    <div class="row">
      <div class="col w--70@t">
        <pie-chart :chartData="careerOutcomesChartData" :styles="outcomesStyle" :options="outcomesOptions" />
      </div>
      <div class="col w--30@t">
        <p class="row career-outcomes__banner" v-html="strings.claim" />
        <ul class="career-outcomes__legend">
          <li v-for="(outcome, idx) in careerOutcomesChartData.labels" :key="idx">
            {{ outcome }}
          </li>
        </ul>
      </div>
    </div>
    <p class="career-outcomes__note fs--sm tc--gray-600" v-html="strings.note" />
  </section>
</template>
