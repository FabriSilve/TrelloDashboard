<template>
  <apexchart
    type="bar"
    height="430"
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
        title: {
          text: 'Sprint Flow',
          align: 'center',
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
