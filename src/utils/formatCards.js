import moment from 'moment';

import extractPoints from './extractPoints';
import extractName from './extractName';

const formatCards = (cards, listsMap) => cards
  .map((card) => {
    if (
      !card.name
      || !card.id
      || !card.idList
    ) throw new Error('Bad formatted Card!');
    const cardPoints = extractPoints(card.name);
    const cardCleanedName = extractName(card.name);
    const formattedLabels = card.labels && card.labels.length
      ? card.labels.map(({ name, color }) => ({ name, color }))
      : [];
    return {
      id: card.id,
      list: listsMap[card.idList],
      points: cardPoints,
      name: cardCleanedName,
      labels: formattedLabels,
      url: card.url,
      members: card.idMembers,
      day: moment(card.dateLastActivity)
    };
  }, [])
  .filter(({ name }) => !!name)
  .sort((a, b) => (moment(a.day).isSameOrAfter(b.day)));

export default formatCards;
