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

const formatConfigCard = (card) => {
  if (!card.desc) throw new Error('Config: missing description');
  const json = JSON.parse(card.desc);
  const start = moment(json.start, 'MM/DD/YYYY').hours(9).minutes(15);
  const end = moment(json.end, 'MM/DD/YYYY').hours(9).minutes(15);
  if (start.isAfter(end)) throw new Error('Config: invalid end date before start');
  const days = end.diff(start, 'days') + 1;
  if (json.devs.length !== days) throw new Error(`Config: invalid devs values. Expected ${days}`);
  const devs = json.devs;
  if (json.speed <= 0) throw new Error('Config: team speed cannot be less than one');
  const speed = json.speed;
  const goal = devs.reduce((a, v) => a + (v * speed), 0);
  const title = json.title;
  return {
    start,
    end,
    speed,
    days,
    devs,
    goal,
    title,
  };
}

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

  // Burndown chart
  let hasSprintConfigs = false;
  const burndownGoal = [];
  const burndownPoints = [];
  let advanceTitle = 'Sprint Burndown';
  try {
    const sprintConfigCard = getSprintsConfig(cards)
      .find((c) => listsMap[c.idList] === lastDoneList);
    hasSprintConfigs = !!sprintConfigCard;

    if (hasSprintConfigs) {
      const conf = formatConfigCard(sprintConfigCard);
      advanceTitle = conf.title || advanceTitle;
      for (let index = 0; index <= conf.days; index += 1) {
        const xDay = moment(conf.start).add(index, 'days');
        burndownGoal.push({
          x: xDay.format('MM/DD/YYYY'),
          y: conf.goal - conf.devs.slice(0, index).reduce((a, v) => a + (v * conf.speed), 0),
        });
        if (moment().isAfter(xDay)) {
          const pointsCheck = index === conf.days
            ? (day) => day.isAfter(conf.start)
            : (day) => day.isAfter(conf.start) && day.isBefore(moment(conf.start).add(index, 'days'));
          burndownPoints.push({
            x: xDay.format('MM/DD/YYYY'),
            y: conf.goal - aggregatedPerList[lastDoneList].reduce(
              (sum, t) => pointsCheck(t.day) ? sum + t.points : sum,
              0,
            ),
          });
        }
      }
    }
  } catch (e) {
    console.log(e);
    hasSprintConfigs = false;
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

    advanced: hasSprintConfigs,
    advanceSeries: [{
      name: 'Points',
      type: 'area',
      data: burndownPoints,
    }, {
      name: 'Goal',
      type: 'line',
      data: burndownGoal,
    }],
    advanceTitle,
  
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
