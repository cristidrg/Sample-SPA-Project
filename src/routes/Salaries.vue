<script>
import { BarChart } from '../charts/';
import stringData from '../strings.js';
import { countBy } from 'lodash';
import NoData from '../components/NoData.vue';

const salariesToOrder = {
  "Less than $30K": 0,
  "$30K-$39K": 1,
  "$40K-$49K": 2,
  "$50K-$59K": 3,
  "$60K-$69K": 4,
  "$70K and more": 5
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
        labels: salaryData.map(salary => salary.key),
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
      <div class="__subtitle" v-html="strings.subtitle"></div>
    </header>

    <div class="d--flex">
      <p class="salaries__y-label tc--gray-800 fw--700 tt--caps fs--xs">{{strings.labelY}}</p>
      <bar-chart :chartData="startingSalariesData" :styles="chartStyle" :options="chartOptions" />
    </div>
    <div class="ta--c tc--gray-800 fw--700 tt--caps fs--xs pt--0h">{{strings.labelX}}</div>
    <div class="visuallyhidden">
      <ul>
        <li v-for="(label, index) in startingSalariesData.labels" :key="index">
          {{parseFloat(startingSalariesData.datasets[0].data[index] / salaries.length * 100).toFixed(1)}} percent made {{startingSalariesData.labels[index]}} 
        </li>
      </ul>
    </div>
  </section>
  <no-data v-else/>
</template>
