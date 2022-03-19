import { performance as nodePerformance } from 'perf_hooks';

import { MemoizeAsyncCallback, MemoizeCallback } from './memoize/memoize.interface';

export function splitAtFirstInstance(str: string, delimiter: string) {
    const idx = str.indexOf(delimiter);
    return [str.slice(0, idx), str.slice(idx + 1)];
}

export function measureTimeMs(
    callback: () => unknown,
    performance = (globalThis as any).performance ?? nodePerformance
) {
    const time = performance.now();
    callback();
    return performance.now() - time;
}

export async function measureTimeMsAsync(
    callback: () => Promise<unknown>,
    performance = (globalThis as any).performance ?? nodePerformance
) {
    const time = performance.now();
    await callback();
    return performance.now() - time;
}

export function warnTransformedCode(message: string) {
    const initialMessage = `Cannot detect async functions. Memoization will default to sync usage.
    Possible causes are: 
    - Older versions of Javascript (ES5, ES3)
    - Transpiled code (Babel, Typescript, etc.) to older Javascript targets (ES5, ES3)
    - Patched globals    
`;
    if (detectNativeAsyncFunctionsAvailable()) console.warn(initialMessage, message);
}

const asyncFunction = (async () => {
    return Promise.resolve();
}).constructor;
const generatorFunction = function* () {
    yield;
}.constructor;

/** Detects if native async functions are available */
export function detectNativeAsyncFunctionsAvailable() {
    return !(asyncFunction !== Function && asyncFunction !== generatorFunction);
}

/** Detects async functions. Defaults to false if detection cannot be performed. */
export function isAsyncFunction<T extends MemoizeCallback | MemoizeAsyncCallback>(fn: T) {
    return !detectNativeAsyncFunctionsAvailable() && fn instanceof asyncFunction;
}

// export function isGeneratorFunction(fn: Function) {
//     const generatorFunction = function* () {
//         yield undefined;
//     }.constructor;
//     return fn instanceof generatorFunction;
// }



let a: boolean;

a = true;