function processLists(lists) {
  // console.log(JSON.stringify(lists, null, 2));
  return  lists.map(list => ({ name: list.name, cards: list.cards.length }));
}

export default processLists;
