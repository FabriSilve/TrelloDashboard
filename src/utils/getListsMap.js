const getListsMap = (lists) => lists
  .filter((l) => !l.closed)
  .reduce(
    (res, l) => {
      if (!l.id || !l.name) throw new Error('Bad formatted List!');
      res[l.id] = l.name;
      return res;
    },
    {},
  );

  export default getListsMap;
