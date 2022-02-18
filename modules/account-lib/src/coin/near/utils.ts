import { BaseUtils } from '../baseCoin';
import { KeyPair } from './keyPair';
import bs58 from 'bs58';

export class Utils implements BaseUtils {
  /** @inheritdoc */
  isValidAddress(address: string): boolean {
    return this.isValidPublicKey(address);
  }

  /** @inheritdoc */
  isValidBlockId(hash: string): boolean {
    return this.isBase58(hash, 32);
  }

  /** @inheritdoc */
  isValidPrivateKey(key: string): boolean {
    try {
      new KeyPair({ prv: key });
      return true;
    } catch {
      return false;
    }
  }

  /** @inheritdoc */
  isValidPublicKey(key: string): boolean {
    const accountIDAddressRegex = '^(([a-z\\d]+[\\-_])*[a-z\\d]+\\.)*([a-z\\d]+[\\-_])*[a-z\\d]+$';
    try {
      new RegExp(accountIDAddressRegex).test(key) || new KeyPair({ pub: key });
      return true;
    } catch {
      return false;
    }
  }

  /** @inheritdoc */
  isValidSignature(signature: string): boolean {
    return this.isBase58(signature, 64);
  }

  /** @inheritdoc */
  isValidTransactionId(txId: string): boolean {
    return this.isBase58(txId, 32);
  }

  /**
   * Check if base58 decoded string is equale to length
   *
   * @param {string} value - string to be checked
   * @param {number} length - expected decoded length
   * @return {boolean} if the string can decoded as base58 and match the expected length
   */

  isBase58(value: string, length: number): boolean {
    try {
      return !!value && bs58.decode(value).length === length;
    } catch (e) {
      return false;
    }
  }
}

const utils = new Utils();

export default utils;
