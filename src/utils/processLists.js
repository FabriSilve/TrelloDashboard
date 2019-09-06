import moment from 'moment';

function getPointsFromName(name) {
  var arr = name.match(/\((.*?)\)/g) || [""];
  return arr 
    ? parseInt(arr[0].replace( /(^.*\(|\).*$)/g, '' ))
    : 0;
}

function processLists(lists) {
  
  const result = lists.reduce(
    (analysis, list) => {
      if (/^done.*/ig.test(list.name)) {
        list.cards.forEach((card) => {
          const { points } = analysis.trend; 
          const {
            dateLastActivity,
            name,
            labels,
          } = card;
          const day = moment(dateLastActivity).format('MM/DD/YYYY');
          if (points[day]) {
            points[day] += getPointsFromName(name);
          } else {
            points[day] = getPointsFromName(name);
          }
        })
      }
      return analysis
    },
    {
      trend: {
        points: {},
      },
    },
  );
  const chartData = Object.keys(result.trend.points).map((day) => ([
    day,
    result.trend.points[day],
  ]))
  const chartMedia = chartData
    .sort((a, b) => (moment(a[0]).isSameOrAfter(b[0])))
    .map((point, index) => {
    const values = [];
    for (let j = index - 1; j >=0; j -= 1) {
      values.push(chartData[j][1])
    }
    const averange = values.length
      ? Math.ceil(values.reduce((previous, current) => current += previous) / values.length)
      : point[1];
    return [point[0], averange]
  })

  return {
    trend: [{
      name: 'Points',
      type: 'area',
      data: chartData,
    }, {
      name: 'Media',
      type: 'line',
      data: chartMedia,
    }]
  };
}

export default processLists;
