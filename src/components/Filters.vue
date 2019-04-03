<script>
import { ALL_COLLEGES, ALL_YEARS } from "../utils.js"
import strings from "../strings.js"
import Multiselect from "vue-multiselect"

export default {
    name: 'filters',
    data() {
        return {
            strings: strings.filters,
            loading: {
                year: false,
                college: false,
                majors: false
            },
            batchUpdate: {
                year: undefined,
                majors: undefined,
                college: undefined,
            },
            ALL_COLLEGES,
            ALL_YEARS,
        }
    },
    methods: {
        resetFilters(e) {
            this.$emit('reset')
        },
        updateFilter(name, value) {
            this.loading[name] = true;
            this.batchUpdate[name] = value;
        }
    },
    async updated() {
        if (this.batchUpdate.year) {
            // Add timeout to event loop stack to be sure vue has rendered the component
            await (new Promise(resolve => setTimeout(resolve, 50)));
            this.$emit(`update:activeYear`, this.batchUpdate.year);
        } else if (this.batchUpdate.college) {

            await (new Promise(resolve => setTimeout(resolve, 50)));
            this.$emit(`update:activeCollege`, this.batchUpdate.college);
        } else if (this.batchUpdate.majors) {

            await (new Promise(resolve => setTimeout(resolve, 50)));
            this.$emit(`update:activeMajors`, this.batchUpdate.majors);
        }
    },
    watch: {
        activeYear: function() {
            this.loading.year = false;
            this.batchUpdate.year = undefined;
        },
        activeCollege: function() {
            this.loading.college = false;
            this.batchUpdate.college = undefined;
        },
        activeMajors: function () {
            this.loading.majors = false;
            this.batchUpdate.majors = undefined;
        }
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
        <nav class="navigation px--1 px--0h@d pt--2h@d filter-menu ta--l@d"
            id="filter_menu"
            role="navigation"
            data-navigation-handle="#filter_menu_handle"
            data-navigation-content="#app_nav_buttons"
        >
            <div class="filter-menu__text mb--1">{{ strings.text }}</div>
            <div class="filter-menu__wrapper" tabIndex="0">
                <label for="year-filter" class="filter-menu__label">{{ strings.year }}</label>
                <multiselect @select="e => updateFilter('year', e)" 
                    :disabled="loading.year" 
                    :loading="loading.year" 
                    :class="activeYear != ALL_YEARS || loading.year ? 'multiselect--active' : '' " 
                    :value="activeYear" 
                    :options="validYears" 
                    :multiple="false" 
                    :allow-empty="true" 
                />
            </div>
            <div class="filter-menu__wrapper" tabIndex="0">
                <label for="college-filter" class="filter-menu__label">{{ strings.college }}</label>
                <multiselect @select="e => updateFilter('college', e)" 
                    :disabled="loading.college" 
                    :loading="loading.college" 
                    :class="activeCollege != ALL_COLLEGES || loading.college ? 'multiselect--active' : '' " 
                    :value="activeCollege" 
                    :options="validColleges" 
                    :multiple="false" 
                    :allow-empty="true" />
            </div>
            <div class="filter-menu__wrapper mb--2" tabIndex="0">
                <label for="major-filter" class="filter-menu__label">{{ strings.major }}</label>
                <multiselect @select="e => updateFilter('majors', [...activeMajors, e])"
                    @remove="e => updateFilter('majors', activeMajors.filter(major => major != e))"
                    :disabled="loading.majors" 
                    :loading="loading.majors"
                    :class="activeMajors.length > 0 || loading.majors ? 'multiselect--active' : ''"
                    :value="activeMajors"
                    :options="validMajors"
                    :multiple="true"
                    placeholder="All Disciplines" />
            </div>
            <a class="btn my--1 tt--caps filter-menu__apply bg--red br--pill hidden--up@d" href="#" v-scroll-to="'#app_content'">{{ strings.apply }}</a>
            <a v-if="areFiltersApplied" class="btn my--1 filter-menu__reset" tabIndex="0" v-on:keyup.enter="resetFilters" v-on:keyup.space="resetFilters" v-on:click="resetFilters" v-scroll-to="'#app_content'">{{ strings.reset }}</a>
            <div class="d--flex flex--middle bc--gray bwa--0 bwt--1 pt--1 mt--1" >
                <p class="ma--1 ml--0 fs--xs pt--0 fw--700">{{ strings.contrast }}</p>
                <toggle-button :value="contrast" @change="$emit('update:contrast', $event.value)" :color="{checked: '#d41b2c', unchecked: '#d0d0d0'}" :width=95 :height=25 :sync="true" :labels="{checked: strings.contrastOn, unchecked: strings.contrastOff}"/>
            </div>
        </nav>
    </div>
</template>
