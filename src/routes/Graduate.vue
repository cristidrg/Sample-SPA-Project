<script>
import stringData from '../strings.js'
import { countBy } from 'lodash'
import NoData from '../components/NoData.vue'

export default {
  name: 'graduate',
  data() {
    return {
        strings: stringData.graduate,
        schoolIdx: 0,
        schoolPageSize: 30
    }
  },
  computed: {
    schoolsSortedByName() {
        return [... new Set(this.schools)].sort()
    },

    getSchoolsByPopularity() {
        const schoolsToCount = countBy(this.schools);

        return Object.entries(schoolsToCount)
            .map(entry => ({name: entry[0], count: entry[1]}))
            .sort((a, b) => b.count - a.count);
    },
  },
  watch: { 
    schools: function(newVal, oldVal) {
      this.schoolIdx = 0;
    }
  },
  props: {
      schools: Array,
  },
  components: {
      'no-data': NoData
  },
};
</script>

<template>
  <section class="section">
    <header class="__header">
      <h2 class="__title">{{ strings.title }}</h2>
      <div class="__subtitle">{{ strings.subtitle }}</div>
    </header>
    <div class="graduate-data__banner">
        <p class="graduate-data__top mb--0 fs--sm" v-html="strings.top"></p>
        <ul class="graduate-data__top-list">
            <li class="fw--700 fs--sm" v-for="(school, idx) in getSchoolsByPopularity.slice(0,5)" :key="idx">
                {{ school.name }}
            </li>
        </ul>
    </div>
    <div class="graduate-data">
      <h3 class="graduate-data__header">{{ strings.list_header }}</h3>
      <ul class="graduate-data__list" v-if="getSchoolsByPopularity.length">
        <li v-for="(school, idx) in getSchoolsByPopularity.slice(schoolIdx * schoolPageSize, (schoolIdx + 1) * schoolPageSize)" :key="idx">
          {{ school.name }}
        </li>
      </ul>
      <no-data v-else />
      <div class="graduate-data__schools-nav">
        <a v-if="schoolIdx != 0" v-on:click="schoolIdx -= 1" class="graduate-data__schools-navbtn btn --sm tc--gray-700">{{strings.back_button}}</a>
        <a v-if="schoolPageSize < getSchoolsByPopularity.length && (schoolIdx + 1) * schoolPageSize < getSchoolsByPopularity.length" v-on:click="schoolIdx += 1" class="graduate-data__schools btn --sm tc--gray-700">{{strings.next_button}}</a>
      </div>
    </div>
  </section>
</template>
