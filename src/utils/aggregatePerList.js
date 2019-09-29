const aggregatePerList = (cards) => cards
  .reduce(
    (aggregation, card) => {
      if (aggregation[card.list]) aggregation[card.list].push(card);
      else aggregation[card.list] = [card];

      return aggregation;
    },
    {},
  );

export default aggregatePerList;