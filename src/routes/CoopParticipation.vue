<script>
import stringData from '../strings.js';
import { countBy } from 'lodash';
import Person from '../assets/person-svg';

export default {
  name: 'coopParticipation',
  data() {
    return {
        strings: stringData.coopParticipation,
    }
  },
  computed: {
    getCoopParticipation() {
      const coopParticipation = countBy(this.coopNumbers)
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
  }
};
</script>

<template>
    <section class="section coop-participation">
      <p class="coop-participation__title">{{ strings.title }}</p>
      <div class="row">
        <div class="col w--1/3@t">
          <p class="coop-participation__label">{{ strings.label1 }}</p>
          <p class="coop-participation__overall fs--d7 tc--red fw--700 fs--smooth">{{ getCoopParticipation.overallParticipation }}%</p>
        </div>
        <div class="col w--2/3@t">
            <div v-for="row in [0,1,2,3,4]" :key="row" class="coop-participation__human-row">
                <person v-for="column in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]"
                :key="column" 
                :class="row * 20 + column > getCoopParticipation.overallParticipation ? 'user-gray' : 'user-red'"
                :v-html="getCoopParticipation.totalNumber"
                />
            </div>
        </div>
      </div>
      
      <div class="row mt--2h">
        <div class="col w--1/3@t">
          <p class="coop-participation__label">{{ strings.label2 }}</p>
          <p class="coop-participation__overall fs--d7 tc--red fw--700 fs--smooth">{{ getCoopParticipation["3"] }}%</p>
        </div>
        <div class="col w--1/3@t">
          <p class="coop-participation__label">{{ strings.label3 }}</p>
          <p class="coop-participation__overall fs--d7 tc--red fw--700 fs--smooth">{{ getCoopParticipation["2"] }}%</p>
        </div>
        <div class="col w--1/3@t">
          <p class="coop-participation__label">{{ strings.label4 }}</p>
          <p class="coop-participation__overall fs--d7 tc--red fw--700 fs--smooth">{{ getCoopParticipation["1"] }}%</p>
        </div>
      </div>
    </section>
</template>