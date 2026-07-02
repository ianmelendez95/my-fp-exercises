import * as R from 'ramda';
import { equals } from '../problems';

describe('equals', () => {
  it('should compare two values', () => {
    expect(equals(1, 1)).toBe(true);
    expect(equals(1, 2)).toBe(false);
  });

  it('should work on strings', () => {
    expect(equals('1', '1')).toBe(true);
    expect(equals('1', '2')).toBe(false);
  });

  it('should work on booleans', () => {
    expect(equals(true, true)).toBe(true);
    expect(equals(true, false)).toBe(false);
  });

  it('should work on null and undefined', () => {
    expect(equals(null, null)).toBe(true);
    expect(equals(undefined, undefined)).toBe(true);
    expect(equals(undefined, null)).toBe(false);
  });

  it('should compare two arrays', () => {
    expect(equals([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(equals([1, 2, 3], [1, '2', 3])).toBe(false);
  });

  it('should compare two objects', () => {
    expect(equals({}, {})).toBe(true);
    expect(equals({ a: 1 }, { a: 1 })).toBe(true);
    expect(equals({}, [])).toBe(false);
  });

  it('should do a deep equality on objects', () => {
    const a = { a: { two: 2, arr: [null, { c: true }] } };
    const b = { a: { two: 2, arr: [null, { c: true }] } };
    const c = { a: { three: 3, arr: [null, { c: true }] } };
    expect(equals(a, b)).toBe(true);
    expect(equals(a, c)).toBe(false);
  });

  it('should handle cyclical objects', () => {
    // const f = {};
    // const g = {};
    // const h = {};
    // const i = {};

    // f.v = g;
    // g.v = h;

    // h.v = f;
    // // i.v = f;

    // expect(R.equals(f, h)).toBe(false);

    const a = {};
    const b = {};
    a.v = a;
    b.v = b;

    expect(equals(a, {})).toBe(R.equals(a, {}));
    expect(equals(a, b)).toBe(true);

    const c = {};
    const d = {};
    const e = {};
    c.v = d;
    d.v = c;
    e.z = e;

    expect(equals(a, c)).toBe(true);
    expect(equals(c, d)).toBe(true);
    expect(equals(e, a)).toBe(false);
  });
});
