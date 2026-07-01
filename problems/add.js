/*

A simple function which adds two numbers.

*/

export default function add(n, m) {
  if (typeof n !== 'number' || typeof m !== 'number') {
    throw 'hello';
  }

  return n + m;
  // Your code here
}
