/**
 * Simple in-memory rate limiter for server actions.
 * Resets on deploy / cold start — enough to blunt spam bots on a small store.
 * For multi-instance production, use Upstash Redis or similar later.
 */

type Bucket = { timestamps: number[] };

const buckets = new Map<string, Bucket>();

export function checkRateLimit(
  key: string,
  opts: { limit: number; windowMs: number } = { limit: 5, windowMs: 60_000 }
): boolean {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter(
    (t) => now - t < opts.windowMs
  );

  if (bucket.timestamps.length >= opts.limit) {
    buckets.set(key, bucket);
    return false;
  }

  bucket.timestamps.push(now);
  buckets.set(key, bucket);
  return true;
}
