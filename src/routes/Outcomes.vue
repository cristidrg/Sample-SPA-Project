<script>
import { PieChart } from '../charts/';
import stringData from '../strings.js';
import { countBy } from 'lodash';
import pattern from 'patternomaly';

const outcomesToColors = {
  'Employed': {
    color: '#d41b2c',
    order: 1
  },
  'In graduate school': {
    color: '#a4804a',
    order: 2
  },
  'Seeking employment': {
    color: '#000000',
    order: 3
  }
};

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
          enabled: true
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
            arc: true,
            outsidePadding: 10,
            fontSize: 14,
            textMargin: 10,
            precision: 2
          }
        },
        maintainAspectRatio: false,
      }
    }
  },
  computed: {
    dataSetWithAttributes() {
      const counts = countBy(this.outcomes);
      let map = {}

      Object.keys(counts).forEach(key => {
        map[key] = Object.assign({}, outcomesToColors[key]);
        map[key].value = counts[key];
        map[key].key = key;
        map[key].perc = parseFloat((counts[key] / this.outcomes.length) * 100).toFixed(2);
      });

      return map;
    },
    careerOutcomesChartData() {
      const data = Object.values(this.dataSetWithAttributes).sort((a,b) => a.order - b.order);

      return ({
        labels: data.map(entry => entry.key),
        datasets: [{
            backgroundColor: data.map((entry, index) => index % 2 == 0 ? entry.color : pattern.draw('line', entry.color)),
            data: data.map(entry => entry.value),
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
      <div class="col w--30@t d--flex">
        <p class="row career-outcomes__banner d--flex order--1 order--0@t" v-html="strings.claim" />
        <ul class="career-outcomes__legend d--flex order--0 order--1@t fs--sm">
          <li v-for="(outcome, idx) in Object.values(dataSetWithAttributes).sort((a,b) => a.order - b.order)" :key="idx">
            <span class="career-outcomes__legend-perc" :style="{color: outcome.color}">{{ outcome.perc }}%</span> {{ outcome.key }}
          </li>
        </ul>
      </div>
    </div>
    <p class="career-outcomes__note fs--sm tc--gray-600" v-html="strings.note" />
  </section>
</template>
