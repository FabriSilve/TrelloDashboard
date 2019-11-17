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
        fill: {
          opacity: [1, 0.4],
        },
        markers: { size: [1, 2] },
        stroke: {
          curve: 'straight',
        },
        title: {
          text: 'Sprint Burnchart',
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