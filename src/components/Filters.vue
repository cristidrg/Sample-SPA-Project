<script>
import { ALL_COLLEGES, ALL_YEARS } from "../utils.js"
import strings from "../strings.js"
import Multiselect from "vue-multiselect"

export default {
    name: 'filters',
    data() {
        return {
            strings: strings.filters,
            ALL_COLLEGES,
            ALL_YEARS
        }
    },
    methods: {
        resetFilters(e) {
            this.$emit('reset')
        },
    },
    props: {
        contrast: Boolean,
        activeYear: String,
        activeCollege: String,
        activeMajors: Array,
        validYears: Array,
        validColleges: Array,
        validMajors: Array,
        areFiltersApplied: Boolean
    },
    components: {
        Multiselect,
    }
};

</script>
<template>
    <div class="col w--1/4@d">
        <nav class="navigation px--1 pt--2h@d pt--3@w filter-menu ta--l@d"
            id="filter_menu"
            role="navigation"
            data-navigation-handle="#filter_menu_handle"
            data-navigation-content="#app_nav_buttons"
        >
            <div class="filter-menu__text mb--1">{{ strings.text }}</div>
            <div class="filter-menu__wrapper" tabIndex="0">
                <label for="year-filter" class="filter-menu__label">{{ strings.year }}</label>
                <multiselect @select="$emit('update:activeYear', $event)" :class="activeYear != ALL_YEARS ? 'multiselect--active' : '' " :value="activeYear" :options="validYears" :multiple="false" :allow-empty="true"></multiselect>
            </div>
            <div class="filter-menu__wrapper" tabIndex="0">
                <label for="college-filter" class="filter-menu__label">{{ strings.college }}</label>
                <multiselect @select="$emit('update:activeCollege', $event)"  :class="activeCollege != ALL_COLLEGES ? 'multiselect--active' : '' " :value="activeCollege" :options="validColleges" :multiple="false" :allow-empty="true"></multiselect>
            </div>
            <div class="filter-menu__wrapper mb--2" tabIndex="0">
                <label for="major-filter" class="filter-menu__label">{{ strings.major }}</label>
                <multiselect @select="$emit('update:activeMajors', [...activeMajors, $event])" @remove="$emit('update:activeMajors', activeMajors.filter(el => el != $event))" :class="activeMajors.length > 0 ? 'multiselect--active' : ''" :value="activeMajors" :options="validMajors" :multiple="true" placeholder="All majors"></multiselect>
            </div>
            <a class="btn my--1 tt--caps filter-menu__apply bg--red br--pill hidden--up@d" href="#" v-scroll-to="'#app_content'">{{ strings.apply }}</a>
            <a v-if="areFiltersApplied" class="btn my--1 filter-menu__reset" tabIndex="0" v-on:keyup.enter="resetFilters" v-on:keyup.space="resetFilters" v-on:click="resetFilters" v-scroll-to="'#app_content'">{{ strings.reset }}</a>
            <div class="d--flex flex--middle bc--gray bwa--0 bwt--1 pt--1 mt--1" >
                <p class="ma--1 ml--0 fs--xs pt--0 fw--700">{{ strings.contrast }}</p>
                <toggle-button :value="contrast" @change="$emit('update:contrast', $event.value)" :color="{checked: '#d41b2c', unchecked: '#5c5c5c'}" :width=95 :height=25 :sync="true" :labels="{checked: strings.contrastOn, unchecked: strings.contrastOff}"/>
            </div>
        </nav>
    </div>
</template>