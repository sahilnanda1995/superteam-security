import fs from "fs"
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { FlashLoan, IDL } from "../IDL/flash_loan";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

interface PreAccounts {
    player: string;
    accounts: {
      program_id: string;
      challenge: string;
  
      flash_coin_mint_pubkey: string;
      pool: string;
      pool_account: string;
      voucher_mint: string;
    };
  }

describe("deciswap", () => {
    const conn = new anchor.web3.Connection('https://api.devnet.solana.com');

    // Required/Optional Accounts
    let raw_accounts = fs.readFileSync(`./keys/pubkeys.json`).toString();
    let pre_accounts = JSON.parse(raw_accounts) as PreAccounts;

    let program_id = new anchor.web3.PublicKey(pre_accounts.accounts.program_id.toString())
    let player = anchor.web3.Keypair.fromSecretKey(bs58.decode(pre_accounts.player))

    let challenge = new anchor.web3.PublicKey(pre_accounts.accounts.challenge.toString());

    let flash_coin_mint_pubkey = new anchor.web3.PublicKey(pre_accounts.accounts.flash_coin_mint_pubkey.toString());
    let pool = new anchor.web3.PublicKey(pre_accounts.accounts.pool.toString());
    let pool_account = new anchor.web3.PublicKey(pre_accounts.accounts.pool_account.toString());
    let voucher_mint = new anchor.web3.PublicKey(pre_accounts.accounts.voucher_mint.toString());

    // get player flashcoin account (ATA)
    let playerAccount = getAssociatedTokenAddressSync(flash_coin_mint_pubkey, player.publicKey);

    const provider = new anchor.AnchorProvider(conn, new NodeWallet(player), {
        preflightCommitment: "recent",
        commitment: "confirmed",
    });
    const program = new anchor.Program(IDL, program_id, provider);


    it("attack", async () => {
        // Your attack goes here ...
    });
})
