/**
 * Share a BitGo multi-sig wallet with another BitGo user.
 *
 * This tool will help you see how to use the BitGo API to easily share your
 * BitGo wallet with another BitGo user.
 *
 * Copyright 2022, BitGo, Inc.  All Rights Reserved.
 */
import { BitGo } from 'bitgo';
const bitgo = new BitGo({ env: 'test' });

// TODO: set your access token here
const accessToken = '';

// TODO: set the id of the wallet to share
const walletId = '';

// TODO: set BitGo account email of wallet share recipient
const recipient = null;

// TODO: set share permissions as a comma-separated list
// Valid permissions to choose from are: view, spend, manage, admin
const perms = 'view';

// TODO: provide the passphrase for the wallet being shared
const passphrase = null;

const coin = 'tltc';

async function main() {
  bitgo.authenticateWithAccessToken({ accessToken });

  const wallet = await bitgo.coin(coin).wallets().get({ id: walletId });

  const shareResult = await wallet.shareWallet({
    email: recipient,
    walletPassphrase: passphrase,
    permissions: perms,
  });

  console.log('Wallet was shared successfully');
  console.dir(shareResult);
}

main().catch((e) => console.error(e));
