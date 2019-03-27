<script>
import { countBy } from "lodash"
import { ALL_COLLEGES, ALL_YEARS, createArrayOfUniqueValues } from "./utils.js"
import Navigation from "./components/Navigation"
import { getAllData } from "./queries.js"
import stringData from "./strings.js"
import API from "./configs.js"
import feather from "feather-icons"
import { all } from 'q'
import SegmentNav from './components/SegmentNav.vue'
import Filters from './components/Filters.vue'

const DEFAULT_FILTERS = {
  activeYear: ALL_YEARS,
  activeCollege: ALL_COLLEGES,
  activeMajors: []
};

export default {
  name: "app",

  data() {
    return {
      isDataLoading: false,
      filters: Object.assign({}, DEFAULT_FILTERS),
      data: {
        dump: [],
        years: [],
        colleges: [],
        majors: []
      },
      strings: stringData,
      contrast: false,
      ALL_COLLEGES,
      ALL_YEARS,
      DEFAULT_FILTERS
    }
  },

  computed: {
    filteredData() {
      const {
        activeYear,
        activeCollege,
        activeMajors
      } = this.filters

      return this.filterData(
        activeYear,
        activeCollege,
        activeMajors
      )
    },

    getValidMajors() {
      return this.data.majors
        .filter(major => this.isFilterValid(major, 'major'))
        .sort()
    },

    getValidColleges() {
      return this.data.colleges
        .filter(college => this.isFilterValid(college, 'college'))
        .sort()
    },

    getValidYears() {
      return this.data.years.filter(year => this.isFilterValid(year, 'year'))
    },

    getOutcomes() {
      return this.filteredData
        .map(element => element.career_outcomes)
        .filter(element => element != "")
    },

    getEmploymentTypes() {
      return this.filteredData
        .map(element => element.employment_type)
        .filter(element => element != " " && element != "");
    },

    getSchools() {
      return this.filteredData
        .map(element => element.final_university)
        .filter(element => element != "NA" && element != "" & element != "#N/A");
    },

    getCoopNumbers() {
      return this.filteredData
        .map(element => element.final_coop_numbers)
        .filter(element => element != " " && element != "");
    },

    getCoopTotal() {
      return this.filteredData
        .map(element => element.final_did_coop)
        .filter(element => element != " " && element != "");
    },

    getIndustries() {
      return this.filteredData
        .map(element => element.final_industry)
        .filter(element => element != "" && element != "#N/A" && element != " ");
    },

    getCompanies() {
      return this.filteredData
        .map(element => element.final_companyname)
        .filter(element => element != "NA" && element != "")
    },

    getSalaries() {
      return this.filteredData
        .map(element => element.final_salary_recalculated)
        .filter(element => element != "NA" && element != "")
    },

    areFiltersApplied() {
      const {
        activeYear,
        activeCollege,
        activeMajors
      } = this.filters

      return activeMajors.length > 0 || activeYear != ALL_YEARS || activeCollege != ALL_COLLEGES;
    },

    getActiveFilters() {
      const {
        activeYear,
        activeCollege,
        activeMajors
      } = this.filters;

      let filters = {};

      if (activeYear != ALL_YEARS) {
        filters.year = {
          'key': 'year',
          'order': 1,
          'value': [activeYear]
        };
      }

      if (activeCollege != ALL_COLLEGES) {
        filters.college = {
          'key': 'college',
          'order': 2,
          'value': [activeCollege]
        }
      }

      if (activeMajors.length > 0) {
        filters.majors = {
          'key': 'majors',
          'order': 3,
          'value': activeMajors
        }
      }

      return Object.values(filters).sort((a, b) => a.order - b.order);
    }
  },

  mounted() {
    this.fetchData()
    feather.replace()
  },

  methods: {
    async fetchData() {
      this.isDataLoading = true
      try {
        let promises = [], results = [];

        //TODO: Make this nicer ^_^
        const call = (offset, max) => {
          return new Promise(async function(resolve, reject) {
            try {
              const res = await API.post("/", { query: getAllData(offset, max) });
              resolve(res);
            } catch (err) {
              reject(err);
            }
          });
        };

        for (let i = 0; i < 8; i++) {
            promises.push(call(i * 1000, (i+1) * 1000));
        }

        //Fires all the requests at the same time :)
        await Promise.all(promises).then(function() {
            for (let i = 0; i < 8; i++) {
              results = [...results, ...arguments[0][i].data.data.getGraduateDestinationPage];
            }
        }, function(err) {
            console.log(err);
        }).catch(err => console.error(err));

        const graduateDestinations = results;

        this.data = {
          years: [
            ALL_YEARS,
            ...createArrayOfUniqueValues("job_year", graduateDestinations)
          ],
          colleges: [
            ALL_COLLEGES,
            ...createArrayOfUniqueValues("collegedesc", graduateDestinations)
          ],
          majors: [
            ...createArrayOfUniqueValues("majordesc", graduateDestinations)
          ],
          dump: graduateDestinations
        }
      } catch (e) {
        console.error(e)
      }

      this.isDataLoading = false
    },

    filterData(yearFilter, collegeFilter, majorFilter) {
      return this.data.dump.filter(
        element =>
          (yearFilter == ALL_YEARS || element.job_year == yearFilter) &&
          (collegeFilter == ALL_COLLEGES || element.collegedesc == collegeFilter) &&
          (majorFilter.length == 0 || majorFilter.includes(element.majordesc))
      )
    },

    isFilterValid(filterValue, filterType) {
      let {
        activeYear,
        activeCollege,
        activeMajors
      } = this.filters

      if (activeMajors.length == 0 && activeYear == ALL_YEARS && activeCollege == ALL_COLLEGES) {
        return true
      }

      if (filterValue == activeYear || filterValue == activeCollege || activeMajors.includes(filterValue)) {
        return true;
      }

      switch (filterType) {
        case "major": {activeMajors = [filterValue]; break;}
        case "college": {activeCollege = filterValue; break;}
        case "year": {activeYear = filterValue; break;}
      }

      const filteredData = this.filterData(activeYear, activeCollege, activeMajors);

      switch (filterType) {
        case "major": return filteredData.length != 0;
        case "college": {
          return filteredData.length > 0 &&
            activeMajors.map(major => this.filterData(activeYear, activeCollege, [major]))
              .every((entry, i, arr) => entry == arr[0])
        }
        case "year": return filteredData.length != 0
      }
    },
  },

  components: {
    Navigation,
    Filters,
    'segment-nav': SegmentNav
  }
};
</script>

<template>
  <main id="app" :class="{ contrast: contrast }">
    <section class="section --flush py--0 vh--100" id="app_content">
      <section id="app_nav_menus">
        <segment-nav />
      </section>

      <div
        class="bg--black hidden--up@d ta--c d--flex justify--between pos--absolute pin--t w--100"
        id="app_nav_buttons"
      >
        <button class="btn __toggler mb--0 pa--1h" id="filter_menu_handle">
          Filter
        </button>
        <button class="btn __toggler mb--0 pa--1h" id="chart_menu_handle">
          Segments
        </button>
      </div>
      <div class="row mx--2@w">
        <filters 
          :activeYear.sync="filters.activeYear"
          :activeCollege.sync="filters.activeCollege"
          :activeMajors.sync="filters.activeMajors"
          :contrast.sync="contrast"
          :validYears="getValidYears"
          :validColleges="getValidColleges"
          :validMajors="getValidMajors"
          :areFiltersApplied="areFiltersApplied"
          v-on:reset="filters = Object.assign({}, DEFAULT_FILTERS)"
        />
        <div class="col w--3/4@d chart-content" id="app_data_views">
          <div class="row d--flex flex--middle vh--70" v-if="this.isDataLoading">
            <svg class="feather feather-loader spinner --thin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
          </div>
          <div v-else>
            <div class="hidden--up@d active-filters fs--xs mb--1 tc--gray-600" v-if="areFiltersApplied">
              <p class="active-filters__label d--inline">Filter:</p>
              <p class="d--inline" v-for="activeFilter in this.getActiveFilters" :key="activeFilter.order">
                <span class="active-filters__name d--inline">{{activeFilter.key}}:</span>
                <span class="active-filters__value d--inline">{{activeFilter.value.join(', ')}} </span>
              </p>
            </div>
            <transition
              name="fade"
              mode="out-in"
              >
              <router-view
                :schools="this.getSchools"
                :industries="this.getIndustries"
                :companies="this.getCompanies"
                :outcomes="this.getOutcomes"
                :salaries="this.getSalaries"
                :coopNumbers="this.getCoopNumbers"
                :coopTotal="this.getCoopTotal"
                :employmentTypes="this.getEmploymentTypes"
                :contrast="this.contrast"
                class="router-view"
              />
            </transition>
            <navigation/>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
