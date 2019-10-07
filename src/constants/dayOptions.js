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
      endAngle: 365,
      hollow: {
        size: '45%',
        background: 'transparent',
        image: undefined,
      },
      dataLabels: {
        name: {
          show: true,
          offsetY: -20,
          color: '#eeeeee',
        },
        value: {
          offsetY: 20,
          fontSize: '50px',
          color: undefined,
          formatter: (val) => `${Math.ceil(val)}%`,
        },
        total: {
          show: true,
          label: 'TOTAL',
          formatter: function (w) {
            return Math.ceil(w.globals.seriesTotals.reduce((a, b) => {
              return a + b
            }, 0)) + '%'
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
    // offsetX: 170,
    // offsetY: 60,
    // width: 100,
    labels: {
      useSeriesColors: true,
    },
  },
};

export default dayOptions;