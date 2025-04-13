import { PROMISE_FULFILLED } from '../../constants';
import { IPromiseHandlerOptions } from '../../interfaces';
import { map } from '../../utils';

/**
 * Executes an array of promises and returns their resolved values.
 *
 * @template T The tuple of promise-returning values to resolve.
 * @param promises An array of promise-like values.
 * @param options Configuration object:
 *   - `suppressErrors`: If `true`, errors will be suppressed and replaced with `null`.
 *                        If `false`, the first rejection will be thrown immediately.
 *
 * @returns A Promise that resolves to an array of results matching the input tuple's shape.
 *          If `suppressErrors` is true, rejected values are `null`.
 *
 * @throws If `suppressErrors` is false and any promise rejects, the rejection is thrown.
 *
 * @example
 * const results = await resolveAllBase([promise1, promise2], { suppressErrors: true });
 *
 * @tip The engine room of promise handling: it powers the show, whether you want to forgive errors or not.
 */
// should not be exported in index
export const resolveAllBase = async <T extends readonly unknown[] | []>(
  promises: [...T],
  options: IPromiseHandlerOptions = {},
): Promise<{
  -readonly [P in keyof T]: Awaited<T[P]> | (null extends Awaited<T[P]> ? null : null);
}> => {
  const { suppressErrors = false } = options;
  const results = await Promise.allSettled(promises);

  return map(results, (res) => {
    if (res.status === PROMISE_FULFILLED) return res.value;
    if (!suppressErrors) throw res.reason;
    return null;
  }) as { -readonly [P in keyof T]: Awaited<T[P]> | null };
};
