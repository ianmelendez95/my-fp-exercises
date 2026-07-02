/*

Returns true if its arguments are equivalent, false otherwise.
For arrays and objects, it should do a shallow equality
for each property or item in each collection.

Challenge: for the challenging version, you will need to do a deep
equality on objects and arrays.  This will require recursion. You
will also need to handle cyclical objects.

*/

// import { keys, reduce } from '.';
import { keys } from '.';

// Known to be an array of strings
function _keysEqual(keysA, keysB) {
  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    if (keysA[i] !== keysB[i]) {
      return false;
    }
  }

  return true;
}

function _arrayEquals(arrA, arrB) {
  if (arrA.length !== arrB.length) {
    return false;
  }

  for (let i = 0; i < arrA.length; i++) {
    if (!equals(arrA[i], arrB[i])) {
      return false;
    }
  }

  return true;
}

function _objectEquals(valA, valB) {
  // nulls
  if (valA === null || valB === null) {
    return valA === valB;
  }

  // arrays
  if (typeof valA.length === 'number' || typeof valB.length === 'number') {
    return valA.length === valB.length && _arrayEquals(valA, valB);
  }

  // otherwise, objects
  const aKeys = keys(valA);
  const bKeys = keys(valB);

  aKeys.sort();
  bKeys.sort();

  if (!_arrayEquals(aKeys, bKeys)) {
    return false;
  }

  for (const key of aKeys) {
    if (!equals(valA[key], valB[key])) {
      return false;
    }
  }

  return true;
}

export default function equals(valA, valB) {
  const aType = typeof valA;
  const bType = typeof valB;

  if (aType !== bType) {
    return false;
  }

  switch (aType) {
    case 'undefined':
      return true;

    case 'string':
    case 'boolean':
    case 'symbol':
    case 'function':
    case 'number':
    case 'bigint':
      return valA === valB;

    case 'object':
      return _objectEquals(valA, valB);

    default:
      throw new Error();
  }
}
