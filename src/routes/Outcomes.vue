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
        height: '60vh',
        width: '90%',
        position: 'relative',
        margin: '0 auto'
      },
      outcomesOptions: {
        responsive: true,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        layout: {
          padding: {
            top: 5,
            right: 5,
            bottom: 5,
            left: 5
          }
        },
        plugins: {
          labels: {
            render: 'percentage',
            fontColor: '#000',
            position: 'outside',
            outsidePadding: 0,
            fontSize: 14,
            textMargin: 10
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
            backgroundColor: ['#d41b2c', '#a4804a', '#000000', '#ffffff'],
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
    <header class="__header">
      <h2 class="__title">{{ strings.title }}</h2>
      <div class="__subtitle">{{ strings.subtitle }}</div>
    </header>

    <div class="row">
      <div class="col w--70@t">
        <pie-chart :chartData="careerOutcomesChartData" :styles="outcomesStyle" :options="outcomesOptions" />
      </div>
      <div class="col w--30@t">
        <p class="row career-outcomes__banner order--0 order--1@d" v-html="strings.claim" />
        <ul class="career-outcomes__legend order--1 order--0@d">
          <li v-for="(outcome, idx) in careerOutcomesChartData.labels" :key="idx">
            {{ outcome }}
          </li>
        </ul>
      </div>
    </div>
    <p class="career-outcomes__note fs--sm tc--gray-600" v-html="strings.note" />
  </section>
</template>
