/* eslint-disable @typescript-eslint/no-explicit-any */

export type Map<T = any> = Record<string, T>;

export type IfVoid<P, True, False> = [void] extends [P] ? True : False;
