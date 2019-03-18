<script>
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
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
  watch: {
    options () {
      this.renderChart(this.chartData, this.options);
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
}
</script>