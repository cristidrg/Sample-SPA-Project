<script>
import { BarChart } from '../charts/';
import stringData from '../strings.js';
import { countBy } from 'lodash';
import NoData from '../components/NoData.vue';

const salariesToOrder = {
  "less than 30": 0,
  "30-39": 1,
  "40-49": 2,
  "50-59": 3,
  "60-69": 4,
  "more than 70": 5
};


export default {
  name: 'salaries',
  data() {
    return {
      strings: stringData.salaries,
      chartStyle: {
        width: "96%",
        height: "60vh",
        position: "relative",
        fontFamily: "'Lato', sans-serif"
      },
      salariesToOrder
    }
  },
  computed: {
    startingSalariesData() {
      const salaries = countBy(this.salaries);
      let map = {};

      Object.keys(salaries).forEach(key => {
        map[key] = {};
        map[key].value = salaries[key];
        map[key].key = key;
        map[key].order = salariesToOrder[key]
      });

      let salaryData = Object.values(map).sort((a,b) => a.order - b.order);

      return ({
        labels: salaryData.map(salary => salary.key).map(entry => {
          if (entry.split('-').length == 2) {
            return `$${entry.split('-')[0]}k - ${entry.split('-')[1]}k`
          } else {
            return `${entry.split(' ')[0]} ${entry.split(' ')[1]} $${entry.split(' ')[2]}k`
          }
        }),
        datasets: [{
            backgroundColor: '#d41b2c',
            data: salaryData.map(entry => entry.value),
        }]
      })
    },
    chartOptions() {
      return {
        plugins: {
          labels: {
            render: function (args) {
              return `${parseFloat(args.value / this.salaries.length * 100).toFixed(1)}%`;
            }.bind(this),
            fontColor: '#d41b2c',
            position: 'outside',
            fontSize: 18,
            fontStyle: "bold",
            overlap: true,
            textMargin: 8,
            display: true,
          }
        },
        borderWidth: "10px",
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
              fontSize: 0,
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
              fontSize: 12,
              display: true,
              padding: 10,
              autoSkip: false
            },
            scaleLabel: {
              display: true,
              fontColor: "red"
            }
          }],
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
      <div class="salaries__y-information">
        <p class="salaries__y-tick">100%</p>
        <p class="salaries__y-label tc--gray-800 fw--700 tt--caps fs--xs">{{strings.labelY}}</p>
      </div>
      <bar-chart :chartData="startingSalariesData" :styles="chartStyle" :options="chartOptions" />
    </div>
    <div class="ta--c tc--gray-800 fw--700 tt--caps fs--xs pt--0h">{{strings.labelX}}</div>
  </section>
  <no-data v-else/>
</template>
