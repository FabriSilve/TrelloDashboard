import moment from 'moment';

function getPointsFromName(name) {
  var arr = name.match(/\((.*?)\)/g) || [""];
  return arr 
    ? parseInt(arr[0].replace( /(^.*\(|\).*$)/g, '' ))
    : 0;
}

function cleanCardName(name) {
  return name.split(/\(.+\)/).pop().trim();
}

function processLists(lists) {
  // Build cards array
  const cards = lists
    .reduce((cards, list) => {
      const cardsInList = list.cards.reduce((validCards, card) => {
        const cardPoints = getPointsFromName(card.name);
        const cardCleanedName = cleanCardName(card.name);
        if (!cardPoints || !cardCleanedName) return validCards;
        const formattedCard = {
          list: list.name,
          points: cardPoints,
          name: cardCleanedName,
          labels: card.labels,
          day: moment(card.dateLastActivity).format('MM/DD/YYYY')
        }
        return [...validCards, formattedCard]
      }, [])
      return [...cards, ...cardsInList]
    }, [])
    .sort((a, b) => (moment(a.day).isSameOrAfter(b.day)))
  
  // Analysis Cards
  const trendPointsData = cards
      .reduce(
        (trendData, card) => {
          if (!/^done.*/ig.test(card.list)) return trendData;
          
          if (trendData[card.day]) trendData[card.day] += card.points;
          else trendData[card.day] = card.points;

          return trendData;
        },
        {},
      )

  const trendPointsSerie = Object.keys(trendPointsData)
    .map(
      (day) => ({
        x: day,
        y: trendPointsData[day],
      }
    )
  )

  const trendMediaSerie = trendPointsSerie.map(
    (point, index) => {
      const values = [];
      let count = 0;
      for (let j = index - 1; j >=0 && count < 3; j -= 1) {
        values.push(trendPointsSerie[j].y)
        count += 1
      }
      const averange = values.length
        ? Math.ceil(values.reduce((pre, curr) => curr += pre) / values.length)
        : point.y;
      return {
        x: point.x,
        y: averange,
      }
    }
  )

  console.log(trendMediaSerie)

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
    let count = 0;
    for (let j = index - 1; j >=0 && count < 3; j -= 1) {
      values.push(chartData[j][1])
      count += 1
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
      data: trendPointsSerie,
    }, {
      name: 'Media',
      type: 'line',
      data: trendMediaSerie,
    }]
  };
}

export default processLists;
