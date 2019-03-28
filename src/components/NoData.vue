<template>
  <div class="no-data pa--2 ta--c">
    <div class="measure">
      <h3>We can’t display your requested data due to privacy restrictions.</h3>
      <p class="mb--2 mb--0@d">The major you have chosen to view has too few graduates for us to display the data without compromising privacy. We suggest you select additional, related majors to provide a greater number of graduates.</p>
      <button class="btn bg--none tc--white bc--white" id="no_data_filter_menu">
        Refine Filter
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "no-data"
  };
</script>
