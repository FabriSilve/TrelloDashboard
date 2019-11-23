import moment from 'moment';

import donePointsPerDay from '@/utils/donePointsPerDay';

describe('donePointsPerDay', () => {
  test.skip('Should return mapped done ticket for chart', () => {
    const aggregated = {
      '20190927': [{
        day: moment('20190927', 'YYYYMMDD'),
        list: 'Done #1',
        points: 2,
      }, {
        day: moment('20190927', 'YYYYMMDD'),
        list: 'Done #4',
        points: 1,
      }],
      '20190925': [{
        day: moment('20190925', 'YYYYMMDD'),
        list: 'Done #1',
        points: 2,
      }, {
        day: moment('20190925', 'YYYYMMDD'),
        list: 'Test',
        points: 3,
      }],
      '20160925': [{
        day: moment('20160925', 'YYYYMMDD'),
        list: 'Done #1',
        points: 2,
      }, {
        day: moment('20160925', 'YYYYMMDD'),
        list: 'Test',
        points: 3,
      }],
    };

    const result = donePointsPerDay(aggregated);
    
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveLength(2);
    expect(result[0][0]).toBe('09/25/2019');
    expect(result[0][1]).toBe(2);
    expect(result[1][0]).toBe('09/27/2019');
    expect(result[1][1]).toBe(3);
  });

  test.todo('Should return empty array if input invalid');
});