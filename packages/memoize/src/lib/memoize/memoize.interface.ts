/* eslint-disable @typescript-eslint/no-explicit-any */
import { VariableArgs } from '../shared.interface';

export interface MemoizeStringify {
    /** Defaults to: @ows/better-stringify */
    stringify: (value: any, ...args: any[]) => string;
    /** Arguments for `stringify` */
    args?: any[];
}

export type MemoizeCallback<T extends (...args: P) => R = (...args: any[]) => any, P extends any[] = any[], R = any> = (
    ...args: Parameters<T>
) => ReturnType<T>;
export type MemoizeRecursiveCallback<
    T extends (...args: VariableArgs<T, P>) => R = (...args: any[]) => any,
    P extends any[] = any[],
    R = any
> = (...args: Parameters<T>) => ReturnType<T>;
export type MemoizeAsyncCallback<
    T extends (...args: P) => Promise<R> = (...args: any[]) => Promise<any>,
    P extends any[] = any[],
    R extends Promise<any> = Promise<any>
> = (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>;
export type MemoizeAsyncRecursiveCallback<
    T extends (...args: VariableArgs<T, P>) => Promise<R> = (...args: any[]) => Promise<any>,
    P extends any[] = any[],
    R extends Promise<any> = Promise<any>
> = (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>;

export type MemoizedFunction<T extends MemoizeCallback> = (...args: Parameters<T>) => ReturnType<T>;
export type MemoizedRecursiveFunction<T extends MemoizeRecursiveCallback> = (...args: Parameters<T>) => ReturnType<T>;
export type MemoizedAsyncFunction<T extends MemoizeAsyncCallback> = (
    ...args: Parameters<T>
) => Promise<Awaited<ReturnType<T>>>;

export type MemoizedAsyncRecursiveFunction<T extends MemoizeAsyncRecursiveCallback> = (
    ...args: Parameters<T>
) => Promise<Awaited<ReturnType<T>>>;
