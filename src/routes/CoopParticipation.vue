<script>
import stringData from '../strings.js';
import { countBy } from 'lodash';

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

      return {
        total: Object.values(coopParticipation).reduce((a,b) => a + b, 0),
        ...coopParticipation
      };
    },
  },
  props: {
      coopNumbers: Array,
  },
}
</script>

<template>
    <section class="section coop-participation">
      <p class="coop-participation__title">{{ strings.title }}</p>
      <div class="row">
        <div class="col w--1/4@t">
          <p class="coop-participation__label">{{ strings.label1 }}</p>
          <p class="coop-participation__overall fs--d7 tc--red">{{ (getCoopParticipation.total - getCoopParticipation.NA) * 100 / getCoopParticipation.total }}%</p>
        </div>
        <div class="col w--3/4@t">
          
        </div>
      </div>
      
      <div class="row">
        <div class="col w--1/3@t">
          <p class="coop-participation__label">{{ strings.label2 }}</p>
          <p class="coop-participation__overall fs--d7 tc--red">{{ getCoopParticipation["3"] }}%</p>
        </div>
        <div class="col w--1/3@t">
          <p class="coop-participation__label">{{ strings.label3 }}</p>
          <p class="coop-participation__overall fs--d7 tc--red">{{ getCoopParticipation["2"] }}%</p>
        </div>
        <div class="col w--1/3@t">
          <p class="coop-participation__label">{{ strings.label4 }}</p>
          <p class="coop-participation__overall fs--d7 tc--red">{{ getCoopParticipation["1"] }}%</p>
        </div>
      </div>
    </section>
</template>