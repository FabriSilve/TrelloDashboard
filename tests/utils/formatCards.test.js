import formatCards from '@/utils/formatCards';

describe('formatCards', () => {
  test('Should return formatted card', () => {
    const listsMap = {
      '123': 'ToDo',
    };

    const cards = [{
      name: '(2) Test Card',
      id: '123',
      idList: '123',
      dateLastActivity: '2019-09-27',
      labels: [{
        name: 'admin',
        color: 'blue',
        field: 'useless',
      }],
      field: 'useless',
    }];

    const result = formatCards(cards, listsMap);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Test Card');
    expect(result[0].points).toBe(2);
    expect(result[0].list).toBe('ToDo');
    expect(result[0].labels).toHaveLength(1);
    expect(result[0].labels[0].name).toBe('admin');
    expect(result[0].labels[0].color).toBe('blue');
    expect(result[0].labels[0].field).not.toBeDefined();
    expect(result[0].field).not.toBeDefined();
  });

  test('Should return empty array if cards is empty', () => {
    const result = formatCards([], {});
    expect(result).toHaveLength(0);
  });

  test.todo('Should return formatted cards in right order');
  test.todo('Should return only valid cards');

  test('Should throw and error if a list has a wrong format', () => {
    const cards = [{
      closed: false,
      _id: '321',
      name: 'Open list',
    }];

    expect(() => formatCards(cards, {})).toThrow('Bad formatted Card!');
  })
});