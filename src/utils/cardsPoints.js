const cardsPoints = (cards, regex = /^.*$/) => cards
  .filter(({ list }) => regex.test(list))
  .reduce((tot, { points }) => tot + points, 0);

export default cardsPoints;
