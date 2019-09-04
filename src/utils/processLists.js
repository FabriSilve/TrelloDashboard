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
  return result.trend.points;
}

export default processLists;
