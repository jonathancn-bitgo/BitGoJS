/* eslint-disable */
const environment = 'custom';
const BitGoJS = require('../modules/bitgo/dist/src/index');
const bitgo = new BitGoJS.BitGo({ env: environment });
const { envs } = require('./env');

const accessToken = envs[environment].accessToken;
const coin = 'tdot';
const walletLabel = 'Test ' + coin + ' V2 Wallet - ' + (new Date()).getTime();
const walletPassphrase = 'secretpassphrase8u7y6t5r';
// const walletPassphrase = 'test';
const walletId = envs[environment].walletId;
const address = envs[environment].address;

// Create the wallet
async function createWallet() {
  console.log(accessToken);
  await bitgo.authenticateWithAccessToken({ accessToken });
  const walletOptions = {
    label: walletLabel,
    passphrase: walletPassphrase,
    walletLabel,
    walletPassphrase,
    multisigType: 'tss',
  };

  const wallet = await bitgo.coin(coin).wallets().generateWallet(walletOptions);
  const walletInstance = wallet.wallet;
  console.log(JSON.stringify(wallet));
  console.log('-----------------------------------------');
  console.log(JSON.stringify(walletInstance));

  console.log(`Wallet ID: ${walletInstance.id()}`);
  console.log(`TDOT Address: ${walletInstance.coinSpecific().rootAddress}`);

  console.log('BACK THIS UP: ');
  console.log(`User keychain encrypted xPrv: ${wallet.userKeychain.encryptedPrv}`);
}

async function getBalances(coinName, walletId) {
  console.log('WALLET ID ' + walletId);
  bitgo.authenticateWithAccessToken({ accessToken: accessToken });

  const walletInstance = await bitgo.coin(coinName).wallets().get({ id: walletId });

  console.log('Wallet ID:', walletInstance.id());
  console.log('Current Address:', walletInstance.coinSpecific().rootAddress);
  console.log('Balance:', walletInstance.balanceString());
  console.log('Confirmed Balance:', walletInstance.confirmedBalanceString());
  console.log('Spendable Balance:', walletInstance.spendableBalanceString());
}

async function listWallet(walletId) {
  await bitgo.authenticateWithAccessToken({ accessToken });

  const walletInstance = await bitgo.coin(coin).wallets().get({id: walletId});
  console.log(JSON.stringify(walletInstance, null, 2));
}

async function createAddress(walletId) {
  await bitgo.authenticateWithAccessToken({ accessToken });
  const unlock = await bitgo.unlock({ otp: '000000', duration: 3600 });
  if (!unlock) {
    console.log('We did not unlock.');
    throw new Error();
  }
  const walletInstance = await bitgo.coin(coin).wallets().get({ id: walletId });
  const res = await walletInstance.createAddress();

  console.dir(JSON.stringify(res, null, 2));
}

async function getTokenBalances(walletId) {
  await bitgo.authenticateWithAccessToken({ accessToken });

  const walletInstance = await bitgo.coin(coin).wallets().get({ id: walletId, allTokens: true });
  const walletData = walletInstance.toJSON();
  return walletData.tokens;
}

async function buildTxn(walletId, baseUnitQuantity) {
  await bitgo.authenticateWithAccessToken({ accessToken });
  const unlock = await bitgo.unlock({ otp: '000000', duration: 3600 });
  if (!unlock) {
    console.log('We did not unlock.');
    throw new Error();
  }
  const walletInstance = await bitgo.coin(coin).wallets().get({ id: walletId });

  const res = await walletInstance.prebuildAndSignTransaction({
    recipients: [
      {
        amount: baseUnitQuantity,
        address: '5H56KVtb3sSMxuhFsH51iFi1gei7tnBQjpVmj6hu9tK7CBDR',
      },
    ],
    sequenceId: '26',
    type: 'transfer',
    walletPassphrase: walletPassphrase,
  });
  console.log(res);
  console.dir('Built Transaction ' + JSON.stringify(res, null, 2));
}

async function getWalletTransfers(walletId) {
  bitgo.authenticateWithAccessToken({ accessToken: accessToken });

  const walletInstance = await bitgo.coin(coin).wallets().get({ id: walletId, allTokens: true });
  const transfers = await walletInstance.transfers();

  console.log('Wallet ID:', walletInstance.id());
  console.log('Current Receive Address:', walletInstance.receiveAddress());
  console.log('Wallet Transactions:', JSON.stringify(transfers, null, 4));
}

async function sendFunds(walletId, baseUnitQuantity) {
  await bitgo.authenticateWithAccessToken({ accessToken });
  const unlock = await bitgo.unlock({ otp: '000000', duration: 3600 });
  if (!unlock) {
    console.log('We did not unlock.');
    throw new Error();
  }
  const walletInstance = await bitgo.coin(coin).wallets().get({ id: walletId });

  const res = await walletInstance.sendMany({
    recipients: [{
      amount: baseUnitQuantity,
      address: '5H56KVtb3sSMxuhFsH51iFi1gei7tnBQjpVmj6hu9tK7CBDR',
    }],
    type: 'transfer',
    walletPassphrase: walletPassphrase,
    // nonce: '0',
  });
  console.dir(JSON.stringify(res, null, 2));
}

// createWallet();
createAddress(walletId);
// listWallet(walletIdlletId);
// getBalances(coin, walletId);
// async function main() {
//   const baseQuantity = '100000';
//   for (let i = 1; i <= 20; i++) {
//     console.log("TRIP NUMBER " + i);
//     const sendAmount = baseQuantity.concat(i.toString());
//     console.log("AMOUNT TO SEND IS " + sendAmount);
//     await sendFunds(walletId, sendAmount);
//   }
//   console.log("DONE");
// }
// main();
// sendFunds(walletId, '1000001');

// buildTxn(walletId, '115100000');

// const keyend = '{"iv":"7I3IWBRmBfjxuhpholmp0g==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"9Qb9mIvXDw4=","ct":"MiIMr9PK+YWTpgibTRChfI3dAn9VbCdH9AVzcgyjwpW/J5RQz05DluY5RvaYM6vjg5rlBfqG2d0x5ihoEsKSKpZTtGwZu35F"}';
// const password = 's90RxpK!6h'
// //
// const userPrv = bitgo.decrypt({ input: keyend, password: password });
// console.log(userPrv);
