import extractPoints from '@/utils/extractPoints';

describe('extractPoints', () => {
  test.only('Return valid points if are defined in card name', () => {
    const result = extractPoints('(3) Test card');
    expect(result).toBe(3);
  });

  test('Return 0 points if are card name has bad format', () => {
    const result1 = extractPoints('Test card');
    const result2 = extractPoints('(aaa) Test card');
    
    expect(result1).toBe(0);
    expect(result2).toBe(0);
  });
});