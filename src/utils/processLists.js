function processLists(lists) {
  return  lists.map(list => ({ name: list.name, cards: list.cards.length }));
}

export default processLists;
