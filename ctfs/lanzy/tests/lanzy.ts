import fs from "fs"
import * as anchor from "@project-serum/anchor";
import { IDL } from "../IDL/lanzy";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";

interface PreAccounts {
    player: string,
    accounts: {
        program_id: string;
        deposit_mint: string;
        challenge: string;
        deposit_account: string;
        voucher_mint: string;
    }
}

describe("lanzy", () => {
    const conn = new anchor.web3.Connection('https://api.devnet.solana.com');

    // Required/Optional Accounts
    let raw_accounts = fs.readFileSync(`./keys/pubkeys.json`).toString();
    let pre_accounts = JSON.parse(raw_accounts) as PreAccounts;
    let program_id = new anchor.web3.PublicKey(pre_accounts.accounts.program_id.toString())
    let player_keypair = anchor.web3.Keypair.fromSecretKey(bs58.decode(pre_accounts.player))
    let deposit_mint = new anchor.web3.PublicKey(pre_accounts.accounts.deposit_mint.toString());
    let deposit_account = new anchor.web3.PublicKey(pre_accounts.accounts.deposit_account.toString());
    let challenge_account = new anchor.web3.PublicKey(pre_accounts.accounts.challenge.toString());
    let voucher_mint = new anchor.web3.PublicKey(pre_accounts.accounts.voucher_mint.toString());
    // get depositor token account for `deposit_mint`
    let depositor_account = getAssociatedTokenAddressSync(deposit_mint, player_keypair.publicKey);
    
    const provider = new anchor.AnchorProvider(conn, new NodeWallet(player_keypair), {
        preflightCommitment: "recent",
        commitment: "confirmed",
    });
    const program = new anchor.Program(IDL, program_id, provider);


    it("attack", async () => {
        // Your attack goes here ...
    });
})
