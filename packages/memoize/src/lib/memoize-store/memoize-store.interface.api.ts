export interface IMemoizeStore<T = unknown> {
    /** Retrieves the value from the store */
    get: (key: string) => T | undefined | null;
    /** Sets a value in the store */
    set: (key: string, value: T) => void;
    /** Removes the specified entry */
    delete: (key: string) => void;
    /** Clears the entire store */
    clear: () => void;
}
export interface IMemoizeStoreMetadata {
    /** Stores start date in unix time?? */
    addedOn: number;
}

/** User defined storage container */
export interface IMemoizeStoreOptions<T = unknown> {
    /** Custom store that can be used externally. Defaults to: Map */
    store?: IMemoizeStore<T>;
    /** Size options - Defaults to: undefined - infinite size */
    size?: IMemoizeStoreSize;
    /** Time options. Defaults to: undefined - infinite time span */
    time?: IMemoizeStoreTime;
}

/** User defined storage capacity */
export interface IMemoizeStoreSize {
    /** Maximum number of entries allowed in the store. Defaults to: 'NaN' */
    max: number;
    /** Remove strategy if the storage is full. Defaults to: 'oldest' which enforces a LRU caching strategy. Available options 'clear' | 'oldest' */
    removeStrategy?: IMemoizeStoreRemoveStrategy;
}

/** User defined storage lifespan */
export interface IMemoizeStoreTime {
    /** Maximum time allowed. Defaults to: 'NaN' */
    max: number;
    /** Periodically clear the expired entries. Uses the same time unit as `max` - Defaults to undefined */
    period?: number;
    /** Time unit - Defaults to: 'ms'. Available options 'ms', 's', 'm', 'h', 'd' */
    unit?: IMemoizeStoreTimeUnits;
}

export type IMemoizeStoreTimeUnits = 'ms' | 's' | 'm' | 'h' | 'd';
export type IMemoizeStoreRemoveStrategy = 'clear' | 'oldest';
