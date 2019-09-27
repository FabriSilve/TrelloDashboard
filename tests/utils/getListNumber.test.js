import getListNumber from '@/utils/getListNumber';

describe('getListNumber', () => {
  test('Return valid number if list name has right format', () => {
    const result = getListNumber('Test list #3');
    expect(result).toBe(3);
  });

  test('Return 0 points if list name has bad format', () => {
    const result1 = getListNumber('Test list');
    const result2 = getListNumber('Test list (3)');
    const result3 = getListNumber('Test list 3');
    
    expect(result1).toBe(0);
    expect(result2).toBe(0);
    expect(result3).toBe(0);
  });
});