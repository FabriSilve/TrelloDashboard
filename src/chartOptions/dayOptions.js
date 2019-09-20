const dayOptions = {
  plotOptions: {
    radialBar: {
      offsetY: 0,
      startAngle: 0,
      endAngle: 270,
      hollow: {
        margin: 5,
        size: '55%',
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
  title: {
    text: 'Today Progress',
    align: 'center',
  },
  legend: {
    show: true,
    floating: true,
    fontSize: '24px',
    position: 'left',
    offsetX: 10,
    offsetY: 110,
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
}

// const dayOptions = {
//   chart: {
//     type: 'radialBar',
//   },
//   plotOptions: {
//     radialBar: {
//       startAngle: -140,
//       endAngle: 140,
//       dataLabels: {
//         name: {
//           fontSize: '16px',
//           color: undefined,
//           offsetY: 60
//         },
//         value: {
//           offsetY: -10,
//           fontSize: '22px',
//           color: undefined,
//           formatter: function (val) {
//             return val + "%";
//           }
//         }
//       }
//     }
//   },
//   fill: {
//     type: 'gradient',
//     gradient: {
//       shade: 'dark',
//       shadeIntensity: 0.5,
//       inverseColors: false,
//       opacityFrom: 1,
//       opacityTo: 1,
//       stops: [0, 50, 65, 91]
//     },
//   },
//   stroke: {
//     dashArray: 2
//   },
// }

export default dayOptions;