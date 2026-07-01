/*

Calls a callback iterator(value, index/key, collection) for each element of collection.
Accepts both lists and objects.

Note: Some functions such as this one which take a list can work on either
an Array or a String

Note: 'each' does not have a return value, but rather simply runs the
callback function over each item in the input collection.

*/

export default function each(collection, callback) {
  if (typeof callback !== 'function') {
    throw new Error();
  }

  if (typeof collection === 'string' || collection.length) {
    for (let i = 0; i < collection.length; i++) {
      callback(collection[i], i, collection);
    }
  } else if (typeof collection === 'object') {
    for (const prop in collection) {
      callback(collection[prop], prop, collection);
    }
  } else {
    throw new Error();
  }
}
