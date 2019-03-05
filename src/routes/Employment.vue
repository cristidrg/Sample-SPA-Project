<script>
import stringData from '../strings.js';
import { countBy } from 'lodash';

export default {
  name: 'graduate',
  data() {
    return {
        strings: stringData.graduate,
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
  props: {
      schools: Array,
  },
}
</script>

<template>
    <section class="section graduate-data">
        <p class="graduate-data__title">{{ strings.title }}</p>
        <div class="graduate-data__banner">
            <p class="graduate-data__top" v-html="strings.top"></p>
            <ul class="graduate-data__top-list">
                <li class="fw--bold" v-for="(school, idx) in getSchoolsByPopularity.slice(0,5)" :key="idx">
                    {{ school.name }}
                </li>
            </ul>
        </div>
        <p class="graduate-data__header"> {{ strings.list_header }}</p>
        <ul class="graduate-data__list">
            <li v-for="(school, idx) in schoolsSortedByName" :key="idx">
                {{ school }}
            </li>
        </ul>
        <a class="graduate-data__button btn">{{ strings.list_button }}</a>
    </section>
</template>