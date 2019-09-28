import moment from 'moment';

const aggregatePerDay = (cards) => cards
  .reduce(
    (aggregation, card) => {
      const day = moment(card.day).format('YYYYMMDD');
      if (aggregation[day]) aggregation[day].push(card);
      else aggregation[day] = [card];

      return aggregation;
    },
    {},
  );

export default aggregatePerDay;