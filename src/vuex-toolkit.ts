/* eslint-disable @typescript-eslint/no-explicit-any */

import { Module } from 'vuex';
import { ModuleDefinition } from './base-types';
import { NamespaceInfo } from './namespace-info';
import { Namespace, createNamespace } from './namespace';
import { interfaceMapper, InterfaceMapping, InterfaceAdapterFactory } from './interface-mapper';

export class VuexToolkit {
  /** Creates a top-level namespace for defining modules and/or nested namespaces within it) */
  public static namespace(name: string): Namespace {
    const info = NamespaceInfo.topLevel(name);
    return createNamespace(info);
  }

  /** Creates a top-level module in the global namespace */
  public static module<S, R = unknown>(name: string, initialState?: S): ModuleDefinition<S, R> {
    const info = NamespaceInfo.global();
    const namespace = createNamespace(info);
    return namespace.module(name, initialState);
  }

  /** Combines module definitions into a single native Vuex module */
  public static combineModules(...definitions: ModuleDefinition<any, any>[]): Module<any, any> {
    const modulesMap = definitions
      .map(definition => ({
        [definition.name]: definition.toNativeVuexModule(),
      }))
      .reduce((result, value) => Object.assign(result, value), {});

    return {
      modules: modulesMap,
    };
  }

  /**
   * Maps definitions of mutations, actions, getters and other things to corresponding modules in Vuex store.
   * Hides the complexity (of committing the mutations, actions, calling getters etc)
   * behind a simple adapter with a known interface (so this thing is TypeScript-friendly).
   */
  public static interface<T>(mapping: InterfaceMapping<T>): InterfaceAdapterFactory<T> {
    return interfaceMapper(mapping);
  }
}
