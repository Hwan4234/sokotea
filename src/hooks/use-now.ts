import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

/**
 * Current time, refreshed every `intervalMs` and whenever the app comes back to the
 * foreground (timers do not run while the app is in the background).
 */
export function useNow(intervalMs = 60_000) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    const timer = setInterval(tick, intervalMs);
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        tick();
      }
    });
    return () => {
      clearInterval(timer);
      subscription.remove();
    };
  }, [intervalMs]);

  return now;
}
