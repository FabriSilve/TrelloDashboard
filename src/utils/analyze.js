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


const SPRINT_LISTS = ['Sprint Backlog', 'Doing', 'Blocked', 'To Validate', 'Validated'];

const formatOrg = (org) => ({
  name: org.displayName,
  logo: `${org.logoUrl}/50.png`,
  url: org.url,
});

const formatMember = (member) => ({
  id: member.id,
  initials: member.initials,
});

const getMembersMap = (members) => members
  .reduce(
    (res, m) => {
      res[m.id] = formatMember(m);
      return res;
    },
    {},
  );

const getMembersPoints = (cards) => cards
  .filter(({ list }) => /^done.*$/i.test(list))
  .reduce((map, { points, members }) => {
    if (!members.length) return map;
    members.forEach((m) => {
      if (map[m]) map[m] += points;
      else map[m] = points;
    })
    return map;
  }, {});


async function analyze(boardId) {
  const board = await Trello.get(
    `/boards/${boardId}`,
    {
      cards: 'open',
      card_fields: 'dateLastActivity,name,shortUrl,labels,idList,idMembers,id,url',
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

  const members = await Trello.get(
    `/boards/${boardId}/members`,
    {
      fields: 'id,fullName,avatarUrl,initials',
    },
  )

  const membersMap = getMembersMap(members);

  const { lists, cards } = board;
  const listsMap = getListsMap(lists);

  const formattedCards = formatCards(cards, listsMap);

  const aggregatedPerDay = aggregatePerDay(formattedCards);
  const aggregatedPerList = aggregatePerList(formattedCards);

  const trendPointsData = donePointsPerDay(aggregatedPerDay);
  const defectPointsData = donePointsPerDay(aggregatedPerDay, /^defect$/i);
  const trendMediaData = getMediaSerie(trendPointsData);

  const today = moment().format('YYYYMMDD');
  const membersPoint = getMembersPoints(aggregatedPerDay[today] || []);

  const lastMedia = trendMediaData[trendMediaData.length -1][1];
  const todayData = Object.keys(membersPoint)
    .map((v) => [
      membersMap[v].initials,
      membersPoint[v] / lastMedia * 100,
    ]);

  const lastDoneList = getLastList(aggregatedPerList);
  const sprintLists = [...SPRINT_LISTS, lastDoneList];

  const sprintData = getSprintPoints(aggregatedPerList, sprintLists);
  const sprintLabels = getSprintLabels(formattedCards, sprintLists);

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
  
    isWorkingDay: todayData.length > 0,
    daySeries: todayData.length ? todayData.map(([_,p]) => p) : [0],
    dayLabels: todayData.map(([n]) => n),
  
    topicsSeries: [{ data: Object.values(sprintLabels) }],
    topicsLabels: Object.keys(sprintLabels),
    
    sprintSeries: [{ data: sprintData }],
    
    blockedTickets: aggregatedPerList['Blocked'] || [],
    toValidateTickets: aggregatedPerList['To Validate'] || [],
    doingTickets: aggregatedPerList['Doing'] || [],

    organisation: formattedOrg,
  };
}

export default analyze;
