import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Dyswap } from "../target/types/dyswap";

describe("dyswap", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Dyswap as Program<Dyswap>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
