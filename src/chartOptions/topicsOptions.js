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
    labels: { show: true },
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
    enabledOnSeries: true,
    formatter: function (val, opts) {
      return val
    },
    textAnchor: 'middle',
    offsetX: 100,
    offsetY: 100,
    style: {
      fontSize: '12px',
      colors: undefined
    },
    dropShadow: {
      enabled: false,
    }
  },
};

export default topicsOptions;