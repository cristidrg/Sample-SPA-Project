<script>
import stringData from '../strings.js'
import { countBy } from 'lodash'
import Person from '../assets/person-svg'
import NoData from '../components/NoData.vue'
import $ from 'jquery'
import 'formstone/src/js/carousel'

export default {
  name: 'coopParticipation',
  data() {
    return {
      strings: stringData.coopParticipation,
      numberAnimationDuration: 1000,
    }
  },
  computed: {
    getCoopParticipation() {

      /**
       * Calculate student numbers per coops
       */
      const coopParticipation = Object.assign({},
        {"1": 0, "2":0, "3":0},
        countBy(this.coopNumbers),
      );

      const coopTotalCount = Object.assign({
        'Yes': '0',
        'No': '0'
      },
      countBy(this.coopTotal));


      /**
       * Check if we pass the minimum requirements, totalNumber > 0 and overallParticipation > 0
       */
      const totalNumber = Object.values(coopParticipation).reduce((a,b) => a + b, 0);
      if (totalNumber == 0) {
        return {
          totalNumber
        }
      }

      const overallParticipationTotal = Object.values(coopTotalCount).reduce((a,b) => a + b, 0);
      if (overallParticipationTotal == 0) {
        return {
          totalNumber,
          overallParticipationTotal
        }
      }

      /**
       * Compute percentanges
       */
      const overallParticipation = parseFloat((overallParticipationTotal - coopTotalCount.No) * 100 / overallParticipationTotal).toFixed(1);

      Object.keys(coopParticipation).map(key => {
          coopParticipation[key] = parseFloat((coopParticipation[key] / totalNumber) * 100).toFixed(1)
      });

      return {
        totalNumber,
        overallParticipation,
        ...coopParticipation
      };
    },
  },
  methods: {
    formatter: function (num) {
      return `${num.toFixed(1)}`
    },
  },
  watch: {
    getCoopParticipation: function(newVal, oldVal) {
      if (newVal.total == 0 || newVal.overallParticipation == 0) {
        return;
      }

      /**
       * These functions retrigger the animations on the number spins.
       */
      this.$refs.totalParticipationAnimator.reset(oldVal.overallParticipation, newVal.overallParticipation);
      this.$refs.threeCoops.reset(oldVal['3'], newVal['3']);
      this.$refs.twoCoops.reset(oldVal['2'], newVal['2']);
      this.$refs.oneCoop.reset(oldVal['1'], newVal['1']);

      this.$refs.totalParticipationAnimator.start();
      this.$refs.threeCoops.start();
      this.$refs.twoCoops.start();
      this.$refs.oneCoop.start();
    }
  },
  props: {
    coopNumbers: Array,
    coopTotal: Array
  },
  components: {
    Person,
    NoData
  },
  mounted() {
    $(this.$refs.check).carousel({
      theme: '',
      controls: false,
      autoHeight: true,
      infinite: true,
      single: true
    });
  }
};
</script>

<template>
    <section class="section coop-participation" v-if="getCoopParticipation.totalNumber != 0 && getCoopParticipation.overallParticipation != 0">
      <header class="__header mb--4">
        <h2 class="__title">{{ strings.title }}</h2>
        <div class="__subtitle" v-html="strings.subtitle"></div>
      </header>
      <div class="coop-participation-data">
        <div class="row">
          <div class="col w--1/3@t ta--c">
            <p class="coop-participation__label mb--0h" v-html="strings.label1"></p>
            <p class="coop-participation__overall tc--red fs--smooth">
              <animate-number
                :from="0"
                ref="totalParticipationAnimator"
                :to="getCoopParticipation.overallParticipation"
                :duration="numberAnimationDuration"
                easing="easeOutQuad"
                :formatter="formatter"
                class="fw--700"
              /><span class="tt--caps ml--0h">%</span>
            </p>
          </div>
          <div class="col w--2/3@t pl--4@d pr--4@d">
              <div v-for="row in [0,1,2,3,4]" :key="row" class="coop-participation__human-row">
                  <person v-for="column in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]"
                  :key="column"
                  :class="row * 20 + column > getCoopParticipation.overallParticipation ? 'user-gray --sm' : 'user-red --sm'"
                  :v-html="getCoopParticipation.totalNumber"
                  />
              </div>
          </div>
        </div>

        <div class="row mt--2h ta--c">
          <div class="col w--1/3@t">
            <p class="coop-participation__label mb--0h" v-html="strings.label2"><span class="hidden--up@d">:</span></p>
            <p class="coop-participation__overall fs--d5 tc--red fs--smooth mb--2 mb--0@d">
              <animate-number
                ref="threeCoops"
                mode="auto"
                :from="0"
                :to="getCoopParticipation['3']"
                :duration="numberAnimationDuration"
                easing="easeOutQuad"
                :formatter="formatter"
                class="fw--700"
              /><span class="tt--caps ml--0h">%</span>
            </p>
          </div>
          <div class="col w--1/3@t">
            <p class="coop-participation__label mb--0h" v-html="strings.label3"></p>
            <p class="coop-participation__overall fs--d5 tc--red fs--smooth mb--2 mb--0@d">
              <animate-number
                ref="twoCoops"
                :from="0"
                :to="getCoopParticipation['2']"
                :duration="numberAnimationDuration"
                easing="easeOutQuad"
                :formatter="formatter"
                class="fw--700"
              /><span class="tt--caps ml--0h">%</span>
            </p>
          </div>
          <div class="col w--1/3@t">
            <p class="coop-participation__label mb--0h" v-html="strings.label4"></p>
            <p class="coop-participation__overall fs--d5 tc--red fs--smooth mb--2 mb--0@d">
              <animate-number
                ref="oneCoop"
                :from="0"
                :to="getCoopParticipation['1']"
                :duration="numberAnimationDuration"
                easing="easeOutQuad"
                :formatter="formatter"
                class="fw--700"
              /><span class="tt--caps ml--0h">%</span>
            </p>
          </div>
        </div>
      </div>


      <div class="carousel ta--c mt--3 mb--0" ref="check">
        <div v-for="item in strings.carousel" class="mb--0 bg--gray-100 pa--2">
            <p class="fs--d1 fw--300 tc--gray-600">&ldquo;<span v-html="item.quote"></span>&rdquo;</p>
            <div class="measure mx--auto fs--sm tc--gray-500">
              <div class="fw--700" v-html="item.name"></div>
              <i><span v-html="item.coop"></span></i>
            </div>
          </div>
        </div>
      </div>
    </section>
    <no-data v-else/>
</template>
