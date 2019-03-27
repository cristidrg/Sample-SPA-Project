<script>
import { BarChart } from '../charts/';
import stringData from '../strings.js';
import { countBy } from 'lodash';
import NoData from '../components/NoData.vue';

export default {
  name: 'salaries',
  data() {
    return {
      strings: stringData.salaries,
      chartStyle: {
        width: "95%",
        height: "60vh",
        position: "relative",
        fontFamily: "'Lato', sans-serif"
      },
    }
  },
  computed: {
    startingSalariesData() {
      const salaries = this.salaries
        .map(element => Math.floor((element % 100000) / 10000))
        .filter(element => !isNaN(element))
        .reduce((acc, curr) => {
          if (curr < 3 && curr > 0) {
            acc[0] ? acc[0] += 1 : acc[0] = 1;
          } else if (curr > 7 || curr == 0){
            acc[8] ? acc[8] += 1 : acc[8] = 1;
          } else {
            acc[curr] ? acc[curr] += 1 : acc[curr] = 1;
          }
          return acc;
        }, {});

      const labels = Object.keys(salaries).map(digit => `\$${digit}0K - \$${digit}9K`);
      labels[0] = '< $30K';
      labels[labels.length - 1] = '> $80K';

      return ({
        labels: labels,
        datasets: [{
            backgroundColor: '#d41b2c',
            data: Object.values(salaries),
        }]
      })
    },
    chartOptions() {
      return {
        plugins: {
          labels: {
            render: function (args) {
              return args.value
            },
            fontColor: '#d41b2c',
            position: 'outside',
            fontSize: 18,
            fontStyle: "bold",
            textMargin: 8
          }
        },
        showDatapoints: true,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        layout: {
          padding: {
            top: 25
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: "#000000",
              fontSize: 12,
              beginAtZero: true,
              precision: 0,
              padding: 10,
              maxTicksLimit: 5,
            },
            offset: true,
          }],
          xAxes: [{
            offset: true,
            gridLines: {
              display: false,
            },
            ticks: {
              fontColor: "#000000",
              fontSize: 12
            }
          }]
        }
      }
    },
  },
  props: {
      salaries: Array,
  },
  components: {
    BarChart,
    NoData
  }
};
</script>

<template>
  <section class="section career-outcomes" v-if="salaries.length > 4">
    <header class="__header">
      <h2 class="__title">{{ strings.title }}</h2>
      <div class="__subtitle">{{ strings.subtitle }}</div>
    </header>

    <div class="d--flex">
      <p class="salaries__y-label tc--gray-800 fw--700 tt--caps fs--xs">{{strings.labelY}}</p>
      <bar-chart :chartData="startingSalariesData" :styles="chartStyle" :options="chartOptions" />
    </div>
    <div class="ta--c tc--gray-800 fw--700 tt--caps fs--xs pt--0h">{{strings.labelX}}</div>
  </section>
  <no-data v-else/>
</template>
