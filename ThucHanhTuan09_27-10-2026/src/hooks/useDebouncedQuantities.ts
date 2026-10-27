import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../store';
import { setQuantity } from '../store/cartSlice';
export function useDebouncedQuantities(delay = 300) {
  const dispatch = useAppDispatch();
  const [drafts, setDrafts] = useState<Record<string, number>>({});
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const pending = useRef<Record<string, number>>({});
  const commit = useCallback(
    (id: string) => {
      const qty = pending.current[id];
      if (qty === undefined) return;
      dispatch(setQuantity({ id, quantity: qty }));
      delete pending.current[id];
      delete timers.current[id];
      setDrafts((d) => {
        const next = { ...d };
        delete next[id];
        return next;
      });
    },
    [dispatch],
  );
  const changeQuantity = useCallback(
    (id: string, qty: number) => {
      pending.current[id] = qty;
      setDrafts((d) => ({ ...d, [id]: qty }));
      clearTimeout(timers.current[id]);
      timers.current[id] = setTimeout(() => commit(id), delay);
    },
    [commit, delay],
  );
  const discard = useCallback((id: string) => {
    clearTimeout(timers.current[id]);
    delete timers.current[id];
    delete pending.current[id];
    setDrafts((d) => {
      const next = { ...d };
      delete next[id];
      return next;
    });
  }, []);
  useEffect(
    () => () => {
      Object.values(timers.current).forEach(clearTimeout);
      Object.entries(pending.current).forEach(([id, quantity]) =>
        dispatch(setQuantity({ id, quantity })),
      );
    },
    [dispatch],
  );
  return { drafts, changeQuantity, discard };
}
