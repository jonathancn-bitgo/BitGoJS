/**
 * @prettier
 */
import { secp256k1 } from '../../../../src/mpc/curves';

describe('secp256k1 curve implementation', function () {
  const sec256k1 = new secp256k1();
  const testValue = BigInt(12000);
  it('should correctly perform scalar add', function () {
    const valueOne = sec256k1.scalarAdd(sec256k1.order(), testValue);
    valueOne.should.equal(testValue);
    const valueTwo = sec256k1.scalarAdd(BigInt(5), testValue);
    valueTwo.should.equal(BigInt(5) + testValue);
  });

  it('should correctly perform scalar sub', function () {
    const valueOne = sec256k1.scalarSub(sec256k1.order() + BigInt(2) * testValue, testValue);
    valueOne.should.equal(testValue);
    const valueTwo = sec256k1.scalarSub(BigInt(5), testValue);
    valueTwo.should.equal(sec256k1.order() + (BigInt(5) - testValue));
  });

  it('should correctly perform scalar multiplication', function () {
    const valueOne = sec256k1.scalarMult(sec256k1.order(), testValue);
    valueOne.should.equal(BigInt(0));
    const valueTwo = sec256k1.scalarMult(BigInt(5), testValue);
    valueTwo.should.equal(BigInt(5) * testValue);
  });

  it('should correctly perform scalar reduce', function () {
    const valueOne = sec256k1.scalarReduce(sec256k1.order() + testValue);
    valueOne.should.equal(testValue);
    const valueTwo = sec256k1.scalarReduce(sec256k1.order() - testValue);
    valueTwo.should.equal(sec256k1.order() - testValue);
  });
  it('should correctly perform scalar negate', function () {
    const valueOne = sec256k1.scalarNegate(sec256k1.order() + testValue);
    valueOne.should.equal(sec256k1.order() - testValue);
    const valueTwo = sec256k1.scalarNegate(sec256k1.order() - testValue);
    valueTwo.should.equal(testValue);
  });

  it('should have the correct curve order', function () {
    const curveOrder = sec256k1.order().toString();
    curveOrder.should.equal('115792089237316195423570985008687907852837564279074904382605163141518161494337');
  });
});
