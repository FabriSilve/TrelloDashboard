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
          textAnchor: 'start',
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
            if (value - points < 0) return `Late: ${value - points}`;
            if (value - points > 0) return `Ahead: ${value - points}`;
            return '';
          },
          offsetX: -80,
          offsetY: -10,
          style: {
            fontSize: '16px',
            colors: ['#F86624']
        },
        },
      };
    },
  },
}
</script>