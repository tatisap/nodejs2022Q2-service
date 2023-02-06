export type Property<T> = { key: keyof T; value: T[keyof T] | T[keyof T][] };
