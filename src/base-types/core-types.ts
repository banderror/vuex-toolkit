/* eslint-disable @typescript-eslint/no-explicit-any */

import { Store, ActionContext } from 'vuex';
import { Map, IfVoid } from './helper-types';

// ---------------------------------------------------------------------------------------------------------------------
// Message objects: mutations, actions, and "abstract" messages that bypass the store.

// Any message must have a type - its unique identifier within a Vuex store.
// Some messages can carry a payload, which should be an object.

export type Payload = Map;
export type MaybePayload = Payload | void;

export interface BareMessage {
  type: string;
}

export interface PayloadMessage<P extends Payload> extends BareMessage {
  type: string;
  payload: P;
}

export type Message<P = void> = IfVoid<P, BareMessage, PayloadMessage<P>>;

// Messages can be routed in different ways.
// The two routes in original Vuex are mutations and actions:
//  - if you commit() a mutation, it goes through the store and is picked by the corresponding handler
//  - if you dispatch() an action, it goes through the store as well
// Besides defining mutations and actions, we allow to define abstract messages
// that can bypass the store to be handled by other mechanisms: sagas, RxJS observables, etc.

export const ROUTE_MUTATION = 'mutation';
export const ROUTE_ACTION = 'action';
export const ROUTE_BYPASS = 'bypass';
export const ROUTES = [ROUTE_MUTATION, ROUTE_ACTION, ROUTE_BYPASS] as const;
export type MessageRoute = (typeof ROUTES)[number];

export type MutationObject<P extends MaybePayload = void> = Message<P> & {
  route: typeof ROUTE_MUTATION;
};

export type ActionObject<P extends MaybePayload = void> = Message<P> & {
  route: typeof ROUTE_ACTION;
};

export type BypassMessageObject<P extends MaybePayload = void> = Message<P> & {
  route: typeof ROUTE_BYPASS;
};

export type MessageObject<P extends MaybePayload = void> =
  | MutationObject<P>
  | ActionObject<P>
  | BypassMessageObject<P>;

// ---------------------------------------------------------------------------------------------------------------------
// Message creators

export interface MutationCreator<P extends MaybePayload = void, A = P> {
  (arg: A): MutationObject<P>;
}

export interface ActionCreator<P extends MaybePayload = void, A = P> {
  (arg: A): ActionObject<P>;
}

export interface BypassMessageCreator<P extends MaybePayload = void, A = P> {
  (arg: A): BypassMessageObject<P>;
}

export interface MessageCreator<P extends MaybePayload = void, A = P> {
  (arg: A): MessageObject<P>;
}

// ---------------------------------------------------------------------------------------------------------------------
// Message handlers

export type MutationHandler<S, P extends MaybePayload = void> =
  (state: S, payload: P) => void;

export type ActionHandler<S, R, P extends MaybePayload = void> =
  (this: Store<R>, context: ActionContext<S, R>, payload: P) => any;

// ---------------------------------------------------------------------------------------------------------------------
// Getters (Vuex native API) and selectors (Redux native API)

export type Getter<S, R, V> =
  (state: S, getters: any, rootState: R, rootGetters: any) => V;
export type Getter1<S, R, V, A1> =
  (state: S, getters: any, rootState: R, rootGetters: any) => (arg: A1) => V;
export type Getter2<S, R, V, A1, A2> =
  (state: S, getters: any, rootState: R, rootGetters: any) => (arg1: A1, arg2: A2) => V;
export type Getter3<S, R, V, A1, A2, A3> =
  (state: S, getters: any, rootState: R, rootGetters: any) => (arg1: A1, arg2: A2, arg3: A3) => V;
export type GetterN<S, R, V> =
  (state: S, getters: any, rootState: R, rootGetters: any) => (...args: any[]) => V;

export type Selector<S, V> = (state: S) => V;
export type Selector1<S, V, A1> = (arg: A1) => Selector<S, V>;
export type Selector2<S, V, A1, A2> = (arg1: A1, arg2: A2) => Selector<S, V>;
export type Selector3<S, V, A1, A2, A3> = (arg1: A1, arg2: A2, arg3: A3) => Selector<S, V>;
export type SelectorN<S, V> = (...args: any[]) => Selector<S, V>;
