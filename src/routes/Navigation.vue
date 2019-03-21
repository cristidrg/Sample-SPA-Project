<script>
import stringData from '../strings.js'
import { countBy } from 'lodash'
import { routes } from '../main'
import { nextTick } from 'q'

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
    this.backIdx = this.nextIdx - 2;

    if (this.backIdx < 0) {
        this.backIdx = this.definedRoutes.length - 1;
    }
  },
  watch:{
    $route (to, from){
        let navigatedPath = this.definedRoutes.findIndex(path => path == to.path);

        if (navigatedPath != -1) {
            this.nextIdx = navigatedPath + 1;
            this.backIdx = navigatedPath - 1;

            if (this.backIdx == -1) {
                this.backIdx = this.definedRoutes.length - 1
            } else if (this.nextIdx == this.definedRoutes.length) {
                this.nextIdx = 0;
            }
        }
    }
  },
  computed: {
      backText() {
          let text = this.definedRoutes[this.backIdx].substring(1);
          return text.charAt(0).toUpperCase() + text.slice(1).replace('-', ' ');
      },
      nextText() {
          let text = this.definedRoutes[this.nextIdx].substring(1);
          return text.charAt(0).toUpperCase() + text.slice(1).replace('-', ' ');
      }
  },
  methods: {
      forward() {
          this.$router.push(this.definedRoutes[this.nextIdx])
          this.nextIdx += 1;
          this.backIdx += 1;

          if (this.nextIdx == this.definedRoutes.length) {
              this.nextIdx = 0;
          } else if (this.backIdx == this.definedRoutes.length) {
              this.backIdx = 0;
          }
      },
      backward() {
          this.$router.push(this.definedRoutes[this.backIdx])
          this.backIdx -= 1;
          this.nextIdx -= 1;

          if (this.backIdx == -1) {
              this.backIdx = this.definedRoutes.length - 1;
          } else if (this.nextIdx == -1) {
              this.nextIdx = this.definedRoutes.length - 1;
          }
      }
  },
};
</script>

<template>
    <div class="route-navigator mt--4 pt--1h bw--0 bwt--1 bc--gray">
        <a class="fs--xs tt--caps tc--gray" v-on:click="backward()" v-scroll-to="'#app_content'">
            <i class="--thin" data-feather="chevron-left"></i> {{ backText }}
        </a>
        <a class="fs--xs tt--caps tc--gray" v-on:click="forward()" v-scroll-to="'#app_content'">
            {{ nextText }} <i class="--thin" data-feather="chevron-right"></i>
        </a>
    </div>
</template>
