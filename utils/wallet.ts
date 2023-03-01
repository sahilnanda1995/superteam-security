import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";

interface LsWallet {
  connected: boolean;
  // Uint8Array and Buffer is causing problems while saving to ls
  sk: Keypair;
  publicKey: PublicKey
}

const _WALLET_KEY = "wallet";

export function getLs() {
    const lsWalletStr = localStorage.getItem(_WALLET_KEY);
    if (!lsWalletStr) {
      // return null
      const nullLs: LsWallet = {
          connected: false,
          sk: Keypair.fromSecretKey(Uint8Array.from([
            174, 47, 154, 16, 202, 193, 206, 113, 199, 190, 53, 133, 169, 175, 31, 56,
            222, 53, 138, 189, 224, 216, 117, 173, 10, 149, 53, 45, 73, 251, 237, 246,
            15, 185, 186, 82, 177, 240, 148, 69, 241, 227, 167, 80, 141, 89, 240, 121,
            121, 35, 172, 247, 68, 251, 226, 218, 48, 63, 176, 109, 168, 89, 238, 135,
          ])),
          publicKey: new PublicKey("11111111111111111111111111111111")
      }
      return nullLs
    };
    
    // console.log(Keypair.fromSecretKey(bs58.decode(JSON.parse(lsWalletStr).sk)).publicKey);
    

    const lsWallet: LsWallet = {
      connected: JSON.parse(lsWalletStr).connected,
      sk: Keypair.fromSecretKey(bs58.decode(JSON.parse(lsWalletStr).sk)),
      publicKey: Keypair.fromSecretKey(bs58.decode(JSON.parse(lsWalletStr).sk)).publicKey
    }
    return lsWallet;
}

// interface UpdateLsParams {
//   connected: boolean;
//   // Uint8Array and Buffer is causing problems while saving to ls
//   sk: Keypair;
//   publicKey: PublicKey
// }

const DEFAULT_LS_WALLET: LsWallet = {
  connected: false,
  sk: Keypair.fromSecretKey(Uint8Array.from([
    174, 47, 154, 16, 202, 193, 206, 113, 199, 190, 53, 133, 169, 175, 31, 56,
    222, 53, 138, 189, 224, 216, 117, 173, 10, 149, 53, 45, 73, 251, 237, 246,
    15, 185, 186, 82, 177, 240, 148, 69, 241, 227, 167, 80, 141, 89, 240, 121,
    121, 35, 172, 247, 68, 251, 226, 218, 48, 63, 176, 109, 168, 89, 238, 135,
  ])),
  publicKey: new PublicKey("11111111111111111111111111111111")
};

export class PgWallet {
  private _kp: Keypair;
  // Public key will always be set
  publicKey: PublicKey;
  // Connected can change
  connected: boolean;

  constructor() {
    let lsWallet = PgWallet.getLs();
    if (!lsWallet) {
      lsWallet = DEFAULT_LS_WALLET;
      // PgWallet.update(DEFAULT_LS_WALLET);
    }

    this._kp = lsWallet.sk;
    this.publicKey = this._kp.publicKey;
    this.connected = lsWallet.connected;
  }

  // For compatibility with AnchorWallet
  async signTransaction(tx: Transaction) {
    tx.partialSign(this._kp);
    return tx;
  }

  // For compatibility with AnchorWallet
  async signAllTransactions(txs: Transaction[]) {
    for (const tx of txs) {
      tx.partialSign(this._kp);
    }

    return txs;
  }

  // Statics
  private static readonly _WALLET_KEY = "wallet";

  static get keypairBytes() {
    return Uint8Array.from(this.getKp().secretKey);
  }

  /**
   * @returns wallet info from localStorage
   */
  static getLs() {
    const lsWalletStr = localStorage.getItem(this._WALLET_KEY);
    if (!lsWalletStr) return null;

    const lsWallet: LsWallet = {
      connected: JSON.parse(lsWalletStr).connected,
      sk: Keypair.fromSecretKey(bs58.decode(JSON.parse(lsWalletStr).sk)),
      publicKey: Keypair.fromSecretKey(bs58.decode(JSON.parse(lsWalletStr).sk)).publicKey
    }
    return lsWallet;
  }

  // /**
  //  * Update localStorage wallet
  //  */
  // static update(updateParams: UpdateLsParams) {
  //   const lsWallet = this.getLs() ?? DEFAULT_LS_WALLET;

  //   if (updateParams.setupCompleted !== undefined)
  //     lsWallet.setupCompleted = updateParams.setupCompleted;
  //   if (updateParams.connected !== undefined)
  //     lsWallet.connected = updateParams.connected;
  //   if (updateParams.sk) lsWallet.sk = updateParams.sk;

  //   localStorage.setItem(this._WALLET_KEY, JSON.stringify(lsWallet));
  // }

  /**
   * @returns wallet keypair from localStorage
   */
  static getKp() {
    return this.getLs()!.sk;
  }

  /**
   * Checks if pg wallet is connected and
   * logs instructions in terminal if wallet is not connected
   * @returns pg wallet connection status
   */
  static checkIsPgConnected() {
    if (this.getLs()?.connected) return true;
    return false;
  }
}