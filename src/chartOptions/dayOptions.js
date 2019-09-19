// const dayOptions = {
//   plotOptions: {
//     radialBar: {
//       offsetY: -10,
//         startAngle: 0,
//           endAngle: 270,
//             hollow: {
//         margin: 5,
//           size: '30%',
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
//   colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
//     labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
//       legend: {
//     show: true,
//       floating: true,
//         fontSize: '16px',
//           position: 'left',
//             offsetX: 30,
//               offsetY: 10,
//                 labels: {
//       useSeriesColors: true,
//           },
//     markers: {
//       size: 0
//     },
//     formatter: function(seriesName, opts) {
//       return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
//     },
//     itemMargin: {
//       horizontal: 1,
//           }
//   },
//   // responsive: [{
//   //   breakpoint: 480,
//   //   options: {
//   //     legend: {
//   //       show: false
//   //     }
//   //   }
//   // }]
// }

const dayOptions = {
  chart: {
  },
  plotOptions: {
    radialBar: {
      startAngle: 0,
      endAngle: 365,
      hollow: {
        margin: 0,
        size: '40%',
        background: '#fff',
        position: 'front',
        dropShadow: {
          enabled: true,
          top: 3,
          left: 0,
          blur: 4,
          opacity: 0.24
        }
      },
      track: {
        background: '#fff',
        strokeWidth: '87%',
        margin: 0, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: -3,
          left: 0,
          blur: 4,
          opacity: 0.35
        }
      },

      dataLabels: {
        name: {
          offsetY: -10,
          show: true,
          color: '#888',
          fontSize: '17px'
        },
        value: {
          formatter: function (val) {
            return parseInt(val);
          },
          color: '#111',
          fontSize: '36px',
          show: true,
        }
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.5,
      gradientToColors: ['#ABE5A1'],
      gradientFromColors: ['#DDBBDD'],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 200]
    }
  },
  stroke: {
    lineCap: 'round'
  },
}

export default dayOptions;