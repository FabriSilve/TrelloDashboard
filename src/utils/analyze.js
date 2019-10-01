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


function analyze({ lists, cards }, callback) {
  const listsMap = getListsMap(lists);

  const formattedCards = formatCards(cards, listsMap);

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
  
    topicsSeries: [{ data: Object.values(sprintLabels) }],
    topicsLabels: Object.keys(sprintLabels),
    
    sprintSeries: [{ data: sprintData }],
    
    blockedTickets: aggregatedPerList['Blocked'] || [],
    toValidateTickets: aggregatedPerList['To Validate'] || [],
    doingTickets: aggregatedPerList['Doing'] || [],
  });
}

export default analyze;