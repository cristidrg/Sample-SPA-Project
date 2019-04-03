<script>
import stringData from '../strings.js'

export default {
  name: 'citation',
  data() {
    return {
        strings: stringData.citation,
    }
  },
};
</script>

<template>
  <div>
    <hr>
    <p class="fs--sm tc--gray-700 measure--wide" v-html="strings.source"></p>
  </div>
</template>
