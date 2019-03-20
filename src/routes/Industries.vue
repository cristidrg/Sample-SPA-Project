<script>
import stringData from '../strings.js';
import { countBy } from 'lodash';

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
            .map(entry => ({name: entry[0], percentage: new Number((100 * entry[1]) / total).toFixed(2)}))
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
};
</script>

<template>
  <section class="section industry-data">
    <header class="__header">
      <h2 class="__title">{{ strings.title }}</h2>
      <div class="__subtitle">{{ strings.subtitle }}</div>
    </header>

    <p class="industry-data__header"> {{ strings.list1_header }}</p>
    <ul class="industry-data__list --b-first">
      <li v-for="(industry, idx) in industriesSortedByPopularity" :key="idx">
        <span class="industry-data__perc">{{ industry.percentage }}%</span> {{ industry.name }}
      </li>
    </ul>

    <div class="industry-data__companies">
      <p class="industry-data__header"> {{ strings.list2_header }}</p>
      <ul class="industry-data__list">
        <li v-for="(company, idx) in companiesSortedByPopularity.slice(companyIdx * companyPageSize, (companyIdx + 1) * companyPageSize)" :key="idx">
          {{ company.name }}
        </li>
      </ul>
      <div class="industry-data__companies-nav">
        <a v-if="companyIdx != 0" v-on:click="companyIdx -= 1" class="industry-data__companies-navbtn btn tc--gray-700">{{strings.back_button}}</a>
        <a v-if="companyPageSize < companies.length && (companyIdx + 1) * companyPageSize < companies.length" v-on:click="companyIdx += 1" class="industry-data__companies-navbtn btn tc--gray-700">{{strings.next_button}}</a>
      </div>
    </div>
  </section>
</template>
