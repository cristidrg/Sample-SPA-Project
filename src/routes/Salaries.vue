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
        height: "700px",
        position: "relative"
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
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
              ticks: {
                fontColor: "#d41b2c",
                fontStyle: "bold",
                fontSize: 16
              }
          }]
        }
      },
      scaleLabel: {
        display: true,
        labelString: 'Percentage',
      },
    }
  },
  computed: {
    startingSalariesData() {
      const salaries = this.salaries
        .map(element => Math.floor((element % 100000) / 10000))
        .filter(element => !isNaN(element))
        .reduce((acc, curr) => {
          acc[curr] ? acc[curr] += 1 : acc[curr] = 1;
          return acc;
        }, {});

      const labels = Object.keys(salaries).map(digit => `${digit}0k < ${digit}9k`);
      labels[0] = '< 10k'

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