const dayOptions = {
  chart: { type: 'radialBar' },
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
        name: { show: false },
        value: {
          offsetY: 20,
          fontSize: '50px',
          color: undefined,
          formatter: (val) => `${val} %`,
        },
      },
    },
  },
  stroke: { dashArray: 1 },
  fill: {
    colors: [
      function ({ value }) {
        if (value < 55) {
          return '#D9534F';
        } else {
          return '#0bc900';
        }
      }
    ],
  },
};

export default dayOptions;