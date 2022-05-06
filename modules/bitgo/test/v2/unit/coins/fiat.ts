import 'should';
import { CoinFamily, coins, NetworkType } from '@bitgo/statics';

describe('fiat coins', function () {
  it('has expected network type', function () {
    coins.forEach((coin) => { 
      if (!coin.isToken && coin.family === CoinFamily.FIAT) {
        if (coin.name.startsWith('fiat')) {
          coin.network.type.should.eql(NetworkType.MAINNET);
        } else if (coin.name.startsWith('tfiat')) {
          coin.network.type.should.eql(NetworkType.TESTNET);
        } else {
          throw new Error(`Ivalid coin name: ${coin.name} should start with fiat or with tfiat`);
        }
      }
    });
  });
});
