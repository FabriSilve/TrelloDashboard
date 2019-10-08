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
            // return Math.ceil(w.globals.seriesTotals.reduce((a, b) => {
            //   return a + b
            // }, 0)) + '%'
          }
        }
      },
    },
  },
  // fill: {
  //   colors: [
  //     function ({ value }) {
  //       if (value < 45) return '#D9534F';
  //       if (value < 80) return '#ffa500';
  //       return '#0bc900';
  //     }
  //   ],
  // },
  legend: {
    show: true,
    floating: true,
    fontSize: '22px',
    position: 'bottom',
    // offsetX: 170,
    offsetY: 50,
    // width: 100,
    labels: {
      useSeriesColors: true,
    },
  },
};

export default dayOptions;