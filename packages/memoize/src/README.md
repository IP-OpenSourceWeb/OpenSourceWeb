# @OSW/Memoize

Fastest memoize library available.

## Table of contents

- [@OSW/Memoize](#oswmemoize)
  - [Table of contents](#table-of-contents)
  - [Features:](#features)
  - [Usage](#usage)
    - [API](#api)
    - [Options](#options)
  - [Example](#example)
  - [Building](#building)
  - [Running unit tests](#running-unit-tests)
- [Roadmap](#roadmap)
  - [Nice to have](#nice-to-have)
- [Limitations](#limitations)

## Features:

-   Simple and fully typed API
-   Highly customizable
-   Preserves the types of the memoized functions and methods
-   Treeshake-able
-   Lightweight
    -   2.8 KB unminified without dependencies
    -   2.5 KB minified with bundled dependencies
    -   1 KB gzipped and minified with bundled dependencies
-   Compatible with all module systems available - ESM, CJS, AMD, System, UMD, etc.

## Usage

### API

Memoizing a usual non recursive function:

```ts
const memoizedFunction = memoize(yourFunction);
memoizedFunction(param1,param2,...);
```
If the function you're trying to memoize proves to be more of a headache than anticipated there are more direct methods of accomplishing this task, and options that will be explained.

For recursive functions:

```ts
const memoizedFunction = memoize(yourFunction);
memoizedFunction(param1,param2,...);
```

### Options

| Option                                              | Description                                                                                                                                     | Usage                                                                                                                               |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| async :   bool                                      | Sets the type of function   (sync/async)                                                                                                        |                                                                                                                                     |
| recursive   : bool                                  | Sets the type of function   (recursive/non-recursive)                                                                                           |                                                                                                                                     |
| thisArg   : any                                     | Sets the "this"   argument of the function. Must be used for methods, inside the class.                                                         | memoizedMethod =   memoize(this.yourMethod, { thisArg: this });                                                                     |
| stringify                                           | No clue how this works                                                                                                                          |                                                                                                                                     |
| store :   IMemoizeStoreOptions                      | Custom store that can be used   externally. Defaults to: Map                                                                                    | const yourStore = new   Map();<br>     memoizedFunction = memoize(yourFunction, { store: yourStore });                              |
| size :   IMemoizeStoreSize   *                      |  Size options - Defaults to: undefined -   infinite size                                                                                        | memoizedFunction =   memoize(yourFunction, { size: { max: 2, removeStrategy: 'clear'   });                                          |
| time :   IMemoizeStoreTime   **                     | Storage time options. Defaults   to: undefined - infinite time span                                                                             | const store = new MemoizeStore(   time: { max: 3,period: 1, unit: 's' } );<br>     memoizedFunction = memoize(yourFunction, store); |

*For size there is:

| Field                                               | Description                                                                                                                                     | Usage                                                                 |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| size.max   : number                                 | Maximum number of entries   allowed in the store                                                                                                | const store = new MemoizeStore(   size: { max: 2 });                  |
| size.removeStrategy   : IMemoizeStoreRemoveStrategy |  Remove strategy if the storage is full.   Defaults to: 'oldest' which enforces a LRU caching strategy. Available   options 'clear' \| 'oldest' | const store = new MemoizeStore(   size: { removeStrategy: 'clear' }); |

**For time there is:

| Field                                | Description                                                                                         | Usage                                                    |
|--------------------------------------|-----------------------------------------------------------------------------------------------------|----------------------------------------------------------|
| time.max   : number                  | Maximum time allowed. Defaults   to: 'NaN'                                                          | const store = new MemoizeStore(   time: { max: 3 } );    |
| time.period   : number               | Periodically clear the expired   entries. Uses the same time unit as `max` - Defaults to undefined  | const store = new MemoizeStore(   time: { period: 1} );  |
| time.unit   : IMemoizeStoreTimeUnits | Time unit - Defaults to: 'ms'.   Available options 'ms', 's', 'm', 'h', 'd'                         | const store = new MemoizeStore(   time: { unit: 's' } ); |

## Example

```ts

```

## Building

Run `nx build memoize` to build the library.

## Running unit tests

Run `nx test memoize` to execute the unit tests via [Jest](https://jestjs.io).

# Roadmap

-   ~~Add scheduled cleaning of expired entries~~.
-   Add logging capabilities
-   Add unintrusive getLength function to sync the length with the internal store in cases that the custom store is updated externally.
-   ~~Add async/await memoization~~
-   ~~Add recursive memoization~~
-   Improve recursive memoization to support:
    -   ~~async functions - implementation, tests~~
    -   ~~generator functions - implementation tests~~,
    -   ~~anonymous functions - implementation, tests~~
    -   ~~outer scope variables - implementation, tests~~
-   Add rxjs operator
-   Add onAdd, onDelete events
-   Custom invalidation

## Nice to have

-   Recursive function memoization without needing additional parameters
-   ~~Autodetect async functions~~
-   ~~Unite all memoization types under the same API with correct type inference~~
-   Disable input for env.
-   Statistics - E.g. https://github.com/medikoo/memoizee#profiling--statistics

# Limitations

-   Recursive functions need to have as a last parameter an optional parameter that is the recursive callback or need to be reimplemented using an anon
-   Generator functions are supported through the `memoize` function for both sync and async functions. For the same parameters they will return the cached generator so the `next` value will not be restarted when you create a new generator, transforming the memoized generator into a singleton.

```typescript
    function* add(a: number, b: number) {
        yield a + b;
        yield 99999;
    },

    const memoized = memoize(fn);
    const memoizedGenerator = memoized(1, 2);
    const newMemoizedGenerator = memoized(1, 2);

    memoizedGenerator.next() // Return  { "done": false, "value": 3}
    newMemoizedGenerator.next() // Return  { "done": false, "value": 99999}
```
