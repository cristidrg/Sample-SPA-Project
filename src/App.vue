<script>
import { countBy } from "lodash"
import { ALL, createArrayOfUniqueValues } from "./utils.js"
import { Navigation } from "./routes/"
import { getAllData } from "./queries.js"
import stringData from "./strings.js"
import API from "./configs.js"
import feather from "feather-icons"

export default {
  name: "app",

  data() {
    return {
      isDataLoading: false,
      filters: {
        activeYear: ALL,
        activeSTDLVL: ALL,
        activeCollege: ALL,
        activeMajor: ALL
      },
      data: {
        dump: [],
        years: [],
        stdntLevels: [],
        colleges: [],
        majors: []
      },
      strings: stringData
    }
  },

  computed: {
    filteredData() {
      const {
        activeYear,
        activeSTDLVL,
        activeCollege,
        activeMajor
      } = this.filters

      return this.filterData(
        activeYear,
        activeSTDLVL,
        activeCollege,
        activeMajor
      )
    },

    getOutcomes() {
      return this.filteredData
        .map(element => element.employment_status)
        .filter(element => element != "NA")
    },

    getEmploymentTypes() {
      return this.filteredData.map(element => element.employment_type)
    },

    getSchools() {
      return this.filteredData
        .map(element => element.final_university)
        .filter(element => element != "NA");
    },

    getCoopNumbers() {
      return this.filteredData.map(
        element => element.final_coop_numbers.split(" ")[0]
      )
    },

    getIndustries() {
      return this.filteredData
        .map(element => element.final_industry)
        .filter(element => element != "Not Known")
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
          stdntLevels: [
            ALL,
            ...createArrayOfUniqueValues("student_level", graduateDestinations)
          ],
          colleges: [
            ALL,
            ...createArrayOfUniqueValues("collegedesc", graduateDestinations)
          ],
          majors: [
            ALL,
            ...createArrayOfUniqueValues("majordesc", graduateDestinations)
          ],
          dump: graduateDestinations
        }
      } catch (e) {
        console.error(e)
      }
      this.isDataLoading = false
    },

    filterData(yearFilter, studentFilter, collegeFilter, majorFilter) {
      return this.data.dump.filter(
        element =>
          (yearFilter == ALL || element.job_year == yearFilter) &&
          (studentFilter == ALL || element.student_level == studentFilter) &&
          (collegeFilter == ALL || element.collegedesc == collegeFilter) &&
          (majorFilter == ALL || element.majordesc == majorFilter)
      )
    },

    resetFilters() {
      this.filters = {
        activeYear: ALL,
        activeSTDLVL: ALL,
        activeCollege: ALL,
        activeMajor: ALL
      }
    },

    isFilterValid(filterValue, filterType) {
      const {
        activeYear,
        activeSTDLVL,
        activeCollege,
        activeMajor
      } = this.filters

      if ([activeYear, activeSTDLVL, activeCollege, activeMajor].every(el => el == ALL)) {
        return true
      }

      switch (filterType) {
        case "major":
          return (
            this.filterData(
              activeYear,
              activeSTDLVL,
              activeCollege,
              filterValue
            ).length != 0
          )
        case "college":
          return (
            this.filterData(activeYear, activeSTDLVL, filterValue, activeMajor)
              .length != 0
          )
        case "student":
          return (
            this.filterData(activeYear, filterValue, activeCollege, activeMajor)
              .length != 0
          )
        case "year":
          return (
            this.filterData(
              filterValue,
              activeSTDLVL,
              activeCollege,
              activeMajor
            ).length != 0
          )
      }
    }
  },

  components: {
    Navigation
  }
};
</script>

<template>
  <main id="app">
    <section
      class="section --banner vh--100 bg--img"
      style="background-image: url(//facts.northeastern.edu/assets/images/16x9-campus.jpg);"
      role="banner"
    >
      <div class="d--flex flex--col justify--around mx--auto">
        <div class="__header pa--1 mt--1 ta--c measure--wide">
          <h1 class="__title fs--d3 mb--1">
            {{ strings.head.title }}
          </h1>
          <p class="__subtitle fs--sm lh--loose mb--2">{{ strings.head.copy }}</p>
          <a
            class="btn bg--red" 
            v-scroll-to="'#app_content'" 
            href="#/outcomes" 
          >{{ strings.head.cta }}</a>
        </div>
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
                  <router-link class="__link" to="/outcomes" v-scroll-to="'#app_content'">Career Outcomes</router-link>
                </li>
                <li class="__item">
                  <router-link class="__link" to="/employment-status" v-scroll-to="'#app_content'">Employment Status</router-link>
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
        class="bg--black hidden--up@d ta--c pa--1 d--flex justify--between pos--absolute pin--t w--100"
        id="app_nav_buttons"
      >
        <button class="btn --sm __toggler" id="filter_menu_handle">
          <i data-feather="align-left"></i>
          Filter
        </button>
        <button class="btn --sm __toggler" id="chart_menu_handle">
          <i data-feather="align-left"></i>
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
              <select v-model="filters.activeYear" id="year-filter" class="filter-menu__select">
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
              <select v-model="filters.activeCollege" id="college-filter" class="filter-menu__select">
                <option
                  v-for="college in data.colleges"
                  :value="college"
                  :key="college"
                  :disabled="!isFilterValid(college, 'college')"
                >{{ college }}</option>
              </select>
            </div>
            <div class="filter-menu__wrapper">
              <label for="major-filter" class="filter-menu__label">{{ strings.filters.major }}</label>
              <select v-model="filters.activeMajor" id="major-filter" class="filter-menu__select">
                <option
                  v-for="major in data.majors"
                  :value="major"
                  :key="major"
                  :disabled="!isFilterValid(major, 'major')"
                >{{ major }}</option>
              </select>
            </div>
            <a class="btn filter-menu__reset bg--white-alpha" v-on:click="resetFilters()">{{ strings.filters.reset }}</a>
          </nav>
          
        </div>
        <div class="col w--80@d w--70@w ml--3@w chart-content" id="app_data_views">
          <router-view
            :schools="this.getSchools"
            :industries="this.getIndustries"
            :companies="this.getCompanies"
            :outcomes="this.getOutcomes"
            :salaries="this.getSalaries"
            :coopNumbers="this.getCoopNumbers"
            :employmentTypes="this.getEmploymentTypes"
          />
          <navigation/>
        </div>
      </div>
    </section>
  </main>
</template>
