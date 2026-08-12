import { describe, it, expect } from 'vitest';
import { formatTitle } from '../src';

describe('Format Title', () => {
  it('should capitalize a string', () => {
    expect(formatTitle('hi hi')).toBe('Hi Hi');
    expect(formatTitle('hi             hi            ')).toBe('Hi Hi');
    expect(formatTitle('       hi     hi')).toBe('Hi Hi');
  });
});
