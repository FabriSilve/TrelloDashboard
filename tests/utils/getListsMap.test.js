import getListsMap from '@/utils/getListsMap';

describe('getListsMap', () => {
  test('Should return a valid map if lists is valid', () => {
    const lists = [{
      closed: true,
      id: '123',
      name: 'closed list',
    }, {
      closed: false,
      id: '321',
      name: 'Open list',
    }];

    const result = getListsMap(lists);
    
    expect(Object.keys(result)).toHaveLength(1);
    expect(result['321']).toBeDefined();
    expect(result['321']).toBe('Open list');
  });

  test('Should return empty map if lists is empty', () => {
    const result = getListsMap([]);
    expect(Object.keys(result)).toHaveLength(0);
  });

  test('Should throw and error if a list has a wrong format', () => {
    const lists = [{
      closed: false,
      _id: '321',
      name: 'Open list',
    }];

    expect(() => getListsMap(lists)).toThrow('Bad formatted List!');
  })
});