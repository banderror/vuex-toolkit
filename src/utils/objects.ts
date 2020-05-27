/**
 * Check for plain object.
 *
 * @param {Mixed} val
 * @return {Boolean}
 */
export function isObject(val) {
  return val.constructor === Object;
}

/**
 * Check if `obj` is a promise.
 *
 * @param {Object} obj
 * @return {Boolean}
 */
export function isPromise(obj) {
  // eslint-disable-next-line eqeqeq
  return typeof obj.then == 'function';
}

/**
 * Check if `obj` is a generator.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 */
export function isGenerator(obj) {
  // eslint-disable-next-line eqeqeq
  return typeof obj.next == 'function' && typeof obj.throw == 'function';
}

/**
 * Check if `obj` is a generator function.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 */
export function isGeneratorFunction(obj) {
  const { constructor } = obj;
  if (!constructor) return false;
  if (constructor.name === 'GeneratorFunction' || constructor.displayName === 'GeneratorFunction') return true;
  return isGenerator(constructor.prototype);
}
