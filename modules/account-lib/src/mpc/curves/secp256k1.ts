import { ec } from 'elliptic';
import { modulo } from '../../utils/helpers';
import BaseCurve from './baseCurve';

const EC = new ec('secp256k1');

const order = BigInt(EC.curve.n.toString());

export class secp256k1 implements BaseCurve {
  scalarRandom(): bigint {
    return BigInt(0); // TODO
  }

  scalarAdd(x: bigint, y: bigint): bigint {
    return modulo(x + y, order);
  }

  scalarSub(x: bigint, y: bigint): bigint {
    return modulo(x - y, order);
  }

  scalarMult(x: bigint, y: bigint): bigint {
    return modulo(x * y, order);
  }

  scalarReduce(s: bigint): bigint {
    return modulo(s, order);
  }

  scalarNegate(s: bigint): bigint {
    return modulo(-s, order);
  }

  scalarInvert(s: bigint): bigint {
    return BigInt(0); // TODO
  }

  pointAdd(p: bigint, q: bigint): bigint {
    return p + q; // TODO
  }

  basePointMult(n: bigint): bigint {
    return BigInt(0); // TODO
  }

  verify(y: bigint, signedMessage: Buffer): Buffer {
    return Buffer.from('Todo');
  }

  order(): bigint {
    return order;
  }
}
