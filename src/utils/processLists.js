import moment from 'moment';

function getPointsFromName(name) {
  var arr = name.match(/\((.*?)\)/g) || [""];
  return arr
    ? parseInt(arr[0].replace( /(^.*\(|\).*$)/g, '' ))
    : 0;
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
        day: moment(card.dateLastActivity).format('DD/MM/YYYY')
      };
    }, [])
    .sort((a, b) => (moment(a.day).isSameOrAfter(b.day)));

  const trendPoints = formattedCards
    .filter(({ list }) => /^done #[0-9]+$/i.test(list))
    .reduce(
      (trendData, card) => {
        if (trendData[card.day]) trendData[card.day] += card.points;
        else trendData[card.day] = card.points;

        return trendData;
      },
      {},
    );

  const trendPointsData = Object.keys(trendPoints)
    .map((day) => [day, trendPoints[day]])
    .sort((a, b) => (moment(a.day).isSameOrAfter(b.day)));


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

  console.log('labels', sprintLabels)

  const lastSprintDoneList = lists
    .filter(({ name }) => /^done #.*$/i.test(name))
    .map(({ name }) => ({ name, num: getDoneNumber(name) }))
    .sort((a, b) => a.num < b.num)[0].name;

  console.log(
    lists
      .filter(({ name }) => /^done #.*$/i.test(name))
      .map(({ name }) => ({ name, num: getDoneNumber(name) }))
    )

  console.log(
    lists
      .filter(({ name }) => /^done #.*$/i.test(name))
      .map(({ name }) => ({ name, num: getDoneNumber(name) }))
      .sort((a, b) => a.num < b.num)[0].name
    )

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
        x: sptintColumns[0], y: sprintSerie[sptintColumns[0]],
      }, {
        x: sptintColumns[1], y: sprintSerie[sptintColumns[1]],
      }, {
        x: sptintColumns[2], y: sprintSerie[sptintColumns[2]],
      }, {
        x: sptintColumns[3], y: sprintSerie[sptintColumns[3]],
      }, {
        x: sptintColumns[4], y: sprintSerie[sptintColumns[4]],
      }, {
        x: lastSprintDoneList, y: lastSprintDonePoints,
      }],
    }],
    warningsTickets: warningsTicketsData,
  });
}

export default processLists;
