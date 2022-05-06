import BigNumber from 'bignumber.js';

const _0n = BigInt(0);
const _1n = BigInt(1);
/**
 * Modulo operator
 * @description In Js % gives you the reminder but in languages like in python
 * % gives you the modulus. Both operations are equivalent when the signs of the number
 * is same but gives different results in the case its not. This functions
 * handles modulo operation like in python
 * @param {bigint} a
 * @param {bigint} n
 * @returns {bigint}
 */
export function modulo(a: bigint, n: bigint): bigint {
  return ((a % n) + n) % n;
}

export function div(a: bigint, b: bigint): bigint {
  const _a = new BigNumber(a.toString());
  const _b = new BigNumber(b.toString());
  return BigInt(Math.floor(parseInt(_a.div(_b).toString(), 10)));
}
/**
 * Euclid extended gcd algorithm
 * @param {bigint} a
 * @param {bigint} mod
 * @param {bigint} x
 * @param {bigint} y
 * @returns {Array<bigint>} [gcd,x,y]
 */
export function xgcd(a: bigint, mod: bigint, x: bigint = _0n, y: bigint = _0n): Array<bigint> {
  if (a === _0n) {
    return [mod, _0n, _1n];
  }
  const gcd = xgcd(modulo(mod, a), a, x, y);
  x = gcd[2] - (mod / a) * gcd[1];
  y = gcd[1];

  return [gcd[0], x, y];
}

/**
 * Performs modular arithmetic inverse
 * @param {bigint} a
 * @param {bigint} mod
 * @returns {bigint}
 */
export function modInverse(a: bigint, mod: bigint): bigint {
  const g = xgcd(a, mod);
  if (g[0] !== _1n) {
    throw "Inverse doesn't exist";
  } else {
    return modulo(g[1], mod);
  }
}
