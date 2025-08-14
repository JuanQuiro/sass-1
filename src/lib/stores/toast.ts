import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'info';
export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  timeout?: number;
}

function createToastStore() {
  const { subscribe, update } = writable<ToastItem[]>([]);

  function push(message: string, type: ToastType = 'info', timeout = 3000) {
    const id = Math.random().toString(36).slice(2);
    const item: ToastItem = { id, type, message, timeout };
    update((list) => [...list, item]);
    if (timeout) setTimeout(() => remove(id), timeout);
    return id;
  }

  function remove(id: string) {
    update((list) => list.filter((t) => t.id !== id));
  }

  return {
    subscribe,
    push,
    remove,
    success: (m: string, t = 2500) => push(m, 'success', t),
    error: (m: string, t = 4000) => push(m, 'error', t),
    info: (m: string, t = 3000) => push(m, 'info', t)
  };
}

export const toasts = createToastStore();
