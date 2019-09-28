import moment from 'moment';

import getListNumber from './getListNumber';
import getListsMap from './getListsMap';
import formatCards from './formatCards';
import aggregatePerDay from './aggregatePerDay';
import aggregatePerList from './aggregatePerList';
import donePointsPerDay from './donePointsPerDay';
import getMediaSerie from './getMediaSerie';


function processLists({ lists, cards }, callback) {
  const listsMap = getListsMap(lists);

  const formattedCards = formatCards(cards, listsMap);

  const aggregatedPerDay = aggregatePerDay(formattedCards);
  // const aggregatedDonePerList = aggregatePerList(formattedCards);

  const trendPointsData = donePointsPerDay(aggregatedPerDay);
  const trendMediaData = getMediaSerie(trendPointsData);

  const todayDonePoints = formattedCards
    .filter(({ list, day }) => /^done.*$/i.test(list) && moment().isSame(day, 'day'))
    .reduce((tot, card) => tot + card.points, 0)

  const lastPointsMedia = trendMediaData[trendMediaData.length -1][1];
  const todayData = Math.ceil(todayDonePoints / lastPointsMedia * 100);

  const blockedTicketsData = formattedCards
    .filter(({ list }) => list === 'Blocked')
    .map(({ id, name, points, day }) => ({ id, name, points, day }))
    .filter(({ name, points }) => !!name && !!points);
  
  const toValidateTicketsData = formattedCards
    .filter(({ list }) => list === 'To Validate')
    .map(({ id, name, points, day }) => ({ id, name, points, day }))
    .filter(({ name, points }) => !!name && !!points);

  const doingTicketsData = formattedCards
    .filter(({ list }) => list === 'Doing')
    .map(({ id, name, points, day }) => ({ id, name, points, day }))
    .filter(({ name, points }) => !!name && !!points);


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
    .map(({ name }) => ({ name, num: getListNumber(name) }))
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
    blockedTickets: blockedTicketsData,
    toValidateTickets: toValidateTicketsData,
    doingTickets: doingTicketsData,
  });
}

export default processLists;
