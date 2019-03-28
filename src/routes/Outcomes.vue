<script>
import { PieChart } from '../charts/';
import stringData from '../strings.js';
import { countBy } from 'lodash';
import pattern from 'patternomaly';
import NoData from '../components/NoData.vue'

const outcomesToColors = {
  'Employed': {
    color: '#385775',
    order: 1
  },
  'In graduate school': {
    color: '#006eb5',
    order: 2
  },
  'Seeking employment': {
    color: '#00cfb5',
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
        width: '100%',
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
            right: 50,
            bottom: 5,
            left: 50
          }
        },
        plugins: {
          labels: {
            render: 'percentage',
            fontColor: '#000',
            position: 'outside',
            arc: false,
            outsidePadding: 2,
            fontSize: 12,
            textMargin: 4,
            precision: 1
          }
        },
        maintainAspectRatio: false,
      }
    }
  },
  computed: {
    sortedDataSet() {
      const counts = countBy(this.outcomes);
      let map = {}

      Object.keys(counts).forEach(key => {
        map[key] = Object.assign({}, outcomesToColors[key]);
        map[key].value = counts[key];
        map[key].key = key;
        map[key].perc = Number(parseFloat((counts[key] / this.outcomes.length) * 100).toFixed(1));
      });

      return Object.values(map).sort((a,b) => a.order - b.order);
    },
    claimStatistic() {
      let data = this.sortedDataSet;

      if (!data[0]) {
        data[0] = {perc: 0}
      }
      console.log(data);

      if (!data[1]) {
       data[1] = {perc: 0}
      }

      return parseFloat(data[0].perc + data[1].perc).toFixed(1);
    },
    careerOutcomesChartData() {
      const data = this.sortedDataSet;

      return ({
        labels: data.map(entry => entry.key),
        datasets: [{
            backgroundColor: data.map((entry, index) => {
              if (!this.contrast) {
                return entry.color;
              } else if (index % 2 == 0) {
                return entry.color;
              } else {
                return pattern.draw('line', entry.color);
              }
            }),
            data: data.map(entry => entry.value),
            borderWidth: 0,
        }]
      })
    },
  },
  props: {
    outcomes: Array,
    contrast: Boolean
  },
  components: {
    PieChart,
    'no-data': NoData
  }
};
</script>

<template>
  <section class="section career-outcomes" v-if="outcomes.length > 4" >
    <header class="__header">
      <h2 class="__title">{{ strings.title }}</h2>
      <div class="__subtitle">{{ strings.subtitle }}</div>
    </header>

    <div class="row">
      <div class="col w--70@t">
        <pie-chart :chartData="careerOutcomesChartData" :styles="outcomesStyle" :options="outcomesOptions"/>
      </div>
      <div class="col w--30@t d--flex justify--center">
        <div class="order--1 order--0@t ot--2@t ol--1@t mb--2@t pa--2 bg--gray-100">
          <div class="fs--d6 tc--red d--block mb--0h">{{ claimStatistic }}%</div> 
          {{ strings.claim }}
        </div>
        <ul class="career-outcomes__legend d--flex order--0 order--1@t fs--sm">
          <li v-for="(outcome, idx) in sortedDataSet" :key="idx">
            <span class="career-outcomes__legend-perc" :style="{color: outcome.color}"></span><b>{{ outcome.perc }}</b>% {{ outcome.key }}
          </li>
        </ul>
      </div>
    </div>
    <div class="career-outcomes__note fs--sm tc--gray-600 measure--wide" v-html="strings.note"/>
  </section>
  <no-data v-else />
</template>
