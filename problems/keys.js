/*

Returns a list containing the names of all the enumerable own properties of the supplied object.

Note: the order of the output array is not guaranteed to be consistent across different JS platforms.

*/

import { each } from '.';

export default function keys(object) {
  const result = [];
  each(object, (i, key) => result.push(String(key)));
  return result;
}
