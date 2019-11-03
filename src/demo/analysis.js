import moment from 'moment';

const analysis = {
  trendSeries: [{
    name: 'Points',
    type: 'area',
    data: [
      ['01/01/2003', 44],
      ['01/02/2003', 55],
      ['01/03/2003', 41],
      ['01/04/2003', 67],
      ['01/05/2003', 22],
      ['01/06/2003', 43],
      ['01/07/2003', 21],
      ['01/08/2003', 41],
      ['01/09/2003', 56],
      ['01/10/2003', 27],
      ['01/11/2003', 44],
      ['01/12/2003', 55],
      ['01/13/2003', 41],
      ['01/14/2003', 67],
      ['01/15/2003', 22],
      ['01/16/2003', 43],
      ['01/17/2003', 21],
      ['01/18/2003', 41],
      ['01/19/2003', 56],
      ['01/20/2003', 27],
      ['01/21/2003', 43],
    ],
  }, {
    name: 'Defect',
    type: 'bar',
    data: [
      ['01/01/2003', 23],
      ['01/02/2003', 11],
      ['01/03/2003', 22],
      ['01/04/2003', 27],
      ['01/05/2003', 13],
      ['01/06/2003', 22],
      ['01/07/2003', 37],
      ['01/08/2003', 21],
      ['01/09/2003', 44],
      ['01/10/2003', 22],
      ['01/11/2003', 30],
      ['01/12/2003', 11],
      ['01/13/2003', 22],
      ['01/14/2003', 27],
      ['01/15/2003', 13],
      ['01/16/2003', 22],
      ['01/17/2003', 37],
      ['01/18/2003', 21],
      ['01/19/2003', 44],
      ['01/20/2003', 22],
      ['01/21/2003', 30],
    ],
  }],
  goalSeries: [{
    name: 'Points',
    type: 'area',
    data: [
      [moment('01/01/2003 09:00').unix() * 1000, 0],
      [moment('01/01/2003 12:00').unix() * 1000, 10],
      [moment('01/01/2003 17:00').unix() * 1000, 25],
      [moment('01/02/2003 09:00').unix() * 1000, 26],
      [moment('01/02/2003 12:00').unix() * 1000, 30],
      [moment('01/02/2003 17:00').unix() * 1000, 33],
      [moment('01/03/2003 09:00').unix() * 1000, 50],
      [moment('01/03/2003 12:00').unix() * 1000, 82],
      [moment('01/03/2003 17:00').unix() * 1000, 99],
      [moment('01/04/2003 09:00').unix() * 1000, 150],
    ],
  }, {
    name: 'Goal',
    type: 'line',
    data: [
      [moment('01/01/2003 09:00').unix() * 1000, 0],
      [moment('01/02/2003 09:00').unix() * 1000, 45],
      [moment('01/03/2003 09:00').unix() * 1000, 60],
      [moment('01/04/2003 09:00').unix() * 1000, 120],
    ],
  }],
  daySeries: [90],
  dayLabels: ['AAAAA'],
  topicsSeries: [{
    data: [80, 50, 30, 40, 100, 20],
  }],
  topicsLabels: ['AAAAA', 'BBBBBB', 'CCCCCC', 'DDDDDD', 'EEEEE', 'FFFFF'],
  sprintSeries: [{
    data: [{
      x: 'test1', y: 400,
     }, {
       x: 'tessdfdft2', y: 430,
     }, {
       x: 'test3', y: 130,
     }, {
       x: 'testffff4', y: 230,
     }, {
       x: 'tesfffft5', y: 130,
     }, {
       x: 'tesfft6', y: 90,
     }],
  }],
  // blockedTickets: [],
  blockedTickets: [{
    id: 1,
    name: 'Test warning',
    day: new Date(),
    points: 13,
    url: 'google.com/1234-test',
    labels: [{ name: 'test' }],
  }, {
    id: 2,
    name: 'Test warning second',
    day: new Date(),
    points: 3,
    url: 'google.com/1234-test',
    labels: [{ name: 'test' }],
  }],
};

export default analysis;