<template>
  <section v-if="series">
    <apexchart height="300" type="line" :options="chartOptions" :series="series"/>
    <div>{{JSON.stringify(series, null, 2)}}</div>
  </section>
</template>

<script>
export default {
  props: ['series'],
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
      // series: [{
      //   name: 'Facebook',
      //   type: 'bar',
      //   data: [
      //     ['01/01/2003', 23], 
      //     ['02/01/2003', 11], 
      //     ['03/01/2003', 22], 
      //     ['04/01/2003', 27], 
      //     ['05/01/2003', 13], 
      //     ['06/01/2003', 22], 
      //     ['07/01/2003', 37], 
      //     ['08/01/2003', 21], 
      //     ['09/01/2003', 44], 
      //     ['10/01/2003', 22], 
      //     ['11/01/2003', 30]
      //   ],
      // }, {
      //   name: 'Test',
      //   type: 'bar',
      //   data: [
      //     ['01/01/2003',44], 
      //     ['02/01/2003',55], 
      //     ['03/01/2003',41], 
      //     ['04/01/2003',67], 
      //     ['05/01/2003',22], 
      //     ['06/01/2003',43], 
      //     ['07/01/2003',21], 
      //     ['08/01/2003',41], 
      //     ['09/01/2003',56], 
      //     ['10/01/2003',27],
      //     ['11/01/2003',43],
      //   ],
      // }, {
      //   name: 'Vine',
      //   type: 'area',
      //   data: [
      //     ['01/01/2003', 44],
      //     ['02/01/2003', 55],
      //     ['03/01/2003', 41],
      //     ['04/01/2003', 67],
      //     ['05/01/2003', 22],
      //     ['06/01/2003', 43],
      //     ['07/01/2003', 21],
      //     ['08/01/2003', 41],
      //     ['09/01/2003', 56],
      //     ['10/01/2003', 27],
      //     ['11/01/2003', 43],
      //   ],
      // }, {
      //   name: 'Dribbble',
      //   type: 'line',
      //   data: [
      //     ['01/01/2003',30],
      //     ['02/01/2003',25],
      //     ['03/01/2003',36],
      //     ['04/01/2003',30],
      //     ['05/01/2003',45],
      //     ['06/01/2003',35],
      //     ['07/01/2003',64],
      //     ['08/01/2003',52],
      //     ['09/01/2003',59],
      //     ['10/01/2003',36],
      //     ['11/01/2003',39],
      //   ],
      // }]
    };
  }
}
</script>