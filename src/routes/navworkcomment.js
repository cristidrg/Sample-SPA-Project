/*
<script>
import stringData from '../strings.js';
import { countBy } from 'lodash';
import { routes } from '../main';
import { nextTick } from 'q';

export default {
  name: 'navigation',
  data() {
    return {
        strings: stringData.navigation,
        definedRoutes: routes.filter(element => !element.redirect).map(element => element.path),
        nextIdx: 0,
        backIdx: 0,
    }
  },
  mounted() {
    this.nextIdx = (this.definedRoutes.findIndex(element => element == this.$router.currentRoute.path) + 1) % (this.definedRoutes.length);
    let backIndex = this.definedRoutes.findIndex(element => element == this.$router.currentRoute.path) - 1;

    if (backIndex == -1) {
        backIndex = this.definedRoutes.length - 1;
    }
    this.backIdx = backIndex;
  },
  computed: {
      backText() {        
          let text = this.definedRoutes[this.backIdx].substring(1);
          text = text.charAt(0).toUpperCase() + text.slice(1);
          return text;
      },
      nextText() {
          let text = this.definedRoutes[this.nextIdx].substring(1);
          text = text.charAt(0).toUpperCase() + text.slice(1);
          return text;
      }
  },
  methods: {
      forward() {
          let nextRouteIdx = (this.definedRoutes.findIndex(element => element == this.$router.currentRoute.path) + 1) % (this.definedRoutes.length)

          this.$router.push(this.definedRoutes[nextRouteIdx])
          this.nextIdx = nextRouteIdx
          this.backIdx = nextRouteIdx - 1;
      },
      backward() {
          let backIndex = this.definedRoutes.findIndex(element => element == this.$router.currentRoute.path) - 1;
          let nextIdxVal = backIndex + 1;
          
          if (backIndex == -1) {
              backIndex = this.definedRoutes.length - 1;
              nextIdxVal = 1;
          }

          this.$router.push(this.definedRoutes[backIndex])
          this.backIdx = backIndex;
          this.nextIdx = nextIdxVal;
      }
  },
};
</script>

<template>
    <div class="route-navigator mt--4 pt--1h bw--0 bwt--1 bc--gray">
        <a class="fs--sm" v-on:click="backward()" v-scroll-to="'#app_content'">
            <i class="--thin" data-feather="chevron-left"></i> {{ backText }}
        </a>
        <a class="fs--sm" v-on:click="forward()" v-scroll-to="'#app_content'">
            {{ nextText }} <i class="--thin" data-feather="chevron-right"></i>
        </a>
    </div>
</template>
*/