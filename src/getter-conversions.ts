import get from 'lodash/get';
import { Selector, Getter, SelectorN, GetterN } from './base-types';

export function selectorToGetter<S, R, V>(moduleSelector: Selector<S, V>): Getter<S, R, V> {
  return state => moduleSelector(state);
}

export function selectorToGetterN<S, R, V>(moduleSelector: SelectorN<S, V>): GetterN<S, R, V> {
  return state => (...args) => moduleSelector(...args)(state);
}

export function selectorToRootSelector<S, R, V>(
  moduleSelector: Selector<S, V>,
  modulePath: string[],
): Selector<R, V> {
  return (state: R): V => {
    const moduleState = get(state, modulePath) as S;
    return moduleSelector(moduleState);
  };
}

export function selectorToRootSelectorN<S, R, V>(
  moduleSelector: SelectorN<S, V>,
  modulePath: string[],
): SelectorN<R, V> {
  return (...args) => (state: R): V => {
    const moduleState = get(state, modulePath) as S;
    return moduleSelector(...args)(moduleState);
  };
}
