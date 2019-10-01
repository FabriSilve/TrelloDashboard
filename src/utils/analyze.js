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
  // const members = await Trello.get(
  //   `/boards/${boardId}/members`,
  //   {
  //     fields: 'id,fullName,avatarUrl,initials',
  //   },
  // )
  // const org = await Trello.get(
  //   `/organizations/5a0c6a477c67d845e639a404`,
  //   {
  //     fields: 'id,displayName,url,logoUrl'
  //   },
  // )
  // // console.log('data', members, org, board)

  const { lists, cards } = board;
  const listsMap = getListsMap(lists);

  const formattedCards = formatCards(cards, listsMap);

  // console.log('card', formattedCards[formattedCards.length - 1])

  const aggregatedPerDay = aggregatePerDay(formattedCards);
  const aggregatedPerList = aggregatePerList(formattedCards);

  const trendPointsData = donePointsPerDay(aggregatedPerDay);
  const trendMediaData = getMediaSerie(trendPointsData);

  const today = moment().format('YYYYMMDD');
  const todayPoints = cardsPoints(aggregatedPerDay[today] || [], /^done.*$/i);
  const lastMedia = trendMediaData[trendMediaData.length -1][1];
  const todayData = Math.ceil(todayPoints / lastMedia * 100);

  const lastDoneList = getLastList(aggregatedPerList);
  const sprintLists = [...SPRINT_LISTS, lastDoneList];

  const sprintData = getSprintPoints(aggregatedPerList, sprintLists);
  const sprintLabels = getSprintLabels(formattedCards, sprintLists);

  return {
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
  
    topicsSeries: [{ data: Object.values(sprintLabels) }],
    topicsLabels: Object.keys(sprintLabels),
    
    sprintSeries: [{ data: sprintData }],
    
    blockedTickets: aggregatedPerList['Blocked'] || [],
    toValidateTickets: aggregatedPerList['To Validate'] || [],
    doingTickets: aggregatedPerList['Doing'] || [],
  };
}

export default analyze;
