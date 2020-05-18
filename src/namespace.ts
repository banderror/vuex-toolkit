import { ModuleDefinition } from './base-types';
import { ModuleDefinitionBuilder } from './module-definition-builder';
import { NamespaceInfo } from './namespace-info';

export interface Namespace {
  /** Returns full name based on local name and this namespace's path */
  (localName: string): string;

  /** Creates a new nested namespace by adding a new segment ("name") to this one */
  namespace(namespaceName: string): Namespace;

  /** Defines a module within this namespace */
  module<S, R = unknown>(moduleName: string, initialState?: S): ModuleDefinition<S, R>;
}

export const createNamespace = (info: NamespaceInfo): Namespace => {
  const result = (localName: string): string => info.appendAndGetPath(localName);

  result.namespace = (namespaceName: string): Namespace => {
    const nestedNamespaceInfo = info.append(namespaceName);
    return createNamespace(nestedNamespaceInfo);
  };

  result.module = <S, R = unknown>(moduleName: string, initialState?: S): ModuleDefinition<S, R> => {
    const nestedNamespaceInfo = info.append(moduleName);
    return new ModuleDefinitionBuilder<S, R>(nestedNamespaceInfo, initialState);
  };

  return result;
};
