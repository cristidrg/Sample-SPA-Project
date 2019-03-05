<script>
import { Pie, mixins } from 'vue-chartjs'
import labels from 'chartjs-plugin-labels';
const { reactiveProp } = mixins;

export default {
  extends: Pie,
  mixins: [reactiveProp],
  name: 'pie',
  props: {
    chartData: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    options: {
      responsive: true,
      legend: {
        display: false
      },
      plugins: {
        labels: {
          render: 'value',
          fontColor: '#000',
          position: 'outside',
          fontSize: 20,
          textMargin: 16
        }
      }
    }
  }),

  mounted() {
    this.renderChart(this.chartData, this.options);
  },
}
</script>