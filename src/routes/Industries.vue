<script>
import stringData from '../strings.js'
import { countBy } from 'lodash'
import NoData from '../components/NoData.vue'
import ChevronRight from '../components/ChevronRight.vue'
import ChevronLeft from '../components/ChevronLeft.vue'

export default {
  name: 'industries',
  data() {
    return {
        strings: stringData.industry,
        companyIdx: 0,
        companyPageSize: 30
    }
  },
  computed: {
    companiesSortedByName() {
      return [...new Set(this.companies)].sort();
    },

    companiesSortedByPopularity() {
      const listOfCompanies = countBy(this.companies);

      const total = Object.values(listOfCompanies)
        .reduce((acc, curr) => acc + curr, 0);

      return Object.entries(listOfCompanies)
        .map(entry => ({name: entry[0], employees: entry[2]}))
        .sort((a,b) => b.employees - a.employees);
    },

    industriesSortedByPopularity() {
        const listOfIndustries = countBy(this.industries);

        const total = Object.values(listOfIndustries)
            .reduce((acc, curr) => acc + curr, 0);

        const result = Object.entries(listOfIndustries)
            .map(entry => ({name: entry[0], percentage: new Number((100 * entry[1]) / total).toFixed(1)}))
            .sort((a, b) => b.percentage - a.percentage)

        return result;
    },
  },
  watch: {
    companies: function(newVal, oldVal) {
      this.companyIdx = 0;
    }
  },
  props: {
      industries: Array,
      companies: Array,
  },
  components: {
      'no-data': NoData,
      'chevron-right': ChevronRight,
      'chevron-left': ChevronLeft
  }
};
</script>

<template>
  <section class="section industry-data" v-if="industriesSortedByPopularity.length > 4">
    <header class="__header">
      <h2 class="__title">{{ strings.title }}</h2>
      <div class="__subtitle" v-html="strings.subtitle"></div>
    </header>

    <h3 class="industry-data__header">{{ strings.list1_header }}</h3>
    <ul class="industry-data__list --b-first">
      <li v-for="(industry, idx) in industriesSortedByPopularity.slice(0, 12)" :key="idx">
        <span class="industry-data__perc">{{ industry.percentage }}%</span> {{ industry.name }}
      </li>
    </ul>

    <div class="industry-data__companies">
      <h3 class="industry-data__header"><span class="d--block w--2/3 w--100@d">{{ strings.list2_header }}</span></h3>
      <ul class="industry-data__list">
        <li v-for="(company, idx) in companiesSortedByName.slice(companyIdx * companyPageSize, (companyIdx + 1) * companyPageSize)" :key="idx">
          {{ company }}
        </li>
      </ul>
      <div class="industry-data__companies-nav">
        <button v-on:click="companyIdx != 0 ? companyIdx -= 1 : null" href="javascript:void(0)"
          class="`industry-data__companies-navbtn btn --sm" :disabled="companyIdx == 0" >
          <chevron-left /><span class="sr--only">{{strings.back_button}}</span>
        </button>
        <button v-on:click="companyPageSize < companiesSortedByName.length && (companyIdx + 1) * companyPageSize < companies.length ? companyIdx += 1 : null"
          href="javascript:void(0)"
          class="industry-data__companies-navbtn btn --sm"
          :disabled="(companyIdx+1)*companyPageSize > companiesSortedByName.length">
          <chevron-right /><span class="sr--only">{{strings.next_button}}</span>
        </button>
        <div aria-live="polite" aria-atomic="true" class="visuallyhidden">Page {{companyIdx + 1}} of {{Math.floor(companiesSortedByName.length / companyPageSize) + 1}}</div>
      </div>
    </div>
  </section>
  <no-data v-else />
</template>
