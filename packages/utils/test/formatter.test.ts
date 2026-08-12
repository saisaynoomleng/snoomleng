import { describe, it, expect } from 'vitest';
import {
  formatDate,
  formatTitle,
  formatYear,
  maximumImageSize,
  nameToSlug,
  replaceDashWithNoSpace,
  replaceDashWithSpace,
} from '../src';

describe('Format Title', () => {
  it('should capitalize a string', () => {
    expect(formatTitle('hi hi')).toBe('Hi Hi');
    expect(formatTitle('hi             hi            ')).toBe('Hi Hi');
    expect(formatTitle('       hi     hi')).toBe('Hi Hi');
  });
});

describe('Format Date', () => {
  it('should format any date into locale date string', () => {
    expect(formatDate('09/24/1996')).toBe('Sep 24, 1996');
    expect(formatDate(new Date(2024, 2, 10, 2, 30))).toBe('Mar 10, 2024');
  });
});

describe('Name to Slug', () => {
  it('should slugify any string', () => {
    expect(nameToSlug('My PortFoLio')).toBe('my-portfolio');
    expect(nameToSlug('Wa$$Up!!!')).toBe('waup');
  });
});

describe('Format Year', () => {
  it('should return year from date string', () => {
    expect(formatYear('09/24/1996')).toBe(1996);
    expect(formatYear(new Date(2024, 2, 10, 2, 30))).toBe(2024);
  });
});

describe('replace dash with space', () => {
  it('should replace any dashes with withespace', () => {
    expect(replaceDashWithSpace('hello-my---------love')).toBe('hello my love');
  });
});

describe('replace dash with no space', () => {
  it('should remove any dashes', () => {
    expect(replaceDashWithNoSpace('hello-----my-love')).toBe('hellomylove');
  });
});

describe('maximum image size', () => {
  it('should validate uploaded file size', () => [
    expect(maximumImageSize(10000000, 1)).toBe('File size cannot exceeds 1MB'),
    expect(maximumImageSize(2382, 1)).toBe(true),
  ]);
});
