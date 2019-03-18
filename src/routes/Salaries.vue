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
        width: "95%",
        minHeight: "800px",
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
          if (curr < 3) {
            acc[0] ? acc[0] += 1 : acc[0] = 1;
          } else if (curr > 7){
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
                fontStyle: "bold",
                fontColor: "black",
                fontSize: 14,
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
              fontColor: "#d41b2c",
              fontStyle: "bold",
              fontSize: 13
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
    BarChart
  }
};
</script>

<template>
    <div>
      <h2 class="section-title">{{ strings.title }}</h2>
      <div class="d--flex">
        <p class="salaries__y-label">{{strings.labelY}}</p>
        <bar-chart :chartData="startingSalariesData" :styles="chartStyle" :options="chartOptions" />
      </div>
      <p class="ta--c tc--red">{{strings.labelX}}</p>
    </div>
</template>
