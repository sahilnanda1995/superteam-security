import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { PgCommon } from "../utils/common";
import { getLs } from "../utils/wallet";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  let pgWallet = getLs();

  const [balance, setBalance] = useState(0);
  const { connection: conn } = useConnection();
  const [rateLimited, setRateLimited] = useState(false);
  // const [pgWallet, setPgWallet] = useState<PgWallet>(new PgWallet());

  // useEffect(() => {
  //   setPgWallet(new PgWallet())
  // }, [localStorage.getItem("wallet")])

  const airdrop = () => {
    console.log("airdropping ...");

    const air = async () => {
      try {
        console.log("airdropping ...");

        await conn.requestAirdrop(
          pgWallet.publicKey,
          PgCommon.solToLamports(1)
        );
      } catch (e: any) {
        if (e.message.startsWith("429 Too Many Requests")) setRateLimited(true);
      }
    };
    air();
  };

  useEffect(() => {
    const fetchBalance = async () => {
      const lamports = await conn.getBalance(pgWallet.publicKey);

      setBalance(PgCommon.lamportsToSol(lamports));
    };
    fetchBalance().catch(() => setBalance(0));

    // Listen for balance changes
    const id = conn.onAccountChange(pgWallet.publicKey, (a) =>
      setBalance(PgCommon.lamportsToSol(a.lamports))
    );

    return () => {
      conn.removeAccountChangeListener(id);
    };
  }, [balance, conn, pgWallet.publicKey, setBalance]);

  console.log("PgWallet :: ", pgWallet.publicKey.toBase58());

  return (
    <footer className="w-full text-white bg-[#242424] text-base font-['JetBrains_Mono'] mt-4 p-3 rounded-lg font-bold ">
      <div className="mx-2 h-3 w-3 rounded-full inline-block bg-green-600"></div>
      [Devnet] Player wallet - {pgWallet.publicKey.toBase58()} - {balance} |{" "}
      <button onClick={airdrop}>airdrop()</button>
    </footer>
  );
}
