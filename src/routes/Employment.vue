<script>
import { DoughnutChart } from '../charts/';
import stringData from '../strings.js';
import { countBy } from 'lodash';
import pattern from 'patternomaly';
import NoData from '../components/NoData.vue'

const employmentToColors = {
  'Employed full-time': {
    color: '#385775', // dark blue
    order: 1,
  },
  'Pursuing additional education': {
    color: '#52cfe5', // light blue
    order: 2,
  },
  'Employed part-time': {
    color: '#006eb5', // med blue
    order: 3,
  },
  'Participating in a volunteer or service program': {
    color: '#ffbf3d', // yellow
    order: 4,
  },
  'Currently not employed but seeking employment': {
    color: '#ff854f', // orange
    order: 5
  },
  'Currently not employed and not seeking employment': {
    color: '#824091', // purple
    order: 6,
  },
  'Serving in the U.S. military': {
    color: '#00cfb5', // teal
    order: 7,
  }
};

export default {
  name: 'employment',
    data() {
      return {
        strings: stringData.employment,
        employmentStyle: {
          height: '60vh',
          width: '97%',
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
        map[key].perc = parseFloat((counts[key] / this.employmentTypes.length) * 100).toFixed(1);
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
            borderWidth: 0,
        }]
      })
    },
    centerPerc() {
      if (!this.dataSetWithColors['Employed full-time']) {
        return 0;
      }
      return parseFloat((this.dataSetWithColors['Employed full-time'].value / this.employmentTypes.length) * 100).toFixed(1);
    },
    chartOptions() {
      const options = Object.assign({}, {
          responsive: true,
          cutoutPercentage: 65,
          legend: {
            display: false,
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                var total = meta.total;
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = parseFloat((currentValue/total*100).toFixed(1));
                return percentage + '%';
              },
              title: function(tooltipItem, data) {
                return data.labels[tooltipItem[0].index];
              }
            }
          },
          layout: {
            padding: {
              top: 5,
              right: 35,
              bottom: 5,
              left: 35
            }
          },
          plugins: {
            labels: {
              render: this.renderLabels,
              fontColor: '#000',
              position: 'outside',
              arc: false,
              outsidePadding: 2,
              fontSize: 12,
              textMargin: 4,
              precision: 1
            }
          },
          maintainAspectRatio: false,
        }, this.centerText);
      return options;
    }
  },
  methods: {
    renderLabels: function (args) {
      if (args.percentage < 3) {
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
    DoughnutChart,
    'no-data': NoData
  }
};

//The key prop for the <doughnut-chart /> is a hack to force remount on the chart
//because I couldn't figure out how to retrigger render on the centered text
//which is done via a manual plugin for the charts.
</script>

<template>
  <section class="section employment-status" v-if="employmentTypes.length > 4">
    <header class="__header">
      <h2 class="__title">{{ strings.title }}</h2>
      <div class="__subtitle">{{ strings.subtitle }}</div>
    </header>
    <div class="row">
      <div class="col w--70@t pos--relative d--table">
        <doughnut-chart :key="employmentTypes.length + employmentTypes[0]" :chartData="employmentStatusChartData" :style="employmentStyle" :options="chartOptions"/>
        <p class="employment-status__chart-support tc--blue-dark">{{centerPerc}}%<span class="tc--black">{{strings.centerText}}</span></p>
      </div>
      <div class="col w--30@t d--flex justify--center">
        <ul class="employment-status__legend w--100">
          <li v-for="(data, index) in Object.values(dataSetWithColors).sort((a,b) => a.order - b.order)" :key="index" class="employment-status__legend-entry" v-if="data.perc > 0">
            <span class="employment-status__legend-perc" :style="{color: data.color}"></span><b>{{ data.perc }}</b>% {{ data.key }}
          </li>
        </ul>
      </div>
    </div>
  </section>
  <no-data v-else />
</template>
