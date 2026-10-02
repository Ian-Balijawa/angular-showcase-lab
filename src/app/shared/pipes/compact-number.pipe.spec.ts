import { CompactNumberPipe } from './compact-number.pipe';

describe('CompactNumberPipe', () => {
  const pipe = new CompactNumberPipe();

  it('formats thousands', () => {
    expect(pipe.transform(12500)).toBe('12.5K');
  });

  it('keeps small numbers readable', () => {
    expect(pipe.transform(42)).toBe('42');
  });
});
