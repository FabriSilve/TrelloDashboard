import aggregatePerDay from '@/utils/aggregatePerDay';

describe('aggregatePerDay', () => {
  test('Should return aggregated cards', () => {
    const cards = [{
      day: '20190912',
      name: 'Test 1',
    }, {
      day: '20190912',
      name: 'Test 2',
    }, {
      day: '20190913',
      name: 'Test 3',
    }, {
      day: '20190510',
      name: 'Test 4',
    }];

    const result = aggregatePerDay(cards);

    expect(Object.keys(result)).toHaveLength(3);
    
    expect(result['20190912']).toBeDefined();
    expect(result['20190912']).toHaveLength(2);
    expect(result['20190912'][0]).toBeDefined();
    expect(result['20190912'][0].name).toBe('Test 1');
    expect(result['20190912'][0].day).toBe('20190912');
    expect(result['20190912'][1]).toBeDefined();
    expect(result['20190912'][1].name).toBe('Test 2');
    expect(result['20190912'][1].day).toBe('20190912');

    expect(result['20190913']).toBeDefined();
    expect(result['20190913']).toHaveLength(1);
    expect(result['20190913'][0].name).toBe('Test 3');
    expect(result['20190913'][0].day).toBe('20190913');

    expect(result['20190510']).toBeDefined();
    expect(result['20190510']).toHaveLength(1);
    expect(result['20190510'][0].name).toBe('Test 4');
    expect(result['20190510'][0].day).toBe('20190510');
  });

  test.todo('Should thorw an error if card has not day label')
});