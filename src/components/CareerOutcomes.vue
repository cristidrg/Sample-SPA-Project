<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,

  data() {
    return {
      entries: [
        {label: 'Employed', color: '#FF0000'},
        {label: 'In Graduate School', color: '#C2C2C2'},
        {label: 'Seeking Employment', color: '#0000FF'}
      ],
    }
  },

  props: {
    values: {type: Array, required: true, validator: (arr) => arr.length == 3}
  },

  mounted () {
    this.renderChart({
      labels: this.entries.map(entry => entry.label),
      datasets: [{
          backgroundColor: this.entries.map(entry => entry.color),
          data: this.values,
      }]
    })
  }
}
</script>