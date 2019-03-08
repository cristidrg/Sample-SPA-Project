<script>
import { DoughnutChart } from '../charts/';
import stringData from '../strings.js';
import { countBy } from 'lodash';

export default {
  name: 'employment',
    data() {
      return {
        strings: stringData.employment,
        chartStyle: {
          height: "800px",
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
            backgroundColor: ['#006eb5', '#badb00', '#d41b2c', '#ff854f', '#824091'],
            data: Object.values(data),
            borderWidth: 5,
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
            display: false
          },
          tooltips: {
            enabled: false
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
    <p class="employment-status__title">{{ strings.title }}</p>
    <div class="row">
      <div class="col w--70@t">
        <doughnut-chart :key="employmentTypes.length + employmentTypes[0]" :chartData="employmentStatusChartData" :style="chartStyle" :options="chartOptions" />
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