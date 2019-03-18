<script>
import { DoughnutChart } from '../charts/';
import stringData from '../strings.js';
import { countBy } from 'lodash';
import pattern from 'patternomaly';

const employmentToColors = {
  'Employed by an organization': '#d41b2c',
  'Employed freelance': '#a4804a',
  'Employed in a postgraduate internship or fellowship': '#006eb5',
  'Employed in a temporary/contract work assignment': '#000000',
  'Employed in all other work categories': '#badb00',
  'Self-employed/ Entrepreneur': '#ff854f',
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
      }
  },
  computed: {
    dataSetWithColors() {
      const counts = countBy(this.employmentTypes);
      console.log(counts);
      let map = {};

      Object.keys(counts).forEach(key => {
        map[key] = {};
        map[key].value = counts[key];
        map[key].key = key;
        map[key].perc = parseFloat((counts[key] / this.employmentTypes.length) * 100).toFixed(2);
        map[key].color = employmentToColors[key]
      });

      return map;
    },
    employmentStatusChartData() {
      const data = this.dataSetWithColors;

      return ({
        labels: Object.values(data).map(entry => entry.key),
        datasets: [{
            backgroundColor: Object.values(data).map((entry, index) => index % 2 == 0 ? entry.color : pattern.draw('line', entry.color)),
            data: Object.values(data).map(entry => entry.value),
            borderWidth: 2,
        }]
      })
    },
    centerPerc() {
      if (!this.dataSetWithColors['Employed by an organization']) {
        return 0;
      }
      return parseFloat((this.dataSetWithColors['Employed by an organization'].value / this.employmentTypes.length) * 100).toFixed(2);
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
      <div class="col w--70@t pos--relative d--table">
        <doughnut-chart :key="employmentTypes.length + employmentTypes[0]" :chartData="employmentStatusChartData" :style="employmentStyle" :options="chartOptions" />
        <p class="employment-status__chart-support fs--d6 tc--red">{{centerPerc}}%<br><span class="fs--d4 tc--black">{{strings.centerText}}</span></p>
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
