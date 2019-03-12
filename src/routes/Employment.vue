<script>
import { DoughnutChart } from '../charts/';
import stringData from '../strings.js';
import { countBy } from 'lodash';

export default {
  name: 'employment',
    data() {
      return {
        strings: stringData.employment,
        employmentStyle: {
          height: "70vh",
          width: "90%",
          position: "relative",
          margin: "0 auto"
        }
      }
  },
  computed: {
    dataSet() {
      return countBy(this.employmentTypes);
    },
    employmentStatusChartData() {
      const data = this.dataSet;

      return ({
        labels: Object.keys(data),
        datasets: [{
            backgroundColor: ['#d41b2c', '#a4804a', '#006eb5', '#000000', '#badb00', '#ff854f', '#824091', '#99a3b0', '#e5d4ab', '#385775'],
            data: Object.values(data),
            borderWidth: 2,
        }]
      })
    },
    centerText() {
      const fullTimePercentage = parseFloat((this.dataSet['Employed by an organization'] / this.employmentTypes.length) * 100).toFixed(0);

      return {
        elements: {
          center: {
            percentage: `${fullTimePercentage}%`,
            text: 'Full Time',
            color: '#d41b2c',
            sidePadding: 15
          }
        }
      };
    },
    chartOptions() {
      const options = Object.assign({}, {
          responsive: true,
          cutoutPercentage: 65,
          legend: {
            display: true,
            labels: {
                // This more specific font property overrides the global property
                fontColor: 'black',
            }
          },
          tooltips: {
            enabled: true
          },
          plugins: {
            labels: {
              render: function (args) {
                return;
              }
            }
          },
          maintainAspectRatio: false,
        }, this.centerText);
      return options;
    }
  },
  props: {
    employmentTypes: Array,
  },
  components: {
    DoughnutChart
  }
};

//The key component is a hack to force remount on the chart.
</script>

<template>
  <section class="section employment-status">
    <h2 class="section-title">{{ strings.title }}</h2>
    <div class="row">
      <div class="col w--70@t">
        <doughnut-chart :key="employmentTypes.length + employmentTypes[0]" :chartData="employmentStatusChartData" :style="employmentStyle" :options="chartOptions" />
      </div>
      <div class="col w--30@t">
        <p class="row career-outcomes__banner"><span class="fs--d5 tc--red mr--1 d--block">100%</span> Placeholder figure</p>
        <ul class="employment-status__legend">
          <li>Placeholder</li>
        </ul>
      </div>
    </div>
  </section>
</template>
