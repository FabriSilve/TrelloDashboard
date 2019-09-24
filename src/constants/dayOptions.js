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
  fill: {
    colors: [
      function ({ value }) {
        if (value < 45) return '#D9534F';
        if (value < 80) return '#ffa500';
        return '#0bc900';
      }
    ],
  },
};

export default dayOptions;