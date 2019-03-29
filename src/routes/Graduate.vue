<script>
import stringData from '../strings.js'
import { countBy } from 'lodash'
import NoData from '../components/NoData.vue'
import ChevronRight from '../components/ChevronRight.vue'
import ChevronLeft from '../components/ChevronLeft.vue'

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
    'no-data': NoData,
    'chevron-right': ChevronRight,
    'chevron-left': ChevronLeft
  },
};
</script>

<template>
  <section class="section" v-if="schools.length > 2">
    <header class="__header">
      <h2 class="__title">{{ strings.title }}</h2>
      <div class="__subtitle">{{ strings.subtitle }}</div>
    </header>
    <div class="graduate-data__banner" v-if="getSchoolsByPopularity.length > 4">
        <p class="graduate-data__top mb--0@t fs--sm w--40@d" v-html="strings.top"></p>
        <ul class="graduate-data__top-list">
            <li class="fw--700 fs--sm" v-for="(school, idx) in getSchoolsByPopularity.slice(0,5)" :key="idx">
                {{ school.name }}
            </li>
        </ul>
    </div>
    <div class="graduate-data pos--relative" v-if="getSchoolsByPopularity.length">
      <h3 class="graduate-data__header"><span class="d--block w--2/3 w--100@d">{{ strings.list_header }}</span></h3>
      <ul class="graduate-data__list" v-if="schoolsSortedByName.length > 2">
        <li v-for="(school, idx) in schoolsSortedByName.slice(schoolIdx * schoolPageSize, (schoolIdx + 1) * schoolPageSize)" :key="idx">
          {{ school }}
        </li>
      </ul>
      <div class="graduate-data__schools-nav">
        <a v-on:click="schoolIdx != 0 ? schoolIdx -= 1 : null" :class="`graduate-data__schools-navbtn btn --sm tc--gray-700 ${schoolIdx != 0 ? '' : 'bg--gray-500'}`">
          <chevron-left /><span class="sr--only">{{strings.back_button}}</span>
        </a>
        <a v-on:click="schoolPageSize < schoolsSortedByName.length && (schoolIdx + 1) * schoolPageSize < schoolsSortedByName.length ? schoolIdx += 1 : null" 
          :class="`graduate-data__schools btn --sm tc--gray-700
          ${schoolPageSize < schoolsSortedByName.length && (schoolIdx + 1) * schoolPageSize < schoolsSortedByName.length ? '' : 'bg--gray-500'}
          `">
          <chevron-right /><span class="sr--only">{{strings.next_button}}</span>
        </a>
      </div>
    </div>
    <no-data v-else />
  </section>
  <no-data v-else />
</template>
