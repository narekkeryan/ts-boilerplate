import { random } from '@/core/util/random.util';

describe('random.util', () => {
  test('Should return a random number between 2 numbers we provide.', () => {
    expect(random(0, 101)).toBeGreaterThanOrEqual(0);
    expect(random(0, 101)).toBeLessThanOrEqual(101);
    expect(random(73, 73)).toBe(73);
  });
});
