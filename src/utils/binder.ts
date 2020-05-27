/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Returns an array with the names of the inherited enumerable properties of obj.
 */
function getEnumerableInheritedPropertyNames(obj) {
  const result: any[] = [];
  for (const propName in obj) { // eslint-disable-line no-restricted-syntax, guard-for-in
    result.push(propName);
  }
  return result;
}

/**
 * Returns an array with the names of the inherited properties of obj.
 */
function getAllInheritedPropertyNames(obj) {
  if ((typeof obj) !== 'object') { // null is not a problem
    throw new Error('Only objects are allowed');
  }

  const props = {};

  while (obj) {
    const proto = Object.getPrototypeOf(obj);

    Object.getOwnPropertyNames(obj).forEach(p => {
      props[p] = true;
    });
    obj = proto; // eslint-disable-line no-param-reassign
  }

  return Object.getOwnPropertyNames(props);
}

export class Binder {
  public static bindAllMethods(instance, cls?: Function) {
    const methods = this.getAllMethods(instance, cls);
    methods.forEach(mtd => {
      // eslint-disable-next-line no-param-reassign
      instance[mtd] = instance[mtd].bind(instance);
    });
  }

  public static getAllMethods(instance, cls?: Function) {
    const prototype = Object.getPrototypeOf(instance);
    const ctor = cls || prototype.constructor;

    return getAllInheritedPropertyNames(instance)
      .filter(name => {
        const method = instance[name];
        return method instanceof Function && method !== ctor;
      });
  }
}
