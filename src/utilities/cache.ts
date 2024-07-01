import TTLCache from "@isaacs/ttlcache";

const ttlCache = new TTLCache();

interface CacheInput<T> {
  /** Unique key identifying the queryFn result  */
  key: string;
  /** Async function fetching the data */
  queryFn: Promise<T>;
  /** Time to live in milliseconds */
  ttl: number;
  /**
   * Condition to cache the data
   * @default true
   */
  condition?: boolean;
}
/**
 * Simple cache function which allows
 * to cache the result of an async function
 * for a given number of milliseconds
 * when the condition is true
 * (which is true by default)
 */
export const cache = async <T>({
  key,
  queryFn,
  ttl,
  condition = true,
}: CacheInput<T>): Promise<T> => {
  if (condition) {
    const data = ttlCache.get<T>(key);
    if (data) return data;
  }
  const data = await queryFn;
  if (condition) ttlCache.set(key, data, { ttl });
  return data;
};
