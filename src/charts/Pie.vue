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
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
}
</script>
