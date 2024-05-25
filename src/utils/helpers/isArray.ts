import { PlainObject, isPlainObject } from './isPlainObject';

export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

export function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}
