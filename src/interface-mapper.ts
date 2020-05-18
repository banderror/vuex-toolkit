/* eslint-disable @typescript-eslint/no-explicit-any */

import { Store } from 'vuex';
import { Saga } from 'redux-saga';
import {
  MessageDefinition,
  MutationDefinition,
  ActionDefinition,
  GetterDefinition,
  isMutationDefinition,
  isActionDefinition,
  isGetterDefinition,
} from './base-types';

import { isGeneratorFunction } from '../objects';

// ---------------------------------------------------------------------------------------------------------------------
// API

export type InterfaceMapper<T> = (mapping: InterfaceMapping<T>) => InterfaceAdapterFactory<T>;

export type InterfaceMapping<T> = {
  [P in keyof T]: InterfaceMappingValue;
};

export type InterfaceMappingValue =
  | MessageDefinition<any>
  | GetterDefinition<any, any, any, any, any, any>
  | Saga;

export interface InterfaceAdapterFactory<T> {
  readonly create: (store: Store<any>) => T;
}

// ---------------------------------------------------------------------------------------------------------------------
// Implementation

function mapMutation(key: string, def: MutationDefinition<any>, store: Store<any>) {
  return {
    [key]: (payload): void => {
      const mutation = def(payload) as any;
      store.commit(mutation.type, mutation.payload);
    },
  };
}

function mapAction(key: string, def: ActionDefinition<any>, store: Store<any>) {
  return {
    [key]: (payload): Promise<any> => {
      const action = def(payload) as any;
      return store.dispatch(action.type, action.payload);
    },
  };
}

function mapGetter(key: string, def: GetterDefinition<any, any, any, any, any, any>, store: Store<any>) {
  return {
    [key]: (...args) => {
      if (args.length) {
        const getter = store.getters[def.getterFullName];
        return getter(...args);
      }

      return store.getters[def.getterFullName];
    },
  };
}

function mapSaga(key: string, saga: Saga, store: any) {
  return {
    [key]: (...args): Promise<any> => store.run(saga, ...args),
  };
}

// TODO: Decouple it from sagas by abstracting mappers and passing them via config.
const isSaga = (x): x is Saga => isGeneratorFunction(x);

function transformMapping(key: string, value: InterfaceMappingValue, store: Store<any>) {
  if (isMutationDefinition(value)) {
    return mapMutation(key, value, store);
  }
  if (isActionDefinition(value)) {
    return mapAction(key, value, store);
  }
  if (isGetterDefinition(value)) {
    return mapGetter(key, value, store);
  }
  if (isSaga(value)) {
    return mapSaga(key, value, store);
  }
  return {};
}

export function interfaceMapper<T>(mapping: InterfaceMapping<T>): InterfaceAdapterFactory<T> {
  return {
    create(store: Store<any>): T {
      const pairs = Object.entries<InterfaceMappingValue>(mapping);
      const adapters = pairs.map(([k, v]) => transformMapping(k, v, store));
      return Object.assign({}, ...adapters);
    },
  };
}
