import cardsPoints from './cardsPoints';

const getSprintPoints = (aggregate, lists) => lists
  .map((list) => ({
    x: list,
    y: cardsPoints(aggregate[list] || []),
  }));

export default getSprintPoints;
