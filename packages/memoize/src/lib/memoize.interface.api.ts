import { IMemoizeStoreOptions } from './memoize-store/memoize-store.interface.api';
import { MemoizeStringify } from './memoize/memoize.interface';

export interface MemoizeBaseOptions<T = unknown> extends IMemoizeStoreOptions<T> {
/** Sets the "this" argument of the function. Must be used for methods, inside the class. */
    thisArg?: any;
    stringify?: MemoizeStringify;
}

/** Type of the function to be memoized */
export interface MemoizeOptions<T = unknown> extends MemoizeBaseOptions<T> {
    async?: boolean;
    recursive?: boolean;
}
