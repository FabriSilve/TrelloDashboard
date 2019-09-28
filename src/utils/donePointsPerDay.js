import moment from 'moment';

const DONE_REGEX = /^done #[0-9]+$/i;

const donePointsPerDay = (aggregation, interval = 30) => Object.keys(aggregation)
  .filter((item) => moment().subtract(interval, 'days')
    .isBefore(moment(item, 'YYYYMMDD'), 'day'))
  .sort((a, b) => a > b)
  .map((day) => [
    moment(day, 'YYYYMMDD').format('MM/DD/YYYY'),
    aggregation[day].reduce((sum, card) => {
      if (!DONE_REGEX.test(card.list)) return sum; 
      return sum + card.points;
    }, 0),
  ])

export default donePointsPerDay;