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
          opacity: [0.4, 1],
        },
        markers: { size: [2, 3] },
        stroke: {
          curve: 'straight',
        },
        title: {
          text: 'Sprint Burndown',
          align: 'center',
        },
        xaxis: {
          type: 'datetime',
          forceNiceScale: true,
          tickAmount: 1,
          labels: { show: true },
          offsetX: -20,
          axisBorder: { show: false },
          axisTicks: {
            show: false,
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
        dataLabels: {
          enabled: true,
          textAnchor: 'middle',
          formatter: function(value, { seriesIndex, dataPointIndex, w }) {
            const points = w.config.series[0].data[dataPointIndex]
              ? w.config.series[0].data[dataPointIndex].y
              : null;
            const goalSerie = w.config.series[seriesIndex];
            if (
              goalSerie.name !== 'Goal'
              || dataPointIndex === 0
            ) return '';
            if (points === null) return '';
            const odd = Math.round((value - points) * 10)/10;
            if (odd < 0) return `${odd}`;
            if (odd > 0) return `+${odd}`;
            return '';
          },
          offsetX: 40,
          offsetY: -20,
          style: {
            fontSize: '18px',
            colors: ['#F86624']
          },
        },
      };
    },
  },
}
</script>