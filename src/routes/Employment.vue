<script>
import { DoughnutChart } from '../charts/';
import stringData from '../strings.js';
import { countBy } from 'lodash';

/*
Employed by an organization: 4513
Employed freelance: 22
Employed in a postgraduate internship or fellowship: 96
Employed in a temporary/contract work assignment: 184
Employed in all other work categories: 32
NA: 1535
Self-employed/ Entrepreneur

'#d41b2c', '#a4804a', '#006eb5', '#000000', '#badb00', '#ff854f', '#824091', '#99a3b0', '#e5d4ab', '#385775'
*/

const mappings = {
  'Employed by an organization': {
    key: 'Employed by an organization',
    color: '#d41b2c',
  },
  'Employed freelance': {
    key: 'Employed freelance',
    color: '#a4804a',
  },
  'Employed in a postgraduate internship or fellowship': {
    key: 'Employed in a postgraduate internship or fellowship',
    color: '#006eb5',
  },
  'Employed in a temporary/contract work assignment': {
    key: 'Employed in a temporary/contract work assignment',
    color: '#000000',
  },
  'Employed in all other work categories': {
    key: 'Employed in all other work categories',
    color: '#badb00',
  },
  'Self-employed/ Entrepreneur': {
    key: 'Self-employed/ Entrepreneur',
    color: '#ff854f',
  }
};

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
        },
        mappings: mappings
      }
  },
  computed: {
    dataSetWithColors() {
      const counts = countBy(this.employmentTypes);
      let map = this.mappings;

      Object.keys(counts).forEach(key => {
        map[key].value = counts[key]
        map[key].perc = parseFloat((counts[key] / this.employmentTypes.length) * 100).toFixed(2);
      });

      return map;
    },
    employmentStatusChartData() {
      const data = this.dataSetWithColors;

      return ({
        labels: Object.values(data).map(entry => entry.key),
        datasets: [{
            backgroundColor: Object.values(data).map(entry => entry.color),
            data: Object.values(data).map(entry => entry.value),
            borderWidth: 2,
        }]
      })
    },
    centerText() {
      const fullTimePercentage = parseFloat((this.dataSetWithColors['Employed by an organization'].value / this.employmentTypes.length) * 100).toFixed(2);

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
            display: false,
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

//The key prop for the <doughnut-chart /> is a hack to force remount on the chart
//because I couldn't figure out how to retrigger render on the centered text
//which is done via a manual plugin for the charts.
</script>

<template>
  <section class="section employment-status">
    <h2 class="section-title">{{ strings.title }}</h2>
    <div class="row">
      <div class="col w--70@t">
        <doughnut-chart :key="employmentTypes.length + employmentTypes[0]" :chartData="employmentStatusChartData" :style="employmentStyle" :options="chartOptions" />
      </div>
      <div class="col w--30@t">
        <p class="row career-outcomes__banner" v-html="strings.claim" />
        <ul class="employment-status__legend fs--sm">
          <li v-for="(data, index) in dataSetWithColors" :key="index" class="employment-status__legend-entry">
            &nbsp; <span class="employment-status__legend-perc" :style="{color: data.color}">{{ data.perc }}%</span> {{ data.key }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
