import {
  MaybePayload,
  MessageCreator,
  ROUTE_MUTATION,
  ROUTE_ACTION,
  ROUTE_BYPASS,
} from './core-types';

// ---------------------------------------------------------------------------------------------------------------------
// Types

export interface BaseMessageDefinition<P extends MaybePayload = void> extends MessageCreator<P> {
  type: string;
  messageFullType: string;
  messageShortType: string;
  toString(): string;
}

export type MutationDefinition<P extends MaybePayload = void> = BaseMessageDefinition<P> & {
  messageRoute: typeof ROUTE_MUTATION;
};

export type ActionDefinition<P extends MaybePayload = void> = BaseMessageDefinition<P> & {
  messageRoute: typeof ROUTE_ACTION;
};

export type BypassMessageDefinition<P extends MaybePayload = void> = BaseMessageDefinition<P> & {
  messageRoute: typeof ROUTE_BYPASS;
};

export type MessageDefinition<P extends MaybePayload = void> =
  | MutationDefinition<P>
  | ActionDefinition<P>
  | BypassMessageDefinition<P>;

// ---------------------------------------------------------------------------------------------------------------------
// Type guards

export function isMessageDefinition<P = unknown>(x): x is MessageDefinition<P> {
  return typeof x.type === 'string'
    && typeof x.messageFullType === 'string'
    && typeof x.messageShortType === 'string'
    && typeof x.toString === 'function';
}

export function isMutationDefinition<P = unknown>(x): x is MutationDefinition<P> {
  return x.messageRoute === ROUTE_MUTATION && isMessageDefinition<P>(x);
}

export function isActionDefinition<P = unknown>(x): x is ActionDefinition<P> {
  return x.messageRoute === ROUTE_ACTION && isMessageDefinition<P>(x);
}

export function isBypassMessageDefinition<P = unknown>(x): x is BypassMessageDefinition<P> {
  return x.messageRoute === ROUTE_BYPASS && isMessageDefinition<P>(x);
}
