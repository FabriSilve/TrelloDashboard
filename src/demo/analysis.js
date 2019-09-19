const analysis = {
  trendSeries: [{
    name: 'Facebook',
    type: 'bar',
    data: [
      ['01/01/2003', 23], 
      ['02/01/2003', 11], 
      ['03/01/2003', 22], 
      ['04/01/2003', 27], 
      ['05/01/2003', 13], 
      ['06/01/2003', 22], 
      ['07/01/2003', 37], 
      ['08/01/2003', 21], 
      ['09/01/2003', 44], 
      ['10/01/2003', 22], 
      ['11/01/2003', 30]
    ],
  }, {
    name: 'Vine',
    type: 'area',
    data: [
      ['01/01/2003', 44],
      ['02/01/2003', 55],
      ['03/01/2003', 41],
      ['04/01/2003', 67],
      ['05/01/2003', 22],
      ['06/01/2003', 43],
      ['07/01/2003', 21],
      ['08/01/2003', 41],
      ['09/01/2003', 56],
      ['10/01/2003', 27],
      ['11/01/2003', 43],
    ],
  }, {
    name: 'Dribbble',
    type: 'line',
    data: [
      ['01/01/2003',30],
      ['02/01/2003',25],
      ['03/01/2003',36],
      ['04/01/2003',30],
      ['05/01/2003',45],
      ['06/01/2003',35],
      ['07/01/2003',64],
      ['08/01/2003',52],
      ['09/01/2003',59],
      ['10/01/2003',36],
      ['11/01/2003',39],
    ],
  }],
  daySeries: [6, 67, 161, 90],
  topicsSeries: [{
    data: [80, 50, 30, 40, 100],
  }],
  topicsLabels: [{
    data: ['A', 'B', 'C', 'D', 'E'],
  }],
  sprintSeries: [{
    data: [{
      x: 'test1', y: 400,
     }, {
       x: 'test2', y: 430,
     }, {
       x: 'test3', y: 130,
     }, {
       x: 'test4', y: 230,
     }],
  }],
  warningsTickets: [{
    id: 1,
    name: 'Test warning',
    points: 3,
  }],
};

export default analysis;