<template>
  <apexchart
    type="radar"
    :height="height"
    :options="options"
    :series="series"
  />
</template>

<script>
export default {
  props: ['series', 'labels', 'heightUnit'],
  computed: {
    height: function() {
      return `${this.heightUnit * 40}px`;
    },
    options: function() {
      return {
        chart: {
          parentHeightOffset: 0,
          background: 'transparent',
          foreColor: '#ccc',
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1,
          },
        },
        fill: { opacity: 0.7 },
        markers: { size: 0 },
        xaxis: {
          labels: { show: false },
        },
        yaxis: { show: false },
        plotOptions: {
          radar: {
            polygons: {
              fill: { colors: ['#374462'] },
            },
          },
        },
        dataLabels: {
          enabled: true,
          textAnchor: 'middle',
          style: {
            fontSize: '12px',
            colors: undefined
          },
          dropShadow: { enabled: false },
        },
        labels: this.labels,
      };
    },
  },
}
</script>
