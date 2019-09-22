// const dayOptions = {
//   plotOptions: {
//     radialBar: {
//       offsetY: 0,
//       startAngle: -180,
//       endAngle: 180,
//       hollow: {
//         margin: 5,
//         size: '35%',
//             background: 'transparent',
//               image: undefined,
//             },
//       dataLabels: {
//         name: {
//           show: false,
//               },
//         value: {
//           show: false,
//               }
//       }
//     }
//   },
//   title: {
//     text: 'Today Progress',
//     align: 'center',
//   },
//   legend: {
//     show: true,
//     floating: true,
//     fontSize: '20px',
//     position: 'bottom',
//     offsetX: 0,
//     offsetY: 0,
//     labels: {
//       useSeriesColors: true,
//     },
//     markers: {
//       size: 0
//     },
//     formatter: function(seriesName, opts) {
//       return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
//     },
//     itemMargin: {
//       horizontal: 1,
//     }
//   },
// }

const dayOptions = {
  chart: {
    type: 'radialBar',
  },
  title: {
    text: 'Today Goal',
    align: 'center',
  },
  plotOptions: {
    radialBar: {
      startAngle: -140,
      endAngle: 140,
      hollow: {
        size: '45%',
        background: 'transparent',
        image: undefined,
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          offsetY: 20,
          fontSize: '50px',
          color: undefined,
          formatter: function (val) {
            return val + " %";
          }
        }
      }
    }
  },
  stroke: {
    dashArray: 1,
  },
  fill: {
    colors: [
      function ({ value, seriesIndex, w }) {
        if (value < 55) {
          return '#D9534F'
        } else {
          return '#0bc900'
        }
      }
    ]
  }
}

export default dayOptions;