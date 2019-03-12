<script>
import stringData from '../strings.js';
import { countBy } from 'lodash';
import { routes } from '../main';

export default {
  name: 'navigation',
  data() {
    return {
        strings: stringData.navigation,
        definedRoutes: routes.filter(element => !element.redirect).map(element => element.path)
    }
  },
  methods: {
      forward() {
          let nextRouteIdx = (this.definedRoutes.findIndex(element => element == this.$router.currentRoute.path) + 1) % (this.definedRoutes.length)

          this.$router.push(this.definedRoutes[nextRouteIdx])
      },
      backward() {
          let nextRouteIdx = this.definedRoutes.findIndex(element => element == this.$router.currentRoute.path) - 1;

          if (nextRouteIdx == -1) {
              nextRouteIdx = this.definedRoutes.length - 1;
          }

          this.$router.push(this.definedRoutes[nextRouteIdx])
      }
  },
};
</script>

<template>
    <div class="route-navigator mt--4 pt--2 bw--0 bwt--1 bc--gray">
        <a class="fs--sm" v-on:click="backward()" v-scroll-to="'#app_content'">
            {{ strings.backward }}
        </a>
        <a class="fs--sm" v-on:click="forward()" v-scroll-to="'#app_content'">
            {{ strings.forward }}
        </a>
    </div>
</template>
