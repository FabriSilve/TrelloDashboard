const trendOptions = {
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '10%',
      endingShape: 'rounded',
    },
  },
  fill: { opacity: [1, 0.4, 1] },
  markers: { size: 0 },
  title: {
    text: 'Team\'s Trend',
    align: 'center',
  },
  xaxis: {
    type: 'datetime',
    forceNiceScale: false,
    tickAmount: 1,
    labels: { show: true },
    axisBorder: { show: false },
    axisTicks: {
      show: false,
      borderType: 'solid',
      color: 'gray',
      height: 0,
      offsetX: 0,
      offsetY: 0,
    },
  },
  yaxis: {
    min: 0,
    opposite: true,
    labels: { show: true },
  },
  chart: {
    type: 'line',
    background: 'transparent',
  },
  legend: {
    fontSize: '18px',
    position: 'bottom',
    // position: 'left',
    // offsetX: 50,
    // offsetY: 20,
    labels: { useSeriesColors: true },
    onItemHover: { highlightDataSeries: true },
    onItemClick: { toggleDataSeries: false },
  },
};

export default trendOptions;
