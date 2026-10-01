/**
 * ShadowTrace Sliding Window Rate Limiter
 * Tracks and throttles client requests per IP address to safeguard API relays from abuse.
 */

interface RateLimitRecord {
  timestamps: number[];
}

// In-memory sliding window cache
const ipStore = new Map<string, RateLimitRecord>();

// Cleanup stale records periodically to avoid memory growth
const CLEANUP_INTERVAL_MS = 60 * 1000;
let lastCleanup = Date.now();

function purgeStaleRecords(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  const threshold = now - windowMs;
  for (const [ip, record] of ipStore.entries()) {
    record.timestamps = record.timestamps.filter(ts => ts > threshold);
    if (record.timestamps.length === 0) {
      ipStore.delete(ip);
    }
  }
}

export interface RateLimitResult {
  isAllowed: boolean;
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp in seconds when the window resets
}

/**
 * Checks whether an IP address is within the allowed request rate.
 * @param ip Client IP address
 * @param limit Maximum requests allowed within window
 * @param windowMs Duration of rate limiting window in milliseconds (default 60,000ms / 1 min)
 */
export function checkRateLimit(
  ip: string,
  limit: number = 30,
  windowMs: number = 60000
): RateLimitResult {
  purgeStaleRecords(windowMs);

  const now = Date.now();
  const windowStart = now - windowMs;

  let record = ipStore.get(ip);
  if (!record) {
    record = { timestamps: [] };
    ipStore.set(ip, record);
  }

  // Filter timestamps within current window
  record.timestamps = record.timestamps.filter(ts => ts > windowStart);

  const resetTimeSeconds = Math.ceil((now + windowMs) / 1000);

  if (record.timestamps.length >= limit) {
    return {
      isAllowed: false,
      limit,
      remaining: 0,
      reset: resetTimeSeconds
    };
  }

  // Record this request
  record.timestamps.push(now);
  const remaining = Math.max(0, limit - record.timestamps.length);

  return {
    isAllowed: true,
    limit,
    remaining,
    reset: resetTimeSeconds
  };
}
