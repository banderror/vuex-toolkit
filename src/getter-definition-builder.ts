/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */

import { Binder } from '../binder';
import { NamespaceInfo } from './namespace-info';
import {
  GetterNameDefinition,
  GetterDefinitionBuilder0,
  GetterDefinitionBuilder1,
  GetterDefinitionBuilder2,
  GetterDefinitionBuilder3,
  GetterDefinition,
  SelectorDefinition0,
  SelectorDefinition1,
  SelectorDefinition2,
  SelectorDefinition3,
  GetterDefinition0,
  GetterDefinition1,
  GetterDefinition2,
  GetterDefinition3,
  Selector,
  Selector1,
  Selector2,
  Selector3,
  Getter,
  Getter1,
  Getter2,
  Getter3,
} from './base-types';

import {
  selectorToGetter,
  selectorToGetterN,
  selectorToRootSelector,
  selectorToRootSelectorN,
} from './getter-conversions';

type RegisterGetterCallback<S, R> = (getter: GetterDefinition<S, R, any, any, any, any>) => void;

export class GetterDefinitionBuilder<S, R> {
  private readonly _modulePath: string[];
  private readonly _getterFullName: string;
  private readonly _getterShortName: string;
  private readonly _registerGetter: RegisterGetterCallback<S, R>;

  public constructor(
    moduleNamespace: NamespaceInfo,
    getterName: string,
    registerGetter: RegisterGetterCallback<S, R>,
  ) {
    this._modulePath = moduleNamespace.segments;
    this._getterFullName = moduleNamespace.appendAndGetPath(getterName);
    this._getterShortName = getterName;
    this._registerGetter = registerGetter;

    Binder.bindAllMethods(this);
  }

  public getterNameDefinition(): GetterNameDefinition<S, R> {
    const result = this.getterDefBuilder0() as GetterNameDefinition<S, R>;

    result.params = () => result;
    result.param = <A1>() => this.getterDefBuilder1<A1>();
    result.one = <A1>() => this.getterDefBuilder1<A1>();
    result.two = <A1, A2>() => this.getterDefBuilder2<A1, A2>();
    result.three = <A1, A2, A3>() => this.getterDefBuilder3<A1, A2, A3>();

    return result;
  }

  private getterDefBuilder0(): GetterDefinitionBuilder0<S, R> {
    const selector = this.selectorDef0;
    const getter = this.getterDef0;

    const result = selector as GetterDefinitionBuilder0<S, R>;
    result.selector = selector;
    result.getter = getter;
    return result;
  }

  private getterDefBuilder1<A1>(): GetterDefinitionBuilder1<S, R, A1> {
    const selector = this.selectorDef1;
    const getter = this.getterDef1;
    return { selector, getter };
  }

  private getterDefBuilder2<A1, A2>(): GetterDefinitionBuilder2<S, R, A1, A2> {
    const selector = this.selectorDef2;
    const getter = this.getterDef2;
    return { selector, getter };
  }

  private getterDefBuilder3<A1, A2, A3>(): GetterDefinitionBuilder3<S, R, A1, A2, A3> {
    const selector = this.selectorDef3;
    const getter = this.getterDef3;
    return { selector, getter };
  }

  private selectorDef0<V>(moduleSelector: Selector<S, V>): SelectorDefinition0<S, R, V> {
    const rootSelector = selectorToRootSelector<S, R, V>(moduleSelector, this._modulePath);
    const getter = selectorToGetter<S, R, V>(moduleSelector);

    const result = rootSelector as SelectorDefinition0<S, R, V>;
    this.fillSelectorDef(0, result, moduleSelector, getter);
    this._registerGetter(result);
    return result;
  }

  private selectorDef1<V, A1>(ms: Selector1<S, V, A1>): SelectorDefinition1<S, R, V, A1> {
    const rootSelector = selectorToRootSelectorN<S, R, V>(ms, this._modulePath);
    const getter = selectorToGetterN<S, R, V>(ms);

    const result = rootSelector as SelectorDefinition1<S, R, V, A1>;
    this.fillSelectorDef(1, result, ms, getter);
    this._registerGetter(result);
    return result;
  }

  private selectorDef2<V, A1, A2>(ms: Selector2<S, V, A1, A2>): SelectorDefinition2<S, R, V, A1, A2> {
    const rootSelector = selectorToRootSelectorN<S, R, V>(ms, this._modulePath);
    const getter = selectorToGetterN<S, R, V>(ms);

    const result = rootSelector as SelectorDefinition2<S, R, V, A1, A2>;
    this.fillSelectorDef(2, result, ms, getter);
    this._registerGetter(result);
    return result;
  }

  private selectorDef3<V, A1, A2, A3>(ms: Selector3<S, V, A1, A2, A3>): SelectorDefinition3<S, R, V, A1, A2, A3> {
    const rootSelector = selectorToRootSelectorN<S, R, V>(ms, this._modulePath);
    const getter = selectorToGetterN<S, R, V>(ms);

    const result = rootSelector as SelectorDefinition3<S, R, V, A1, A2, A3>;
    this.fillSelectorDef(3, result, ms, getter);
    this._registerGetter(result);
    return result;
  }

  private getterDef0<V>(moduleGetter: Getter<S, R, V>): GetterDefinition0<S, R, V> {
    const result = {} as any as GetterDefinition0<S, R, V>;
    this.fillGetterDef(0, result, moduleGetter);
    this._registerGetter(result);
    return result;
  }

  private getterDef1<V, A1>(mg: Getter1<S, R, V, A1>): GetterDefinition1<S, R, V, A1> {
    const result = {} as any as GetterDefinition1<S, R, V, A1>;
    this.fillGetterDef(1, result, mg);
    this._registerGetter(result);
    return result;
  }

  private getterDef2<V, A1, A2>(mg: Getter2<S, R, V, A1, A2>): GetterDefinition2<S, R, V, A1, A2> {
    const result = {} as any as GetterDefinition2<S, R, V, A1, A2>;
    this.fillGetterDef(2, result, mg);
    this._registerGetter(result);
    return result;
  }

  private getterDef3<V, A1, A2, A3>(mg: Getter3<S, R, V, A1, A2, A3>): GetterDefinition3<S, R, V, A1, A2, A3> {
    const result = {} as any as GetterDefinition3<S, R, V, A1, A2, A3>;
    this.fillGetterDef(3, result, mg);
    this._registerGetter(result);
    return result;
  }

  private fillSelectorDef(params: number, definition, selector, getter) {
    definition.type = 'selector-definition';
    definition.params = params;
    definition.selector = selector;
    definition.getter = getter;
    definition.getterFullName = this._getterFullName;
    definition.getterShortName = this._getterShortName;
    definition.toString = () => this._getterFullName;
  }

  private fillGetterDef(params: number, definition, getter) {
    definition.type = 'getter-definition';
    definition.params = params;
    definition.getter = getter;
    definition.getterFullName = this._getterFullName;
    definition.getterShortName = this._getterShortName;
    definition.toString = () => this._getterFullName;
  }
}
