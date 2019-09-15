<template>
  <section v-if="$store.getters.trendSeries">
    <apexchart height="300" type="line" :options="chartOptions" :series="$store.getters.trendSeries"/>
  </section>
</template>

<script>
export default {
  data() {
    return {
      chartOptions: {
        stroke: {
          width: [4, 2, 0, 0],
          curve: 'smooth'
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '25%',
            endingShape: 'rounded'	
          }
        },
        colors: ['#E14A84', '#A5C351', '#3A5794'],
        fill: {
          opacity: [0.25, 0.85, 0.85,1],
            gradient: {
              inverseColors: false,
              shade: 'light',
              type: "vertical",
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100]
            }
        },
        markers: {
          size: 0
        },
        xaxis: {
          type:'datetime',
          tickAmount: 1,
          labels: {
            style: {
              colors: 'rgba(100, 0, 0, 0.5)',
              fontSize: '10px',
            }
          },
          axisBorder: {
            show: false,
        },
        axisTicks: {
            show: true,
            borderType: 'solid',
            color: 'gray',
            height: 2,
            offsetX: 0,
            offsetY: 0
        },
        },
        yaxis: {
          min: 0,
          tickAmount: 5,
          labels: {
            style: {
              color: 'rgba(100, 0, 0, 0.5)',
            }
          }
        },
        chart: {
          toolbar: {
            show: false,
          },
          width: '100%',
          background: 'transparent',
        },
        grid: {
          show: true,
          yaxis: {
            lines: {
              show: false,
            }
          },
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
        },
        legend: {
          labels: {
            useSeriesColors: true
          },
          itemMargin: {
            horizontal: 30,
            vertical: 10,
          },
          markers: {
            customHTML: [
              function() {
                return ''
              }, function() {
                return ''
              }, function() {
                return ''
              }, function() {
                return ''
              }
            ]
          }
        }
      },
    };
  }
}
</script>