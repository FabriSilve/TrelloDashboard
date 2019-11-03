<template>
  <apexchart
    :options="options"
    :series="series"
    :width="width"
    :height="height"
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
      return `${this.heightUnit * 60}`;
    },
    options: function() {
      return {
        stroke: {
          curve: 'straight',
        },
        colors: [
          '#0DFE01',
          // function({ value, seriesIndex, w }) {
          //   if (value < 111) {
          //       return '#7E36AF'
          //   } else {
          //       return '#D9534F'
          //   }
          // },
          '#FE3001',
        ],
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