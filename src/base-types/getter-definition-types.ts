import {
  Getter,
  Getter1,
  Getter2,
  Getter3,
  Selector,
  Selector1,
  Selector2,
  Selector3,
} from './core-types';

// ---------------------------------------------------------------------------------------------------------------------
// Fluent API (builders)

export interface GetterNameDefinition<S, R> extends GetterDefinitionBuilder0<S, R> {
  params(): GetterNameDefinition<S, R>;
  param<A1>(): GetterDefinitionBuilder1<S, R, A1>;
  one<A1>(): GetterDefinitionBuilder1<S, R, A1>;
  two<A1, A2>(): GetterDefinitionBuilder2<S, R, A1, A2>;
  three<A1, A2, A3>(): GetterDefinitionBuilder3<S, R, A1, A2, A3>;
}

export interface GetterDefinitionBuilder0<S, R> {
  <V>(selector: Selector<S, V>): SelectorDefinition0<S, R, V>;
  selector<V>(selector: Selector<S, V>): SelectorDefinition0<S, R, V>;
  getter<V>(getter: Getter<S, R, V>): GetterDefinition0<S, R, V>;
}

export interface GetterDefinitionBuilder1<S, R, A1> {
  selector<V>(selector: Selector1<S, V, A1>): SelectorDefinition1<S, R, V, A1>;
  getter<V>(getter: Getter1<S, R, V, A1>): GetterDefinition1<S, R, V, A1>;
}

export interface GetterDefinitionBuilder2<S, R, A1, A2> {
  selector<V>(selector: Selector2<S, V, A1, A2>): SelectorDefinition2<S, R, V, A1, A2>;
  getter<V>(getter: Getter2<S, R, V, A1, A2>): GetterDefinition2<S, R, V, A1, A2>;
}

export interface GetterDefinitionBuilder3<S, R, A1, A2, A3> {
  selector<V>(selector: Selector3<S, V, A1, A2, A3>): SelectorDefinition3<S, R, V, A1, A2, A3>;
  getter<V>(getter: Getter3<S, R, V, A1, A2, A3>): GetterDefinition3<S, R, V, A1, A2, A3>;
}

// ---------------------------------------------------------------------------------------------------------------------
// Final definitions (builders' output)

export interface BaseGetterDefinition {
  getterFullName: string;
  getterShortName: string;
  toString(): string;
}

// Selector definitions

export interface SelectorDefinitionAny extends BaseGetterDefinition {
  type: 'selector-definition';
}

export type SelectorDefinition0<S, R, V> = SelectorDefinitionAny & Selector<R, V> & {
  params: 0;
  selector: Selector<S, V>;
  getter: Getter<S, R, V>;
};

export type SelectorDefinition1<S, R, V, A1> = SelectorDefinitionAny & Selector1<R, V, A1> & {
  params: 1;
  selector: Selector1<S, V, A1>;
  getter: Getter1<S, R, V, A1>;
};

export type SelectorDefinition2<S, R, V, A1, A2> = SelectorDefinitionAny & Selector2<R, V, A1, A2> & {
  params: 2;
  selector: Selector2<S, V, A1, A2>;
  getter: Getter2<S, R, V, A1, A2>;
};

export type SelectorDefinition3<S, R, V, A1, A2, A3> = SelectorDefinitionAny & Selector3<R, V, A1, A2, A3> & {
  params: 3;
  selector: Selector3<S, V, A1, A2, A3>;
  getter: Getter3<S, R, V, A1, A2, A3>;
};

// Getter definitions

export interface GetterDefinitionAny extends BaseGetterDefinition {
  type: 'getter-definition';
}

export type GetterDefinition0<S, R, V> = GetterDefinitionAny & {
  params: 0;
  getter: Getter<S, R, V>;
};

export type GetterDefinition1<S, R, V, A1> = GetterDefinitionAny & {
  params: 1;
  getter: Getter1<S, R, V, A1>;
};

export type GetterDefinition2<S, R, V, A1, A2> = GetterDefinitionAny & {
  params: 2;
  getter: Getter2<S, R, V, A1, A2>;
};

export type GetterDefinition3<S, R, V, A1, A2, A3> = GetterDefinitionAny & {
  params: 3;
  getter: Getter3<S, R, V, A1, A2, A3>;
};

// Union type

export type GetterDefinition<S, R, V, A1 = void, A2 = void, A3 = void> =
  | SelectorDefinition0<S, R, V>
  | SelectorDefinition1<S, R, V, A1>
  | SelectorDefinition2<S, R, V, A1, A2>
  | SelectorDefinition3<S, R, V, A1, A2, A3>
  | GetterDefinition0<S, R, V>
  | GetterDefinition1<S, R, V, A1>
  | GetterDefinition2<S, R, V, A1, A2>
  | GetterDefinition3<S, R, V, A1, A2, A3>;

// ---------------------------------------------------------------------------------------------------------------------
// Type guards

export function isGetterDefinition(x): x is GetterDefinition<unknown, unknown, unknown, unknown, unknown, unknown> {
  return typeof x.type === 'string'
    && typeof x.params === 'number'
    && typeof x.getter === 'function'
    && typeof x.getterFullName === 'string'
    && typeof x.getterShortName === 'string'
    && typeof x.toString === 'function';
}
