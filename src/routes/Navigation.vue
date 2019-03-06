<script>
import stringData from '../strings.js';
import { countBy } from 'lodash';
import { routes } from '../main';

export default {
  name: 'navigation',
  data() {
    return {
        strings: stringData.navigation,
        currentRoute: 0,
        routes: routes.map(element => element.path)
    }
  },
  methods: {
      forward() {
          this.$router.push(routes[this.currentRoute + 1])
          this.currentRoute += 1;
      },
      backward() {
          this.$router.push(routes[this.currentRoute - 1])
          this.currentRoute -= 1;
      }
  },
  mounted() {
      this.currentRoute = this.routes.findIndex(route => route == this.$router.currentRoute.path);
  }
}
</script>

<template>
    <div>
        <a class="btn" v-on:click="backward()" v-if="this.currentRoute != 0">
            {{ strings.backward }}
        </a>
        <a class="btn" v-on:click="forward()" v-if="this.currentRoute != this.routes.length - 1">
            {{ strings.forward }}
        </a>
    </div>
</template>