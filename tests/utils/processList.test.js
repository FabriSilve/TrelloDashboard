import processLists from '@/utils/processLists';

describe('processLists tests', () => {
  test.skip('Return empty analysis if invalid board format', () => {
    const result = processLists({});
    expected(result).not.toBeDefined();
  })

  test.todo('To Check all types of data returned from process list');
})