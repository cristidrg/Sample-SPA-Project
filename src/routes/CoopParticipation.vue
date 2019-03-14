<script>
import stringData from '../strings.js';
import { countBy } from 'lodash';
import Person from '../assets/person-svg';
import $ from 'jquery'

export default {
  name: 'coopParticipation',
  data() {
    return {
        strings: stringData.coopParticipation
    }
  },
  computed: {
    getCoopParticipation() {
      const coopParticipation = Object.assign({},
        {"1": 0, "2":0, "3":0, "NA": 0},
        countBy(this.coopNumbers),
      );
      
      const totalNumber = Object.values(coopParticipation).reduce((a,b) => a + b, 0);
      const overallParticipation = parseFloat((totalNumber - coopParticipation.NA) * 100 / totalNumber).toFixed(2);

      Object.keys(coopParticipation).map(key => {
          coopParticipation[key] = parseFloat((coopParticipation[key] / totalNumber) * 100).toFixed(2)
      });

      return {
        totalNumber,
        overallParticipation,
        ...coopParticipation
      };
    },
  },
  props: {
    coopNumbers: Array,
  },
  components: {
    Person
  },
  mounted() {
    $(this.$refs.check).carousel()
  }
};
</script>

<template>
    <section class="section coop-participation">
      <h2 class="section-title">{{ strings.title }}</h2>
      <div class="row">
        <div class="col w--1/3@t">
          <p class="coop-participation__label">{{ strings.label1 }}</p>
          <p class="coop-participation__overall fs--d7 tc--red fw--700 fs--smooth">{{ getCoopParticipation.overallParticipation }}%</p>
        </div>
        <div class="col w--1/2@t">
            <div v-for="row in [0,1,2,3,4]" :key="row" class="coop-participation__human-row">
                <person v-for="column in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]"
                :key="column"
                :class="row * 20 + column > getCoopParticipation.overallParticipation ? 'user-gray --sm' : 'user-red --sm'"
                :v-html="getCoopParticipation.totalNumber"
                />
            </div>
        </div>
      </div>

      <div class="row mt--2h">
        <div class="col w--1/3@t">
          <p class="coop-participation__label">{{ strings.label2 }}</p>
          <p class="coop-participation__overall fs--d5 tc--red fw--700 fs--smooth">{{ getCoopParticipation["3"] }}%</p>
        </div>
        <div class="col w--1/3@t">
          <p class="coop-participation__label">{{ strings.label3 }}</p>
          <p class="coop-participation__overall fs--d5 tc--red fw--700 fs--smooth">{{ getCoopParticipation["2"] }}%</p>
        </div>
        <div class="col w--1/3@t">
          <p class="coop-participation__label">{{ strings.label4 }}</p>
          <p class="coop-participation__overall fs--d5 tc--red fw--700 fs--smooth">{{ getCoopParticipation["1"] }}%</p>
        </div>
      </div>

      <div class="carousel ta--c mt--3 mb--0" ref="check">
        <div class="card bg--gray-100 bs--none">
          <div class="__body">
            <p class="fs--d1 fw--300 tc--gray-600">&ldquo;{{ strings.carousel.testimonial_1_Text }}&rdquo;</p>
            <p class="fs--sm tc--gray-500"><i>{{ strings.carousel.testimonial_1_Name }}, {{ strings.carousel.testimonial_1_Company }}</i></p>
          </div>
        </div>
        <div class="card bg--gray-100 bs--none">
          <div class="__body">
            <p class="fs--d1 fw--300 tc--gray-600">&ldquo;{{ strings.carousel.testimonial_2_Text }}&rdquo;</p>
            <p class="fs--sm tc--gray-500"><i>{{ strings.carousel.testimonial_2_Name }}, {{ strings.carousel.testimonial_2_Company }}</i></p>
          </div>
        </div>
        <div class="card bg--gray-100 bs--none">
          <div class="__body">
            <p class="fs--d1 fw--300 tc--gray-600">&ldquo;{{ strings.carousel.testimonial_3_Text }}&rdquo;</p>
            <p class="fs--sm tc--gray-500"><i>{{ strings.carousel.testimonial_3_Name }}, {{ strings.carousel.testimonial_3_Company }}</i></p>
          </div>
        </div>
      </div>
    </section>
</template>
