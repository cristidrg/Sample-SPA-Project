<script>
import { DoughnutChart } from '../charts/';
import stringData from '../strings.js';
import { countBy } from 'lodash';
import pattern from 'patternomaly';

const employmentToColors = {
  'Employed by an organization': {
    color: '#d41b2c',
    order: 1,
  },
  'Employed freelance': {
    color: '#a4804a',
    order: 4,
  },
  'Employed in a postgraduate internship or fellowship': {
    color: '#006eb5',
    order: 2,
  },
  'Employed in a temporary/contract work assignment': {
    color: '#000000',
    order: 3,
  },
  'Employed in all other work categories': {
    color: '#385775',
    order: 5
  },
  'Self-employed/ Entrepreneur': {
    color: '#ff854f',
    order: 6,
  }
};

export default {
  name: 'employment',
    data() {
      return {
        strings: stringData.employment,
        employmentStyle: {
          height: '60vh',
          width: '90%',
          position: 'relative',
          margin: '0 auto'
        },
      }
  },
  computed: {
    dataSetWithColors() {
      const counts = countBy(this.employmentTypes);
      let map = {};

      Object.keys(counts).forEach(key => {
        map[key] = Object.assign({}, employmentToColors[key]);
        map[key].value = counts[key];
        map[key].key = key;
        map[key].perc = parseFloat((counts[key] / this.employmentTypes.length) * 100).toFixed(2);
      });

      return map;
    },
    employmentStatusChartData() {
      const data = Object.values(this.dataSetWithColors).sort((a,b) => a.order - b.order);

      return ({
        labels: data.map(entry => entry.key),
        datasets: [{
            backgroundColor: data.map((entry, index) => {
              if (!this.contrast) {
                return entry.color;
              } else if (index % 2 == 0) {
                return entry.color;
              } else {
                return pattern.draw('line', entry.color);
              }
            }),
            data: data.map(entry => entry.value),
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
              render: this.renderLabels,
              fontColor: '#000',
              position: 'outside',
              outsidePadding: 10,
              arc: true,
              fontSize: 14,
              textMargin: 10,
              precision: 2
            }
          },
          maintainAspectRatio: false,
        }, this.centerText);
      return options;
    }
  },
  methods: {
    renderLabels: function (args) {
      console.log(args);
      if (args.percentage < 1) {
        return '';
      } else {
        return args.percentage + '%';
      }
    }
  },
  props: {
    employmentTypes: Array,
    contrast: Boolean
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
    <header class="__header">
      <h2 class="__title">{{ strings.title }}</h2>
      <div class="__subtitle">{{ strings.subtitle }}</div>
    </header>
    <div class="row">
      <div class="col w--70@t pos--relative d--table">
        <doughnut-chart :key="employmentTypes.length + employmentTypes[0]" :chartData="employmentStatusChartData" :style="employmentStyle" :options="chartOptions" />
        <p class="employment-status__chart-support tc--red">{{centerPerc}}%<span class="tc--black">{{strings.centerText}}</span></p>
      </div>
      <div class="col w--30@t">
        <ul class="employment-status__legend fs--sm">
          <li v-for="(data, index) in Object.values(dataSetWithColors).sort((a,b) => a.order - b.order)" :key="index" class="employment-status__legend-entry">
            <span class="employment-status__legend-perc" :style="{color: data.color}">{{ data.perc }}%</span> {{ data.key }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
