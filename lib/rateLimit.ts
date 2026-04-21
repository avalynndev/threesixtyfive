const store = new Map<string, number[]>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 20;

export function rateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetIn: number;
} {
  const now = Date.now();
  const timestamps = (store.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  const remaining = Math.max(0, MAX_REQUESTS - timestamps.length);
  const resetIn =
    timestamps.length > 0
      ? Math.ceil((timestamps[0] + WINDOW_MS - now) / 1000)
      : 0;

  if (timestamps.length >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetIn };
  }

  timestamps.push(now);
  store.set(ip, timestamps);

  if (store.size > 10_000) {
    for (const [key, times] of store) {
      if (times.every((t) => now - t >= WINDOW_MS)) store.delete(key);
    }
  }

  return { allowed: true, remaining: remaining - 1, resetIn };
}
