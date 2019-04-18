<script>
import { ALL_COLLEGES, ALL_YEARS } from "../utils.js"
import strings from "../strings.js"
import Multiselect from "vue-multiselect"
import SelectComponent from "vue-select"

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
            switch (name) {
                case 'year': {
                    if (this.activeYear == value) return;
                }
                case 'college': {
                    if (this.activeCollege == value) return;
                }
            }

            this.loading[name] = true;
            this.batchUpdate[name] = value;
        }
    },
    /**
     * The purpose of this function is to trigger a rerender on filter click.
     * Because we want to show a loader in the filter box after a filter was selected
     * we need to fire a has been clicked event which shows the loading bar and hide it
     * when the javascript computation finished and the new filters have been shown.
     * 
     * 
     * The flow goes like following:
     *  
     *  Initial Render #0:
     *  Click on year filter -> this.batchUpdate.year = newValue
     * 
     *  Render #1 - triggered by this.batchUpdate update:
     *  Render loading spinner, after render is done, updated() function runs.
     *  The component emits a change on the active filter data, held by the parent App.vue.
     *  App.vue changes its filter data and rerenders with a new computed field of filtered data.
     * 
     *  Render #2
     *  When App.vue updates the new filtered data, this component receives new props.
     *  The watch functions listens for changes in props and removes the bachUpdates when the new
     *  props come, resulting in the final rerender removing the loading spinner and showing the new data
     * 
     */
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
        SelectComponent
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
            <div class="filter-menu__wrapper" tabindex="0">
                <label for="year-filter" class="filter-menu__label">{{ strings.year }}</label>
                <select-component 
                    @input="e => updateFilter('year', e)" 
                    id="year-filter"
                    :class="`${activeYear != ALL_YEARS ? 'v-select--active' : ''}`"
                    :value="activeYear"
                    :clearable="false" 
                    :options="validYears"
                    :loading="loading.year"
                />
            </div>
            <div class="filter-menu__wrapper" tabindex="0">
                <label for="college-filter" class="filter-menu__label">{{ strings.college }}</label>
                <select-component
                    @input="e => updateFilter('college', e)" 
                    id="college-filter" 
                    :class="`${activeCollege != ALL_COLLEGES ? 'v-select--active' : ''}`"
                    :value="activeCollege" 
                    :options="validColleges"
                    :clearable="false" 
                    :loading="loading.college"
                />
            </div>
            <div class="filter-menu__wrapper mb--2" tabindex="0">
                <label for="major-filter" class="filter-menu__label">{{ strings.major }}</label>
                <select-component @input="e => updateFilter('majors', e)"
                    :loading="loading.majors"
                    :class="activeMajors.length > 0 || loading.majors ? 'multiselect multiselect--active' : 'multiselect'"
                    id="major-filter"
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
