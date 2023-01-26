import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Lanzy } from "../target/types/lanzy";
import {
  getAssociatedTokenAddress,
  createInitializeMintInstruction,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  createSetAuthorityInstruction,
  MINT_SIZE,
  ACCOUNT_SIZE,
  TOKEN_PROGRAM_ID,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import lumina from "@lumina-dev/test";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import * as fs from 'fs';

lumina();

describe("lanzy", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Lanzy as Program<Lanzy>;
  const player = provider.wallet.publicKey;
  const depositMint = anchor.web3.Keypair.generate();
  const depositor = anchor.web3.Keypair.generate();
  let depositAccount;
  let voucher_mint;
  // Creating deposit mint
  
  const lkeypair = anchor.web3.Keypair.fromSecretKey(Uint8Array.from(
    [104,42,68,7,45,43,28,115,17,133,142,120,142,206,25,199,194,92,221,113,160,132,218,165,101,20,152,151,168,94,56,178,225,152,158,238,80,146,128,96,95,86,138,21,196,47,5,46,158,255,139,170,245,134,81,156,55,215,57,87,124,78,230,177]
  ));
  
  console.log("pk :: ", lkeypair.publicKey.toBase58());
  
  // const mintDepositToken = async () => {
  //   const mintRent =
  //     await provider.connection.getMinimumBalanceForRentExemption(MINT_SIZE);
  //   const tx = new anchor.web3.Transaction();
  //   tx.add(
  //     anchor.web3.SystemProgram.createAccount({
  //       fromPubkey: player,
  //       newAccountPubkey: depositMint.publicKey,
  //       space: MINT_SIZE,
  //       lamports: mintRent,
  //       programId: TOKEN_PROGRAM_ID,
  //     }),
  //     createInitializeMintInstruction(depositMint.publicKey, 6, lkeypair.publicKey, null)
  //   );
  //   const mintTx = await provider.sendAndConfirm(tx, [depositMint]);
  //   console.log("Mint key :: ", depositMint.publicKey.toString());
  //   console.log("Your mint transaction signature", mintTx);
  // };

  // it("Player Setup", async () => {
  //   await mintDepositToken();
  //   const keys = await program.methods.playeSetup().pubkeys();
  //   depositAccount = keys.depositAccount;
  //   voucher_mint = keys.voucherMint;

  //   const tx = await program.methods
  //     .playeSetup()
  //     .accounts({
  //       depositMint: depositMint.publicKey,
  //     })
  //     .rpc();
  //   console.log("Your transaction signature", tx);
  // });

  // it("Deposit token", async () => {
  //   // Mint depositToken to player :: 10 ** 6
  //   let depositor_account = await getOrCreateAssociatedTokenAccount(
  //     provider.connection,
  //     (provider.wallet as NodeWallet).payer,
  //     depositMint.publicKey,
  //     player
  //   );
    
  //   let depositor_voucher_account = await getOrCreateAssociatedTokenAccount(
  //     provider.connection,
  //     (provider.wallet as NodeWallet).payer,
  //     voucher_mint,
  //     player
  //   );

  //   const mintTotx = new anchor.web3.Transaction().add(
  //     createMintToInstruction(
  //       depositMint.publicKey,
  //       depositor_account.address,
  //       player,
  //       10 ** 6
  //     )
  //   );
  //   await provider.sendAndConfirm(mintTotx);

  //   const tx = await program.methods
  //     .deposit(new anchor.BN(10000))
  //     .accounts({
  //       player: player,
  //       depositor: player,
  //       depositAccount: depositAccount,
  //       voucherMint: voucher_mint,
  //       depositorAccount: depositor_account.address,
  //       depositorVoucherAccount: depositor_voucher_account.address,
  //     })
  //     .rpc();

  //   console.log("Your deposit transaction signature", tx);
  // });
});
