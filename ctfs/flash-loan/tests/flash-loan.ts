import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { FlashLoan } from "../target/types/flash_loan";

describe("flash-loan", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.FlashLoan as Program<FlashLoan>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
