<template>
  <apexchart
    type="radialBar"
    height="430"
    :options="options"
    :series="series"
  />
</template>

<script>
export default {
  props: ['series', 'labels', 'widthUnit'],
  computed: {
    width: function() {
      return `${this.widthUnit * 35}px`;
    },
    options: function() {
      return {
        title: {
          text: 'Today Goal',
          align: 'center',
        },
        plotOptions: {
          radialBar: {
            startAngle: 0,
            endAngle: 360,
            hollow: {
              size: '50%',
              background: 'transparent',
              image: undefined,
            },
            track: {
              show: false,
            },
            dataLabels: {
              name: {
                show: true,
                offsetY: -20,
                color: '#eeeeee',
              },
              value: {
                show: true,
                offsetY: 20,
                fontSize: '50px',
                color: undefined,
                formatter: (val) => `${Math.ceil(val)} %`,
              },
              total: {
                show: true,
                label: 'Today',
                formatter: function (w) {
                  return `${Math.ceil(w.globals.seriesTotals[0])} %`;
                }
              }
            },
          },
        },
        legend: {
          show: true,
          floating: true,
          fontSize: '22px',
          position: 'bottom',
          offsetY: 50,
          labels: {
            useSeriesColors: true,
          },
        },
        labels: this.labels,
      };
    },
  },
}
</script>
