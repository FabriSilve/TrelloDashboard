<template>
  <!-- <apexchart
    :options="options"
    :series="series"
    width="430"
  /> -->
  <apexchart
    :options="options"
    :series="series"
    :width="width"
  />
</template>

<script>
export default {
  props: ['series', 'widthUnit', 'heightUnit'],
  computed: {
    width: function() {
      return `${this.widthUnit * 58}`;
    },
    height: function() {
      return `${this.heigthUnit * 60}`;
    },
    options: function() {
      return {
        stroke: {
          curve: 'straight',
        },
        fill: { opacity: [0.4, 1] },
        markers: { size: [0, 3] },
        xaxis: {
          type: 'datetime',
          forceNiceScale: false,
          tickAmount: 1,
          labels: {
            show: true,
            format: 'ddd dd MMM'
          },
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
          opposite: true,
          labels: { show: true },
        },
        chart: {
          type: 'line',
          background: 'transparent',
        },
        legend: {
          fontSize: '18px',
          position: 'bottom',
          labels: { useSeriesColors: true },
          onItemHover: { highlightDataSeries: true },
          onItemClick: { toggleDataSeries: false },
        },
      };
    },
  },
}
</script>

<style>

</style>