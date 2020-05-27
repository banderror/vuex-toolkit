/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */

import { Module } from 'vuex';
import { NamespaceInfo } from './namespace-info';
import { mutationCreator, actionCreator, messageCreator } from './message-creators';
import {
  ModuleDefinition,
  MessageDefinitionApi,
  HandlerDefinitionApi,
  MaybePayload,
  BaseMessageDefinition,
  MutationDefinition,
  ActionDefinition,
  BypassMessageDefinition,
  ROUTE_MUTATION,
  ROUTE_ACTION,
  ROUTE_BYPASS,
  MutationHandler,
  ActionHandler,
  GetterNameDefinition,
  GetterDefinition,
} from './base-types';

import { GetterDefinitionBuilder } from './getter-definition-builder';
import { Binder } from './utils/binder';

interface MutationRegistration<S> {
  definition: MutationDefinition<any>;
  handler: MutationHandler<S, any>;
}

interface ActionRegistration<S, R> {
  definition: ActionDefinition<any>;
  handler: ActionHandler<S, R, any>;
}

export class ModuleDefinitionBuilder<S, R> implements ModuleDefinition<S, R> {
  private readonly _namespace: NamespaceInfo;
  private readonly _initialState: S | undefined;
  private readonly _mutationRegistry: MutationRegistration<S>[];
  private readonly _actionRegistry: ActionRegistration<S, R>[];
  private readonly _getterRegistry: GetterDefinition<S, R, any>[];

  public constructor(moduleNamespace: NamespaceInfo, initialState?: S) {
    this._namespace = moduleNamespace;
    this._initialState = initialState;
    this._mutationRegistry = [];
    this._actionRegistry = [];
    this._getterRegistry = [];

    Binder.bindAllMethods(this);
  }

  public get name(): string {
    return this._namespace.name;
  }

  public define: MessageDefinitionApi<S, R> = Object.freeze({
    mutation: <P extends MaybePayload = void>(type: string): MutationDefinition<P> => {
      const fullType = this._namespace.appendAndGetPath(type);
      const result = mutationCreator<P>(fullType) as MutationDefinition<P>;
      result.messageRoute = ROUTE_MUTATION;

      this.fillMessageDefinition(result, type, fullType);
      return result;
    },

    action: <P extends MaybePayload = void>(type: string): ActionDefinition<P> => {
      const fullType = this._namespace.appendAndGetPath(type);
      const result = actionCreator<P>(fullType) as ActionDefinition<P>;
      result.messageRoute = ROUTE_ACTION;

      this.fillMessageDefinition(result, type, fullType);
      return result;
    },

    message: <P extends MaybePayload = void>(type: string): BypassMessageDefinition<P> => {
      const fullType = this._namespace.appendAndGetPath(type);
      const result = messageCreator<P>(fullType) as BypassMessageDefinition<P>;
      result.messageRoute = ROUTE_BYPASS;

      this.fillMessageDefinition(result, type, fullType);
      return result;
    },
  });

  private fillMessageDefinition<P>(
    definition: BaseMessageDefinition<P>,
    shortType: string,
    fullType: string,
  ) {
    definition.type = fullType;
    definition.messageFullType = fullType;
    definition.messageShortType = shortType;
    definition.toString = () => fullType;
  }

  public handle: HandlerDefinitionApi<S, R> = Object.freeze({
    mutation: <P>(definition: MutationDefinition<P>, handler: MutationHandler<S, P>) => {
      this._mutationRegistry.push({ definition, handler });
    },

    action: <P>(definition: ActionDefinition<P>, handler: ActionHandler<S, R, P>) => {
      this._actionRegistry.push({ definition, handler });
    },
  });

  public get(getterName: string): GetterNameDefinition<S, R> {
    const builder = new GetterDefinitionBuilder<S, R>(this._namespace, getterName, this.registerGetter);
    return builder.getterNameDefinition();
  }

  private registerGetter = (getter: GetterDefinition<S, R, any>) => {
    this._getterRegistry.push(getter);
  };

  public toNativeVuexModule(): Module<S, R> {
    const merge = <T>(result: T, value: T) => Object.assign(result, value);

    const mutations = this._mutationRegistry
      .map(m => ({ [m.definition.messageFullType]: m.handler }))
      .reduce(merge, {});

    const actions = this._actionRegistry
      .map(a => ({ [a.definition.messageFullType]: a.handler }))
      .reduce(merge, {});

    const getters = this._getterRegistry
      .map(g => ({ [g.getterFullName]: g.getter }))
      .reduce(merge, {});

    return {
      namespaced: false,
      state: this._initialState,
      mutations,
      actions,
      getters,
    };
  }
}
