<template>
   <a class="btn bg--red" 
    @click.prevent="scrollTo(`#app_content`)"
    href="#/outcomes">See the numbers</a>
</template>

<script>
  export default {
    name: "see-the-numbers",
    methods: {
        scrollTo(element) {
            this.$scrollTo(element, 500, { onStart: this.myMethod });
        }
    }
  };
</script>
