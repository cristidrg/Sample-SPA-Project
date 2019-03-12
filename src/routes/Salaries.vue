<script>
import { BarChart } from '../charts/';
import stringData from '../strings.js';
import { countBy } from 'lodash';

export default {
  name: 'salaries',
  data() {
    return {
      strings: stringData.salaries,
      chartStyle: {
        height: "70vh",
        position: "relative",
        fontFamily: "'Lato', sans-serif"
      },
      chartOptions: {
        plugins: {
          labels: {
            render: function (args) {
              const total = args.dataset.data.reduce((prev, curr) => prev + curr, 0);
              return parseFloat((args.value / total) * 100).toFixed(0) + '%';
            },
            fontColor: '#d41b2c',
            position: 'outside',
            fontSize: 20,
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
        scales: {
          yAxes: [{
              ticks: {
                fontStyle: "bold",
                fontColor: "black",
                fontSize: 16,
                padding: 10
              }
          }],
          xAxes: [{
            gridLines: {
              display: false,
            },
            ticks: {
              fontColor: "#d41b2c",
              fontStyle: "bold",
              fontSize: 16
            }
          }]
        }
      },
    }
  },
  computed: {
    startingSalariesData() {
      const salaries = this.salaries
        .map(element => Math.floor((element % 100000) / 10000))
        .filter(element => !isNaN(element))
        .reduce((acc, curr) => {
          if (curr < 3) {
            acc[0] ? acc[0] += 1 : acc[0] = 1;
          } else if (curr > 7){
            acc[8] ? acc[8] += 1 : acc[8] = 1;
          } else {
            acc[curr] ? acc[curr] += 1 : acc[curr] = 1;
          }
          return acc;
        }, {});

      const labels = Object.keys(salaries).map(digit => `${digit}0k < ${digit}9k`);
      labels[0] = '< 30k';
      labels[labels.length - 1] = '> 80k';

      return ({
        labels: labels,
        datasets: [{
            backgroundColor: '#d41b2c',
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
    <div>
      <p class="salaries__title">{{ strings.title }}</p>
      <bar-chart :chartData="startingSalariesData" :styles="chartStyle" :options="chartOptions" />
    </div>
</template>