import moment from 'moment';

function getPointsFromName(name) {
  var arr = name.match(/\((.*?)\)/g) || [""];
  const points = arr
    ? parseInt(arr[0].replace( /(^.*\(|\).*$)/g, '' ))
    : 0;
  return !Number.isNaN(points) ? points : 0;
}

function getDoneNumber(name) {
  var arr = name.match(/[0-9]+/g) || [""];
  return arr
    ? parseInt(arr[0].replace( /(^.*\(|\).*$)/g, '' ))
    : 0;
}

function cleanCardName(name) {
  return name.split(/\(.+\)/).pop().trim();
}

function processLists({ lists, cards }, callback) {
  const listsMap = lists
    .filter((l) => !l.closed)
    .reduce(
      (res, l) => {
        res[l.id] = l.name;
        return res;
      },
      {},
    );

  const formattedCards = cards
    .map((card) => {
      const cardPoints = getPointsFromName(card.name);
      const cardCleanedName = cleanCardName(card.name);
      return {
        id: card.id,
        list: listsMap[card.idList],
        points: cardPoints,
        name: cardCleanedName,
        labels: card.labels.map(({ name, color }) => ({ name, color })),
        day: moment(card.dateLastActivity)
      };
    }, [])
    .sort((a, b) => (moment(a.day).isSameOrAfter(b.day)));

  const trendPoints = formattedCards
    .filter(({ list, day }) => /^done #[0-9]+$/i.test(list) && moment().subtract(1, 'months').isBefore(day))
    .reduce(
      (trendData, card) => {
        const formattedDay = moment(card.day).format('MM/DD/YYYY');
        if (trendData[formattedDay]) trendData[formattedDay] += card.points;
        else trendData[formattedDay] = card.points || 0;

        return trendData;
      },
      {},
    );

  const trendPointsData = Object.keys(trendPoints)
    .sort((a, b) => moment(a, 'MM/DD/YYYY').isSameOrAfter(moment(b, 'MM/DD/YYYY')))
    .map((list) => [list, trendPoints[list]])

  const trendMediaData = trendPointsData.map(
    (point, index) => {
      const values = [];
      let count = 0;
      for (let j = index - 1; j >=0 && count < 3; j -= 1) {
        values.push(trendPointsData[j][1])
        count += 1
      }
      const averange = values.length
      ? Math.ceil(values.reduce((pre, curr) => curr += pre) / values.length)
      : point[1];
      return [point[0], averange];
    }
  ).sort((a, b) => (moment(a.day).isSameOrAfter(b.day)));

  const todayDonePoints = formattedCards
    .filter(({ list, day }) => /^done.*$/i.test(list) && moment().isSame(day, 'day'))
    .reduce((tot, card) => tot + card.points, 0)

  const lastPointsMedia = trendMediaData[trendMediaData.length -1][1];
  const todayData = Math.ceil(todayDonePoints / lastPointsMedia * 100);

  const warningsTicketsData = formattedCards
    .filter(({ list }) => /^blocked.*$/i.test(list))
    .map(({ id, name, points, day }) => ({ id, name, points, day }));

  const sprintLabels = {};

  const sptintColumns = ['Sprint Backlog', 'Doing', 'Blocked', 'To Validate', 'Validated']
  const sprintSerie = formattedCards
    .filter(({ list }) => sptintColumns.includes(list))
    .reduce(
      (res, { list, points, labels }) => {
        if (res[list]) res[list] += points;
        else res[list] = points;
        labels.forEach((label) => {
          if (sprintLabels[label.name]) sprintLabels[label.name] += points;
          else sprintLabels[label.name] = points;
        });
        return res;
      },
      {},
    )

  const lastSprintDoneList = lists
    .filter(({ name }) => /^done #.*$/i.test(name))
    .map(({ name }) => ({ name, num: getDoneNumber(name) }))
    .sort((a, b) => a.num < b.num)[0].name;

  const lastSprintDonePoints = formattedCards
    .filter(({ list }) => list === lastSprintDoneList)
    .reduce((res, { points, labels }) => {
      labels.forEach((label) => {
        if (sprintLabels[label.name]) sprintLabels[label.name] += points;
        else sprintLabels[label.name] = points;
      });
      res += points;
      return res;
    }, 0)

  callback({
    trendSeries: [{
      name: 'Media',
      type: 'line',
      data: trendMediaData,
    }, {
      name: 'Points',
      type: 'area',
      data: trendPointsData,
    }, {
      name: 'Defect',
      type: 'bar',
      data: [],
    }],
    daySeries: [todayData],
    dayLabels: ['Today Trend'],
    topicsSeries: [{
      data: Object.values(sprintLabels),
    }],
    topicsLabels: Object.keys(sprintLabels),
    sprintSeries: [{
      data: [{
        x: sptintColumns[0], y: sprintSerie[sptintColumns[0]] || 0,
      }, {
        x: sptintColumns[1], y: sprintSerie[sptintColumns[1]] || 0,
      }, {
        x: sptintColumns[2], y: sprintSerie[sptintColumns[2]] || 0,
      }, {
        x: sptintColumns[3], y: sprintSerie[sptintColumns[3]] || 0,
      }, {
        x: sptintColumns[4], y: sprintSerie[sptintColumns[4]] || 0,
      }, {
        x: lastSprintDoneList, y: lastSprintDonePoints,
      }],
    }],
    warningsTickets: warningsTicketsData,
  });
}

export default processLists;
