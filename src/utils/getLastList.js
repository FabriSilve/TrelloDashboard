import getListNumber from './getListNumber';

const getLastList = (lists, regex = /^done #.*$/i) => Object.keys(lists)
  .filter((list) => regex.test(list))
  .map((list) => ({ list, num: getListNumber(list) }))
  .sort((a, b) => a.num < b.num)[0].list;

export default getLastList;
