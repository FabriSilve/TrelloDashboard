const aggregatePerList = (cards) => cards
  .reduce(
    (aggregation, card) => {
      if (aggregation[list]) aggregation[list].push(card);
      else aggregation[list] = [card];

      return aggregation;
    },
    {},
  );

export default aggregatePerList;