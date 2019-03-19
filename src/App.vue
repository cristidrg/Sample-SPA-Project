<script>
import { countBy } from "lodash"
import { ALL, createArrayOfUniqueValues } from "./utils.js"
import { Navigation } from "./routes/"
import { getAllData } from "./queries.js"
import stringData from "./strings.js"
import API from "./configs.js"
import feather from "feather-icons"
import Multiselect from "vue-multiselect";
import { all } from 'q';

export default {
  name: "app",

  data() {
    return {
      isDataLoading: false,
      filters: {
        activeYear: ALL,
        activeCollege: ALL,
        activeMajors: []
      },
      data: {
        dump: [],
        years: [],
        colleges: [],
        majors: []
      },
      strings: stringData,
      ALL: ALL
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
      return this.data.majors.filter(major => this.isFilterValid(major, 'major'))
    },

    getValidColleges() {
      return this.data.colleges.filter(college => this.isFilterValid(college, 'college'))
    },

    getOutcomes() {
      return this.filteredData
        .map(element => element.career_outcomes)
        .filter(element => element != " ")
    },

    getEmploymentTypes() {
      return this.filteredData
        .map(element => element.employment_type)
        .filter(element => element != " " && element != "");
    },

    getSchools() {
      return this.filteredData
        .map(element => element.final_university)
        .filter(element => element != "NA" && element != "#N/A");
    },

    getCoopNumbers() {
      return this.filteredData
        .map(element => element.final_coop_numbers)
        .filter(element => element != " " && element != "");
    },

    getCoopTotal() {
      return this.filteredData
        .map(element => element.final_did_coop)
        .filter(element => element != " ");
    },

    getIndustries() {
      return this.filteredData
        .map(element => element.final_industry)
        .filter(element => element != "" && element != "#N/A");
    },

    getCompanies() {
      return this.filteredData
        .map(element => element.final_companyname)
        .filter(element => element != "NA")
    },

    getSalaries() {
      return this.filteredData
        .map(element => element.final_salary_recalculated)
        .filter(element => element != "NA")
    },

    areFiltersApplied() {
      const {
        activeYear,
        activeCollege,
        activeMajors
      } = this.filters

      return activeMajors.length > 0 || activeYear != ALL || activeCollege != ALL;
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
        });

        const graduateDestinations = results;

        this.data = {
          years: [
            ALL,
            ...createArrayOfUniqueValues("job_year", graduateDestinations)
          ],
          colleges: [
            ALL,
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
          (yearFilter == ALL || element.job_year == yearFilter) &&
          (collegeFilter == ALL || element.collegedesc == collegeFilter) &&
          (majorFilter.length == 0 || majorFilter.includes(element.majordesc))
      )
    },

    resetFilters() {
      this.filters = {
        activeYear: ALL,
        activeCollege: ALL,
        activeMajors: []
      }
    },

    isFilterValid(filterValue, filterType) {
      let {
        activeYear,
        activeCollege,
        activeMajors
      } = this.filters

      if (activeMajors.length == 0 && activeYear == ALL && activeCollege == ALL) {
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
    }
  },

  components: {
    Navigation,
    Multiselect
  }
};
</script>

<template>
  <main id="app">
    <section
      class="section --hero vh--100 bg--img flex--middle"
      style="background-image: url(//facts.northeastern.edu/assets/images/16x9-campus.jpg);"
      role="banner"
    >
      <div class="__header">
        <h1 class="__title fs--d3 mb--1">
          {{ strings.head.title }}
        </h1>
        <div class="__subtitle mb--2">{{ strings.head.copy }}</div>
        <a
          class="btn bg--red"
          v-scroll-to="'#app_content'"
          href="#/outcomes"
        >{{ strings.head.cta }}</a>
      </div>
    </section>

    <section class="section pa--0 ta--l vh--100" id="app_content">
      <section id="app_nav_menus">
        <nav
          class="navigation"
          id="chart_menu"
          role="navigation"
          data-navigation-handle="#chart_menu_handle"
          data-navigation-content="#app_nav_buttons"
        >
          <div class="chart-menu nav bg--gray-800">
            <p class="my--2 chart-menu__text hidden--up@d">Browse by:</p>
            <ul class="__list">
                <li class="__item">
                  <router-link class="__link" to="/outcomes" v-scroll-to="'#app_content'">Career outcomes</router-link>
                </li>
                <li class="__item">
                  <router-link class="__link" to="/employment-status" v-scroll-to="'#app_content'">Employment status</router-link>
                </li>
                <li class="__item">
                  <router-link class="__link" to="/coop-participation" v-scroll-to="'#app_content'">Co-op participation</router-link>
                </li>
                <li class="__item">
                  <router-link class="__link" to="/industries" v-scroll-to="'#app_content'">By industry/company</router-link>
                </li>
                <li class="__item">
                  <router-link class="__link" to="/graduate-outcomes" v-scroll-to="'#app_content'">By graduate school</router-link>
                </li>
                <li class="__item">
                  <router-link class="__link" to="/salaries" v-scroll-to="'#app_content'">Starting salaries</router-link>
                </li>
            </ul>
          </div>
        </nav>
      </section>

      <div
        class="bg--black hidden--up@d ta--c d--flex justify--between pos--absolute pin--t w--100"
        id="app_nav_buttons"
      >
        <button class="btn --sm __toggler mb--0 pa--1h" id="filter_menu_handle">
          Filter
        </button>
        <button class="btn --sm __toggler mb--0 pa--1h" id="chart_menu_handle">
          Browse
        </button>
      </div>
      <div class="row">
        <div class="col w--20@d">
          <nav
            class="navigation pa--1 filter-menu ta--l@d"
            id="filter_menu"
            role="navigation"
            data-navigation-handle="#filter_menu_handle"
            data-navigation-content="#app_nav_buttons"
          >
            <p class="my--1 filter-menu__text">{{ strings.filters.text }}</p>
            <div class="filter-menu__wrapper">
              <label for="year-filter" class="filter-menu__label">{{ strings.filters.year }}</label>
              <select v-model="filters.activeYear" id="year-filter" :class="`filter-menu__select ${filters.activeYear != ALL && '--active'}`">
                 <option
                  v-for="year in data.years"
                  :value="year"
                  :key="year"
                  :disabled="!isFilterValid(year, 'year')"
                >{{ year }}</option>
              </select>
            </div>
            <div class="filter-menu__wrapper">
              <label for="college-filter" class="filter-menu__label">{{ strings.filters.college }}</label>
              <select v-model="filters.activeCollege" id="college-filter" :class="`filter-menu__select ${filters.activeCollege != ALL && '--active'}`">
                <option
                  v-for="college in getValidColleges"
                  :value="college"
                  :key="college"
                >{{ college }}</option>
              </select>
            </div>
            <div class="filter-menu__wrapper mb--2">
              <label for="major-filter" class="filter-menu__label">{{ strings.filters.major }}</label>
              <multiselect v-model="filters.activeMajors" :options="getValidMajors" :multiple="true"></multiselect>
            </div>
            <a class="btn my--1 tt--caps filter-menu__apply bg--white hidden--up@d" href="#">{{ strings.filters.apply }}</a>
            <a v-if="areFiltersApplied" class="btn tc--gray-700 filter-menu__reset" v-on:click="resetFilters()">{{ strings.filters.reset }}</a>
          </nav>

        </div>
        <div class="col w--80@d w--70@w ml--3@w chart-content" id="app_data_views">
          <div class="row d--flex justify--center mt--5" v-if="this.isDataLoading">
            <svg class="feather feather-loader spinner" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
          </div>
          <router-view
            :schools="this.getSchools"
            :industries="this.getIndustries"
            :companies="this.getCompanies"
            :outcomes="this.getOutcomes"
            :salaries="this.getSalaries"
            :coopNumbers="this.getCoopNumbers"
            :coopTotal="this.getCoopTotal"
            :employmentTypes="this.getEmploymentTypes"
            v-else
          />
          <navigation/>
        </div>
      </div>
    </section>
  </main>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
