import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToast, toast, reducer } from './use-toast';

describe('use-toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('reducer', () => {
    const initialState = { toasts: [] };

    it('should add a toast with ADD_TOAST action', () => {
      const newToast = { id: '1', title: 'Test', open: true };
      const result = reducer(initialState, {
        type: 'ADD_TOAST',
        toast: newToast,
      });
      expect(result.toasts).toHaveLength(1);
      expect(result.toasts[0]).toEqual(newToast);
    });

    it('should limit toasts to TOAST_LIMIT (1)', () => {
      const state = { toasts: [{ id: '1', title: 'First', open: true }] };
      const result = reducer(state, {
        type: 'ADD_TOAST',
        toast: { id: '2', title: 'Second', open: true },
      });
      expect(result.toasts).toHaveLength(1);
      expect(result.toasts[0].id).toBe('2');
    });

    it('should prepend new toast to the beginning', () => {
      const state = { toasts: [] };
      const result = reducer(state, {
        type: 'ADD_TOAST',
        toast: { id: '1', title: 'First', open: true },
      });
      expect(result.toasts[0].id).toBe('1');
    });

    it('should update a toast with UPDATE_TOAST action', () => {
      const state = { toasts: [{ id: '1', title: 'Original', open: true }] };
      const result = reducer(state, {
        type: 'UPDATE_TOAST',
        toast: { id: '1', title: 'Updated' },
      });
      expect(result.toasts[0].title).toBe('Updated');
      expect(result.toasts[0].open).toBe(true); // Preserve other fields
    });

    it('should not update non-matching toast', () => {
      const state = { toasts: [{ id: '1', title: 'Original', open: true }] };
      const result = reducer(state, {
        type: 'UPDATE_TOAST',
        toast: { id: '2', title: 'Updated' },
      });
      expect(result.toasts[0].title).toBe('Original');
    });

    it('should dismiss a specific toast with DISMISS_TOAST action', () => {
      const state = { toasts: [{ id: '1', title: 'Test', open: true }] };
      const result = reducer(state, {
        type: 'DISMISS_TOAST',
        toastId: '1',
      });
      expect(result.toasts[0].open).toBe(false);
    });

    it('should dismiss all toasts when no toastId provided', () => {
      const state = {
        toasts: [
          { id: '1', title: 'First', open: true },
          { id: '2', title: 'Second', open: true },
        ],
      };
      const result = reducer(state, { type: 'DISMISS_TOAST' });
      expect(result.toasts.every((t) => t.open === false)).toBe(true);
    });

    it('should remove a specific toast with REMOVE_TOAST action', () => {
      const state = { toasts: [{ id: '1', title: 'Test', open: true }] };
      const result = reducer(state, {
        type: 'REMOVE_TOAST',
        toastId: '1',
      });
      expect(result.toasts).toHaveLength(0);
    });

    it('should remove all toasts when no toastId provided to REMOVE_TOAST', () => {
      const state = {
        toasts: [
          { id: '1', title: 'First', open: true },
          { id: '2', title: 'Second', open: true },
        ],
      };
      const result = reducer(state, { type: 'REMOVE_TOAST' });
      expect(result.toasts).toHaveLength(0);
    });

    it('should preserve other toasts when removing specific toast', () => {
      const state = {
        toasts: [
          { id: '1', title: 'First', open: true },
          { id: '2', title: 'Second', open: true },
        ],
      };
      const result = reducer(state, {
        type: 'REMOVE_TOAST',
        toastId: '1',
      });
      expect(result.toasts).toHaveLength(1);
      expect(result.toasts[0].id).toBe('2');
    });
  });

  describe('useToast hook', () => {
    it('should return state with toasts array', () => {
      const { result } = renderHook(() => useToast());
      expect(result.current.toasts).toBeDefined();
      expect(Array.isArray(result.current.toasts)).toBe(true);
    });

    it('should provide toast function', () => {
      const { result } = renderHook(() => useToast());
      expect(typeof result.current.toast).toBe('function');
    });

    it('should provide dismiss function', () => {
      const { result } = renderHook(() => useToast());
      expect(typeof result.current.dismiss).toBe('function');
    });
  });

  describe('toast function', () => {
    it('should create a toast and return id, dismiss, update functions', () => {
      const { result } = renderHook(() => useToast());

      let toastReturn: { id: string; dismiss: () => void; update: (props: unknown) => void };
      act(() => {
        toastReturn = toast({ title: 'Test Toast' });
      });

      expect(toastReturn!.id).toBeDefined();
      expect(typeof toastReturn!.dismiss).toBe('function');
      expect(typeof toastReturn!.update).toBe('function');
    });

    it('should add toast to state', () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        toast({ title: 'Test Toast', description: 'Description' });
      });

      expect(result.current.toasts).toHaveLength(1);
      expect(result.current.toasts[0].title).toBe('Test Toast');
    });

    it('should generate unique IDs for each toast', () => {
      const { result } = renderHook(() => useToast());

      let id1: string, id2: string;
      act(() => {
        id1 = toast({ title: 'First' }).id;
        id2 = toast({ title: 'Second' }).id;
      });

      expect(id1!).not.toBe(id2!);
    });

    it('should set open to true by default', () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        toast({ title: 'Test' });
      });

      expect(result.current.toasts[0].open).toBe(true);
    });

    it('should dismiss toast when calling dismiss method', () => {
      const { result } = renderHook(() => useToast());

      let toastInstance: { dismiss: () => void };
      act(() => {
        toastInstance = toast({ title: 'Test' });
      });

      act(() => {
        toastInstance.dismiss();
      });

      expect(result.current.toasts[0].open).toBe(false);
    });
  });
});
