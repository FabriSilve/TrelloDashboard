import moment from 'moment';

import getListsMap from './getListsMap';
import formatCards from './formatCards';
import aggregatePerDay from './aggregatePerDay';
import aggregatePerList from './aggregatePerList';
import donePointsPerDay from './donePointsPerDay';
import getMediaSerie from './getMediaSerie';
import cardsPoints from './cardsPoints';
import getLastList from './getLastList';
import getSprintPoints from './getSprintPoints';
import getSprintLabels from './getSprintLabels';
import getListNumber from './getListNumber';


const SPRINT_LISTS = ['Sprint Backlog', 'Doing', 'Blocked', 'To Validate', 'Validated'];

const formatOrg = (org) => ({
  name: org.displayName,
  logo: `${org.logoUrl}/50.png`,
  url: org.url,
});

// const formatMember = (member) => ({
//   id: member.id,
//   initials: member.initials,
// });

// const getMembersMap = (members) => members
//   .reduce(
//     (res, m) => {
//       res[m.id] = formatMember(m);
//       return res;
//     },
//     {},
//   );

// const getMembersPoints = (cards) => cards
//   .filter(({ list }) => /^done.*$/i.test(list))
//   .reduce((map, { points, members }) => {
//     if (!members.length) return map;
//     members.forEach((m) => {
//       if (map[m]) map[m] += points;
//       else map[m] = points;
//     })
//     return map;
//   }, {});

function getPreviousWorkday() {
  return [1, 2, 3, 4, 5].indexOf(moment().subtract(1, 'day').day()) > -1 ?
    moment().subtract(1, 'day') : moment(moment().day(-2));
}

function getSprintsConfig(cards) {
  return cards.filter(({ name }) => name === '#SPRINT#');
}


async function analyze(boardId) {
  const board = await Trello.get(
    `/boards/${boardId}`,
    {
      cards: 'open',
      card_fields: 'dateLastActivity,name,shortUrl,labels,idList,idMembers,id,url,desc',
      filter: 'open',
      fields: 'cards,name,idOrganization',
      lists: 'open',
      organisation: true,
    },
  )

  const rowOrg = board.idOrganization
    ? await Trello.get(`/organizations/${board.idOrganization}`, { fields: 'id,displayName,url,logoUrl' })
    : {};
  const formattedOrg = formatOrg(rowOrg);

  // const members = await Trello.get(
  //   `/boards/${boardId}/members`,
  //   {
  //     fields: 'id,fullName,avatarUrl,initials',
  //   },
  // )

  // const membersMap = getMembersMap(members);

  const { lists, cards } = board;
  const listsMap = getListsMap(lists);

  const formattedCards = formatCards(cards, listsMap);

  const aggregatedPerDay = aggregatePerDay(formattedCards);
  const aggregatedPerList = aggregatePerList(formattedCards);

  const trendPointsData = donePointsPerDay(aggregatedPerDay);
  const defectPointsData = donePointsPerDay(aggregatedPerDay, /^defect$/i);
  const trendMediaData = getMediaSerie(trendPointsData);

  const today = moment().format('YYYYMMDD');
  const yesterday = getPreviousWorkday().format('YYYYMMDD');
  // const membersPoint = getMembersPoints(aggregatedPerDay[today] || []);

  const lastMedia = trendMediaData[trendMediaData.length -1][1];
  const todayPoints = cardsPoints(aggregatedPerDay[today] || [], /^done.*$/i);
  const todayData = Math.ceil(todayPoints / lastMedia * 100);
  const secondLastMedia = trendMediaData[trendMediaData.length - 2][1];
  const yesterdayPoints = cardsPoints(aggregatedPerDay[yesterday] || [], /^done.*$/i);
  const yesterdayData = Math.ceil(yesterdayPoints / secondLastMedia * 100);

  // const todayData = Object.keys(membersPoint)
  //   .map((v) => [
  //     membersMap[v].initials,
  //     membersPoint[v] / lastMedia * 100,
  //   ]);

  const lastDoneList = getLastList(aggregatedPerList);
  const sprintLists = [...SPRINT_LISTS, lastDoneList];

  const sprintData = getSprintPoints(aggregatedPerList, sprintLists);
  const sprintLabels = getSprintLabels(formattedCards, sprintLists);

  let hasSprintConfigs;
  const advanceGoal = [];
  const advancePoints = [];
  try {
    // SPRINT BURNCHART
    const sprintConfigs = getSprintsConfig(cards);
    hasSprintConfigs = sprintConfigs
      && sprintConfigs.length
      && listsMap[sprintConfigs[0].idList] === lastDoneList;
    
    const configs = {
      start: '11/12/2019',
      end: '11/14/2019',
      speed: 12,
      devs: [3, 3, 3],
    };
    const days = moment(configs.end, 'MM/DD/YYYY').diff(moment(configs.start, 'MM/DD/YYYY'), 'days') + 1;

    const sprintGoal = configs.devs.reduce((a, d) => a + (d * configs.speed) );
    advanceGoal.push({
      x: moment(configs.start).hours(9).minutes(30),
      y: sprintGoal,
    });
    advancePoints.push({
      x: moment(configs.start),
      y: sprintGoal,
    });
    console.log(sprintGoal, sprintGoal, 0, sprintGoal)
    let i = 0;
    let previousGoal = sprintGoal;
    for (let index = days - 1; index > 0; index -= 1) {
      const date = moment(configs.start).add(days - index, 'days').hours(9).minutes(30);
      const formattedDate = date.format('MM/DD/YYYY');
      const goalPoints = previousGoal - configs.speed * configs.devs[i];
      previousGoal = goalPoints;
      advanceGoal.push({
        x: formattedDate,
        y: goalPoints,
      });
      const points = aggregatedPerList[lastDoneList]
        .reduce((sum, card) => (date.isAfter(card.day)
          ? sum + card.points
          : sum
        ), 0);
      console.log(goalPoints, sprintGoal, points, sprintGoal - points)
      advancePoints.push({
        x: formattedDate,
        y: sprintGoal - points,
      })
      i += 1;
    }
  } catch (e) {
    console.error(e)
  }
  
  return {
    analyzed: true,
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
      data: defectPointsData,
    }],
  
    isWorkingDay: todayData > 0,
    daySeries: [todayData, yesterdayData],
    dayLabels: ['Today', 'Yesterday'],
    // daySeries: todayData.length ? todayData.map(([_,p]) => p) : [0],
    // dayLabels: todayData.map(([n]) => n),

    advanced: hasSprintConfigs || true,
    advanceSeries: [{
      name: 'Points',
      type: 'area',
      data: advancePoints,
    }, {
      name: 'Goal',
      type: 'line',
      data: advanceGoal,
    }],
  
    topicsSeries: [{ data: Object.values(sprintLabels) }],
    topicsLabels: Object.keys(sprintLabels),
    
    sprintSeries: [{ data: sprintData }],
    
    blockedTickets: aggregatedPerList['Blocked'] || [],
    toValidateTickets: aggregatedPerList['To Validate'] || [],
    doingTickets: aggregatedPerList['Doing'] || [],

    organisation: formattedOrg,
    currentSprint: `Sprint ${getListNumber(lastDoneList)}`,
  };
}

export default analyze;
