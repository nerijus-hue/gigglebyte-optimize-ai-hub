import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility function', () => {
  it('should merge single class name', () => {
    expect(cn('foo')).toBe('foo');
  });

  it('should merge multiple class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should handle conditional classes with false value', () => {
    const condition = false;
    expect(cn('foo', condition && 'bar', 'baz')).toBe('foo baz');
  });

  it('should handle conditional classes with true value', () => {
    const condition = true;
    expect(cn('foo', condition && 'bar', 'baz')).toBe('foo bar baz');
  });

  it('should handle undefined values', () => {
    expect(cn('foo', undefined, 'bar')).toBe('foo bar');
  });

  it('should handle null values', () => {
    expect(cn('foo', null, 'bar')).toBe('foo bar');
  });

  it('should merge Tailwind conflicting padding classes correctly', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('should merge Tailwind conflicting text color classes correctly', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('should merge Tailwind conflicting background classes correctly', () => {
    expect(cn('bg-red-500 hover:bg-red-600', 'bg-blue-500')).toBe('hover:bg-red-600 bg-blue-500');
  });

  it('should handle array inputs', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });

  it('should handle object inputs with truthy values', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });

  it('should handle empty inputs', () => {
    expect(cn()).toBe('');
  });

  it('should handle empty string inputs', () => {
    expect(cn('')).toBe('');
  });

  it('should handle mixed inputs', () => {
    expect(cn('foo', { bar: true }, ['baz', 'qux'])).toBe('foo bar baz qux');
  });
});
