<template>
  <apexchart
    type="bar"
    :width="width"
    :options="options"
    :series="series"
  />
</template>

<script>
export default {
  props: ['series', 'widthUnit'],
  computed: {
    width: function() {
      return `${this.widthUnit * 35}px`;
    },
    options: function() {
      return {
        chart: {
          // width: '100%',
          // height: '100%',
        },
        plotOptions: {
          bar: { horizontal: true },
        },
        dataLabels: { enabled: false },
      };
    },
  },
}
</script>
