import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useIsMobile } from './use-mobile';

describe('useIsMobile hook', () => {
  const originalInnerWidth = window.innerWidth;
  let matchMediaMock: ReturnType<typeof vi.fn>;
  let changeHandler: (() => void) | null = null;

  beforeEach(() => {
    changeHandler = null;
    matchMediaMock = vi.fn().mockImplementation((query: string) => ({
      matches: window.innerWidth < 768,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((event: string, handler: () => void) => {
        if (event === 'change') changeHandler = handler;
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    window.matchMedia = matchMediaMock;
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: originalInnerWidth,
    });
    vi.restoreAllMocks();
  });

  it('should return false when window width is >= 768px', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 1024 });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('should return true when window width is < 768px', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 500 });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('should return false at exactly 768px (the breakpoint)', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 768 });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('should return true at 767px (just below breakpoint)', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 767 });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('should update when window is resized from desktop to mobile', async () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 1024 });
    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    // Simulate resize to mobile
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 500 });

    act(() => {
      if (changeHandler) changeHandler();
    });

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it('should use correct media query breakpoint (767px)', () => {
    renderHook(() => useIsMobile());
    expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 767px)');
  });

  it('should cleanup event listener on unmount', () => {
    const removeEventListenerMock = vi.fn();
    matchMediaMock.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: removeEventListenerMock,
      dispatchEvent: vi.fn(),
    }));
    window.matchMedia = matchMediaMock;

    const { unmount } = renderHook(() => useIsMobile());
    unmount();

    expect(removeEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('should coerce undefined to false via double negation', () => {
    // Initial state before effect runs is undefined, coerced to false
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 1024 });
    const { result } = renderHook(() => useIsMobile());
    // After effect runs, should be boolean
    expect(typeof result.current).toBe('boolean');
  });
});
