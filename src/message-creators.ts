import {
  Payload,
  MaybePayload,
  MutationCreator,
  ActionCreator,
  BypassMessageCreator,
  ROUTE_MUTATION,
  ROUTE_ACTION,
  ROUTE_BYPASS,
} from './base-types';

const isDefined = (payload: MaybePayload): payload is Payload => payload !== undefined && payload !== null;

export function mutationCreator<P extends MaybePayload = void>(type: string): MutationCreator<P>;
export function mutationCreator(type: string) {
  return (payload: MaybePayload) => {
    if (isDefined(payload)) {
      return { type, payload, route: ROUTE_MUTATION };
    }
    return { type, route: ROUTE_MUTATION };
  };
}

export function actionCreator<P extends MaybePayload = void>(type: string): ActionCreator<P>;
export function actionCreator(type: string) {
  return (payload: MaybePayload) => {
    if (isDefined(payload)) {
      return { type, payload, route: ROUTE_ACTION };
    }
    return { type, route: ROUTE_ACTION };
  };
}

export function messageCreator<P extends MaybePayload = void>(type: string): BypassMessageCreator<P>;
export function messageCreator(type: string) {
  return (payload: MaybePayload) => {
    if (isDefined(payload)) {
      return { type, payload, route: ROUTE_BYPASS };
    }
    return { type, route: ROUTE_BYPASS };
  };
}
