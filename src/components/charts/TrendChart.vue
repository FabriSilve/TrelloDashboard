<template>
  <apexchart
    :options="options"
    :series="series"
    :height="height"
    :width="width"
  />
</template>

<script>
export default {
  props: ['series', 'widthUnit', 'heightUnit'],
  computed: {
    width: function() {
      return `${this.widthUnit * 40}`;
    },
    height: function() {
      return `${this.heightUnit * 20}`;
    },
    options: function() {
      return {
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '15%',
            endingShape: 'rounded',
          },
        },
        colors: ['#0169FE', '#fea601'],
        stroke: {
          curve: ['smooth', 'straight'],
          width: [2,3,1],
        },
        fill: {
          opacity: [0.4, 1, 1],
        },
        markers: { size: 0 },
        xaxis: {
          type: 'datetime',
          forceNiceScale: false,
          tickAmount: 1,
          labels: { show: false },
          axisBorder: { show: false },
          axisTicks: {
            show: false,
            borderType: 'solid',
            color: 'gray',
            height: 0,
            offsetX: 0,
            offsetY: 0,
          },
        },
        yaxis: {
          min: 0,
          forceNiceScale: true,
          labels: { show: true },
        },
        chart: {
          type: 'line',
          background: 'transparent',
        },
        legend: {
          show: false,
        },
      };
    },
  },
}
</script>

<style>

</style>