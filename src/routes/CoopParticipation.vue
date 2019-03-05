<script>
import stringData from '../strings.js';
import { countBy } from 'lodash';

export default {
  name: 'graduate',
  data() {
    return {
        strings: stringData.graduate,
    }
  },
  computed: {
    schoolsSortedByName() {
        return [... new Set(this.schools)].sort()
    },

    getSchoolsByPopularity() {
        const schoolsToCount = countBy(this.schools);
        
        return Object.entries(schoolsToCount)
            .map(entry => ({name: entry[0], count: entry[1]}))
            .sort((a, b) => b.count - a.count);
    },
  },
  props: {
      schools: Array,
  },
}
</script>

<template>
    <section class="section coop-participation">
      <p class="coop-participation__title">{{ strings.coopParticipation.title }}</p>
      <div class="row">
        <div class="col w--1/4@t">
          <p class="coop-participation__label">{{ strings.coopParticipation.label1 }}</p>
          <p class="coop-participation__overall fs--d7 tc--red">{{ (getCoopParticipation.total - getCoopParticipation.NA) * 100 / getCoopParticipation.total }}%</p>
        </div>
        <div class="col w--3/4@t">
          
        </div>
      </div>
      
      <div class="row">
        <div class="col w--1/3@t">
          <p class="coop-participation__label">{{ strings.coopParticipation.label2 }}</p>
          <p class="coop-participation__overall fs--d7 tc--red">{{ getCoopParticipation["3"] }}%</p>
        </div>
        <div class="col w--1/3@t">
          <p class="coop-participation__label">{{ strings.coopParticipation.label3 }}</p>
          <p class="coop-participation__overall fs--d7 tc--red">{{ getCoopParticipation["2"] }}%</p>
        </div>
        <div class="col w--1/3@t">
          <p class="coop-participation__label">{{ strings.coopParticipation.label4 }}</p>
          <p class="coop-participation__overall fs--d7 tc--red">{{ getCoopParticipation["1"] }}%</p>
        </div>
      </div>
    </section>
</template>