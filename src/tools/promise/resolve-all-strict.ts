import { resolveAllBase } from './resolve-all-base';

/**
 * Resolves an array of promises and throws immediately if any reject.
 *
 * @template T The tuple of promise-returning values to resolve.
 * @param promises An array of promises to run in parallel.
 *
 * @returns A Promise that resolves to an array of fully successful results.
 *
 * @throws The first rejection encountered from the array.
 *
 * @example
 * const results = await resolveAllStrict([fetchA(), fetchB(), fetchC()]);
 * // throws if any of the three fail
 *
 * @note Use when failure in any part should cancel the whole operation.
 *
 * @tip One fails, all fail — no second chances, no survivors.
 */

export const resolveAllStrict = <T extends readonly unknown[] | []>(
  promises: [...T],
): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }> =>
  resolveAllBase(promises, { suppressErrors: false });
