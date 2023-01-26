// import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
// import { HelloSupersec } from "../target/types/hello_supersec";
// import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
// import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";

// describe("test-attack", () => {

//   // Configure the client to use Solana devnet cluster.
//   const provider =  anchor.AnchorProvider.env();
//   anchor.setProvider(provider);

//   const program = anchor.workspace.HelloSupersec as Program<HelloSupersec>;

//   it("construct_attack_payload", async () => {
//     const sugaku = new anchor.BN(0);

//     const tx = await program.methods.challenge(sugaku);
//     const autoInferKey = await tx.pubkeys();
//     const challKey = autoInferKey.challAccount;

//     let ata = await getOrCreateAssociatedTokenAccount(
//       provider.connection,
//       (provider.wallet as NodeWallet).payer,
//       autoInferKey.rewardMint,
//       provider.publicKey,
//     );

//     tx.accounts({
//       receiver: ata.address
//     })
//     const txHash = await tx.rpc({skipPreflight: true})

//     console.log("Your transaction signature", txHash);

//     const confirmTx = await provider.connection.getSignatureStatus(txHash);
//     if (confirmTx.value?.confirmationStatus === "confirmed") {
//       try {
//         const tx = await program.account.challAccount.fetch(challKey);
//         if (tx.pawned === true) {
//           console.log("Congratulations, you successfully exploited the contract 🎉");
//         } else {
//           console.log("Sorry, your attack failed. Please grind more 🏄‍♂️");
          
//         }
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   });
// });