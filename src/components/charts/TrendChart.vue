<template>
  <apexchart
    :options="options"
    :series="series"
    :height="430"
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
            columnWidth: '25%',
            endingShape: 'rounded',
          },
        },
        fill: { opacity: [1, 0.4, 1] },
        markers: { size: 0 },
        title: {
          text: 'Team\'s Trend',
          align: 'center',
        },
        xaxis: {
          type: 'datetime',
          forceNiceScale: false,
          tickAmount: 1,
          labels: { show: true },
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