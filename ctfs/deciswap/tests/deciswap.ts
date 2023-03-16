import fs from "fs"
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Deciswap, IDL } from "../IDL/deciswap";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

interface PreAccounts {
    player: string;
    accounts: {
      program_id: string;
      challenge: string;
  
      msol_mint_pubkey: string;
      ms_pool: string;
      ms_pool_account: string;
      ms_voucher_mint: string;
  
      stsol_mint_pubkey: string;
      st_pool: string;
      st_pool_account: string;
      st_voucher_mint: string;
  
      wsol_mint_pubkey: string;
      wo_pool: string;
      wo_pool_account: string;
      wo_voucher_mint: string;
    };
  }

describe("deciswap", () => {
    const conn = new anchor.web3.Connection('https://api.devnet.solana.com');

    // Required/Optional Accounts
    let raw_accounts = fs.readFileSync(`./keys/pubkeys.json`).toString();
    let pre_accounts = JSON.parse(raw_accounts) as PreAccounts;

    let program_id = new anchor.web3.PublicKey(pre_accounts.accounts.program_id.toString())
    let player_keypair = anchor.web3.Keypair.fromSecretKey(bs58.decode(pre_accounts.player))

    let challenge = new anchor.web3.PublicKey(pre_accounts.accounts.challenge.toString());

    let msol_mint_pubkey = new anchor.web3.PublicKey(pre_accounts.accounts.msol_mint_pubkey.toString());
    let ms_pool = new anchor.web3.PublicKey(pre_accounts.accounts.ms_pool.toString());
    let ms_pool_account = new anchor.web3.PublicKey(pre_accounts.accounts.ms_pool_account.toString());
    let ms_voucher_mint = new anchor.web3.PublicKey(pre_accounts.accounts.ms_voucher_mint.toString());

    let stsol_mint_pubkey = new anchor.web3.PublicKey(pre_accounts.accounts.stsol_mint_pubkey.toString());
    let st_pool = new anchor.web3.PublicKey(pre_accounts.accounts.st_pool.toString());
    let st_pool_account = new anchor.web3.PublicKey(pre_accounts.accounts.st_pool_account.toString());
    let st_voucher_mint = new anchor.web3.PublicKey(pre_accounts.accounts.st_voucher_mint.toString());

    let wsol_mint_pubkey = new anchor.web3.PublicKey(pre_accounts.accounts.wsol_mint_pubkey.toString());
    let wo_pool = new anchor.web3.PublicKey(pre_accounts.accounts.wo_pool.toString());
    let wo_pool_account = new anchor.web3.PublicKey(pre_accounts.accounts.wo_pool_account.toString());
    let wo_voucher_mint = new anchor.web3.PublicKey(pre_accounts.accounts.wo_voucher_mint.toString());
    
    const provider = new anchor.AnchorProvider(conn, new NodeWallet(player_keypair), {
        preflightCommitment: "recent",
        commitment: "confirmed",
    });
    const program = new anchor.Program(IDL, program_id, provider);


    it("attack", async () => {
        // Your attack goes here ...
    });
})
