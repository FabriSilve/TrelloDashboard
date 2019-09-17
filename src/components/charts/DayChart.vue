<template>
  <section v-if="$store.getters.daySeries">
    <apexchart type=radialBar height="350" :options="chartOptions" :series="$store.getters.daySeries"/>
  </section>
</template>

<script>
export default {
  data() {
    return {
      chartOptions: {
        plotOptions: {
          radialBar: {
            offsetY: -10,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: '30%',
              background: 'transparent',
              image: undefined,
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: false,
              }
            }
          }
        },
        colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
        labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
        legend: {
          show: true,
          floating: true,
          fontSize: '16px',
          position: 'left',
          offsetX: 160,
          offsetY: 10,
          labels: {
              useSeriesColors: true,
          },
          markers: {
              size: 0
          },
          formatter: function(seriesName, opts) {
              return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
          },
          itemMargin: {
              horizontal: 1,
          }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    show: false
                }
            }
        }]
      }
    };
  }
}
</script>