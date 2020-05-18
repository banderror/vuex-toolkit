import { Module } from 'vuex';
import { MutationHandler, ActionHandler, MaybePayload } from './core-types';
import { MutationDefinition, ActionDefinition, BypassMessageDefinition } from './message-definition-types';
import { GetterNameDefinition } from './getter-definition-types';

export interface ModuleDefinition<S, R = unknown> {
  name: string;
  define: MessageDefinitionApi<S, R>;
  handle: HandlerDefinitionApi<S, R>;
  get: GetterDefinitionApi<S, R>;

  toNativeVuexModule(): Module<S, R>;
}

export interface MessageDefinitionApi<S, R> {
  mutation<P extends MaybePayload = void>(type: string): MutationDefinition<P>;
  action<P extends MaybePayload = void>(type: string): ActionDefinition<P>;
  message<P extends MaybePayload = void>(type: string): BypassMessageDefinition<P>;
}

export interface HandlerDefinitionApi<S, R> {
  mutation<P>(mutation: MutationDefinition<P>, handler: MutationHandler<S, P>): void;
  action<P>(action: ActionDefinition<P>, handler: ActionHandler<S, R, P>): void;
}

export interface GetterDefinitionApi<S, R> {
  (getterName: string): GetterNameDefinition<S, R>;
}
