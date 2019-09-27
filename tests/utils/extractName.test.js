import extractName from '@/utils/extractName';

describe('extractName', () => {
  test.only('Return valid points if are defined in card name', () => {
    const result = extractName('(3) Test card');
    expect(result).toBe('Test card');
  });

  test('Return 0 points if are card name has bad format', () => {
    const result1 = extractName('Test card');
    const result2 = extractName('(aaa) Test card');

    expect(result1).toBe('Test card');
    expect(result2).toBe('(aaa) Test card');
  });
});