import analyze from '@/utils/analyze';

describe('analyze tests', () => {
  test.skip('Return empty analysis if invalid board format', () => {
    const result = analyze({});
    expected(result).not.toBeDefined();
  })

  test.todo('To Check all types of data returned from process list');
})