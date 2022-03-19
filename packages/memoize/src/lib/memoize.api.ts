import { MemoizeBaseOptions, MemoizeOptions } from './memoize.interface.api';
import { memoize as memoizeFn, memoizeAsync as memoizeAsyncFn } from './memoize/memoize';
import {
    MemoizeAsyncCallback,
    MemoizeAsyncRecursiveCallback,
    MemoizeCallback,
    MemoizedAsyncFunction,
    MemoizedAsyncRecursiveFunction,
    MemoizedFunction,
    MemoizedRecursiveFunction,
    MemoizeRecursiveCallback,
} from './memoize/memoize.interface';
import { isAsyncFunction, warnTransformedCode } from './shared';

export function memoizeLast<T extends MemoizeCallback | MemoizeAsyncCallback>(
    callback: T,
    options?: MemoizeOptions<ReturnType<T>>
) {
    return memoize(callback, { ...options, size: { max: 1 } });
}

/** All in one memoization function, selects the correct function for the options given */
export function memoize<
    T extends MemoizeCallback | MemoizeAsyncCallback,
    R extends MemoizedFunction<T> | MemoizedAsyncFunction<T> = T extends MemoizeCallback
        ? MemoizedFunction<T>
        : MemoizedAsyncFunction<T>
>(callback: T, options?: MemoizeOptions<ReturnType<T>>): R {
    if (options?.async === undefined)
        warnTransformedCode(
            'Please set the `async` flag or use the specialized functions: memoizeSync, memoizeAsync, memoizeSyncRecursive, memoizeAsyncRecursive'
        );

    const isAsync = options?.async ?? isAsyncFunction(callback);
    if (options?.recursive) {
        if (isAsync) return memoizeAsyncRecursive(callback, options) as R;
        return memoizeSyncRecursive(callback, options) as R;
    }

    if (isAsync) return memoizeAsync(callback, options) as R;
    return memoizeSync(callback, options) as R;
}

export function memoizeSync<T extends MemoizeCallback>(
    callback: T,
    options?: MemoizeBaseOptions<ReturnType<T>>
): MemoizedFunction<T> {
    return memoizeFn(callback, options);
}

export function memoizeAsync<T extends MemoizeAsyncCallback>(
    callback: T,
    options?: MemoizeBaseOptions<ReturnType<T>>
): MemoizedAsyncFunction<T> {
    return memoizeAsyncFn(callback, options);
}

export function memoizeSyncRecursive<T extends MemoizeRecursiveCallback>(
    callback: T,
    options?: MemoizeBaseOptions<ReturnType<T>>
): MemoizedRecursiveFunction<T> {
    return memoizeFn(callback, options, true);
}

export function memoizeAsyncRecursive<T extends MemoizeAsyncRecursiveCallback>(
    callback: T,
    options?: MemoizeBaseOptions<ReturnType<T>>
): MemoizedAsyncRecursiveFunction<T> {
    return memoizeAsyncFn(callback, options, true);
}
