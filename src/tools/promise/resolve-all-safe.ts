import { resolveAllBase } from './resolve-all-base';

/**
 * Resolves an array of promises and suppresses any rejections.
 *
 * @template T The tuple of promise-returning values to resolve.
 * @param promises An array of promises to run in parallel.
 *
 * @returns A Promise that resolves to an array of results with `null` in place of any rejected promises.
 *
 * @example
 * const results = await resolveAllSafe([fetchA(), fetchB(), fetchC()]);
 * // results: [dataA, null, dataC] if fetchB fails
 *
 * @note Use when you care about collecting as many successful results as possible,
 *       and failure isn't a showstopper.
 *
 * @tip It’s okay if you mess up, just try.
 */

export const resolveAllSafe = <T extends readonly unknown[] | []>(
  promises: [...T],
): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> | null }> =>
  resolveAllBase(promises, { suppressErrors: true });
