<script>
  export default {
  };
</script>

<template>
  <nav
    class="navigation"
    id="chart_menu"
    role="navigation"
    data-navigation-handle="#chart_menu_handle"
    data-navigation-content="#app_nav_buttons"
  >
    <div class="chart-menu nav bg--gray-800">
      <div class="my--2 chart-menu__text hidden--up@d">Browse by:</div>
      <ul class="__list mx--2@w">
          <li class="__item">
            <router-link class="__link" to="/careers" v-scroll-to="'#app_content'">Career Outcomes</router-link>
          </li>
          <li class="__item">
            <router-link class="__link" to="/employment-status" v-scroll-to="'#app_content'">Employment Status</router-link>
          </li>
          <li class="__item">
            <router-link class="__link" to="/coop-participation" v-scroll-to="'#app_content'">Co-op Participation</router-link>
          </li>
          <li class="__item">
            <router-link class="__link" to="/industries" v-scroll-to="'#app_content'">Industry/Company</router-link>
          </li>
          <li class="__item">
            <router-link class="__link" to="/graduate-school" v-scroll-to="'#app_content'">Graduate School</router-link>
          </li>
          <li class="__item">
            <router-link class="__link" to="/salaries" v-scroll-to="'#app_content'">Starting Salaries</router-link>
          </li>
      </ul>
    </div>
  </nav>
</template>
