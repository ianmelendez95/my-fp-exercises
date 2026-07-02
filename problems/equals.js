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
// function _keysEqual(keysA, keysB) {
//   if (keysA.length !== keysB.length) {
//     return false;
//   }

//   for (let i = 0; i < keysA.length; i++) {
//     if (keysA[i] !== keysB[i]) {
//       return false;
//     }
//   }

//   return true;
// }

function _checkVisited(valA, valB, visitedA, visitedB) {
  const idxA = _indexOfStrictEqual(valA, visitedA);
  const idxB = _indexOfStrictEqual(valB, visitedB);
  if (idxA < 0 && idxB < 0) {
    return null;
  }

  if (idxA >= 0 && visitedB[idxA] === valB) {
    return true;
  }

  return idxB >= 0 && visitedA[idxB] === valA;
}

function _arrayEquals(arrA, arrB, visitedA = [], visitedB = []) {
  if (arrA.length !== arrB.length) {
    return false;
  }

  for (let i = 0; i < arrA.length; i++) {
    const valA = arrA[i];
    const valB = arrB[i];

    const visited = _checkVisited(valA, valB, visitedA, visitedB);
    if (visited !== null) {
      // cycle detected
      return visited;
    }

    if (!equals(valA, valB, visitedA.concat([valA]), visitedB.concat([valB]))) {
      return false;
    }
  }

  return true;
}

function _indexOfStrictEqual(x, xs) {
  for (let i = 0; i < xs.length; i++) {
    if (xs[i] === x) {
      return i;
    }
  }

  return -1;
}

// function _anyStrictEqual(x, xs) {
//   for (const elem of xs) {
//     if (elem === x) {
//       return true;
//     }
//   }

//   return false;
// }

function _objectEquals(valA, valB, visitedA = [], visitedB = []) {
  // nulls
  if (valA === null || valB === null) {
    return valA === valB;
  }

  const visited = _checkVisited(valA, valB, visitedA, visitedB);
  if (visited !== null) {
    // cycle detected
    return visited;
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
    if (!_equalsVisited(valB[key], valA[key], visitedA.concat([valA]), visitedB.concat([valB]))) {
      return false;
    }
  }

  return true;
}

function _equalsVisited(valA, valB, visitedA = [], visitedB = []) {
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
      return _objectEquals(valA, valB, visitedA, visitedB);

    default:
      throw new Error();
  }
}

export default function equals(valA, valB) {
  return _equalsVisited(valA, valB, [], []);
}
