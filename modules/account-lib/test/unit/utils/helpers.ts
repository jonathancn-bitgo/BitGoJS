// import { secp256k1 } from '../../../src/mpc/curves';
import { modulo } from '../../../src/utils/helpers';

// const secp256k1Order = new secp256k1().order();
const _0n = BigInt(0);
const _1n = BigInt(1);
const _2n = BigInt(2);
const _3n = BigInt(3);
const _4n = BigInt(4);
const _5n = BigInt(5);
const _6n = BigInt(6);

describe('helper function tests', function () {
  it('should properly calculate the correct modulus', function () {
    const testOne = modulo(_1n, _3n);
    testOne.should.equal(_1n);

    const testTwo = modulo(-_1n, _3n);
    testTwo.should.equal(_2n);

    const testThree = modulo(-_4n, _3n);
    testThree.should.equal(_2n);

    const testFour = modulo(-_5n, _3n);
    testFour.should.equal(_1n);

    const testFive = modulo(-_6n, _3n);
    testFive.should.equal(_0n);
  });

  //   it('should properly calculate modular inverse', function () {
  //     const testOne = modInverse(_3n, secp256k1Order);
  //     testOne.should.equal(BigInt(77194726158210796949047323339125271901891709519383269588403442094345440996225));
  //   });
});
