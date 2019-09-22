const topicsOptions = {
  chart: {
    background: 'transparent',
    foreColor: '#ccc',
    dropShadow: {
      enabled: true,
      blur: 1,
      left: 1,
      top: 1
    },
  },
  fill: {
    opacity: 0.7,
  },
  markers: {
    size: 0
  },
  title: {
    text: 'Sprint Topics',
    align: 'center',
  },
  xaxis: {
    labels: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  plotOptions: {
    radar: {
      polygons: {
        fill: {
          colors: ['#374462', '#3f415a']
        }
      }
    }
  },
  dataLabels: {
    enabled: true,
    textAnchor: 'middle',
    offsetY: 100,
    style: {
      fontSize: '16px',
      colors: undefined
    },
    dropShadow: {
      enabled: false,
    }
  },
};

export default topicsOptions;