import Head from "next/head";
import { Header } from "../../components/Header";
// web3 stuff import
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { getLs } from "../../utils/wallet";
import Footer from "../../components/Footer";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import Router from "next/router";
import { PgCommon, SERVER_URL } from "../../utils/common";

import { Winlot, IDL } from "../../IDLs/winlot";
import Navbar from "../../components/Navbar";

const downloadSourceCode = async () => {
  console.log("downloading ....");

  let accounts = localStorage.getItem("ctf-winlot");
  let game_wallet = localStorage.getItem("wallet");
  if (accounts) {
    let parse_accounts = JSON.parse(accounts);
    if (parse_accounts.account) {
      accounts = parse_accounts.account;
    }
  }

  const response = await fetch("/api/winlot", {
    method: "POST",
    body: JSON.stringify({
      player: JSON.parse(game_wallet!).sk,
      accounts: accounts,
    }),
  });
  if (response.status === 200) {
    window.open("/api/winlot", "_blank");
  }
};

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function Home() {
  // const [gameWallet, setGameWallet] = useState(false);
  const gameWallet = getLs();
  const wallet = useWallet();

  async function createGameWallet() {
    console.log("Create game wallet ...");

    if (!wallet.publicKey) {
      console.log("Connecting");
      await wallet.connect();
    }

    console.log("wallet :: ", wallet.publicKey);

    const message = `Sign-up me for CTF 
    Click Sign or Approve only means you have proved this wallet is owned by you.`;

    const encodedMessage = new TextEncoder().encode(message);

    if (!wallet.signMessage)
      throw new Error("Wallet does not support message signing!");

    const signedMessage = await (window as any).solana.request({
      method: "signMessage",
      params: {
        message: encodedMessage,
        display: "utf8", //hex,utf8
      },
    });

    // const signedMessage = await signMessage(encodedMessage);
    console.log("signedMessage.toString() :: ", signedMessage);

    try {
      // fetch(`https://xctfserver.shuttleapp.rs/user`, {
      fetch(`${SERVER_URL}/user`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          pubkey: signedMessage.publicKey,
          sig: signedMessage.signature,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data :: ", data);
          if (data) {
            if (data.game_wallet === "null") {
              console.log("Not found, need to create game wallet first");
            }
          }
          // setData(data)
          // localStorage.setItem("wallet", JSON.stringify(data.game_wallet));
          localStorage.setItem(
            "wallet",
            JSON.stringify({
              connected: true,
              sk: data.game_wallet,
            })
          );
          // gameWallet.reload()
          Router.reload();

          // setLoading(false)
        });
    } catch (error) {
      console.log("error, error");
    }
  }

  return (
    <div className="flex flex-col py-8 lg:py-10 px-6 lg:px-[72px] items-center min-h-screen w-full bg-home-bg font-[Inter] text-ctf-txt">
      <Navbar />
      <Link
        href="/ctf"
        className="flex text-base w-full text-guide-sub-txt mt-10 leading-5 font-['JetBrains_Mono']"
      >
        &lt; CTFs
      </Link>
      <div className="max-w-2xl flex flex-col w-full">
        <Head>
          <title>SuperSec</title>
          <meta name="description" content="Solana CTFs" />
        </Head>

        <main className="relative pt-8 pb-3">
          <div className="py-3">
            <div className="text-[#A0A0A0] font-['JetBrains_Mono']">
              CTF<span className="font-bold text-[#535353] px-1">&bull;</span>
              0x103<span className="font-bold text-[#535353] px-1">&bull;</span>
              Hello
            </div>
            <div className="text-[32px] leading-9 text-white font-sans tracking-wide mt-2">
              No Loss Lottery
            </div>

            <div className="mt-8">Hello,</div>

            <div className="mt-4">
              Your mission is to &ldquo;Win and Win&ldquo; only win.
              <br></br>
              Empty the treasury to capture the flag!
            </div>

            <div className="mt-4">
              To start hacking:
              <div className="mt-4 ml-2">
                <ol className="list-disc ml-4">
                  {gameWallet.connected ? (
                    <li>
                      Download the source code after clicking on commence
                      mission
                    </li>
                  ) : (
                    <li>
                      Create Game Wallet and then download the source code after
                      clicking on commence mission
                    </li>
                  )}

                  <li>
                    Noob to CTF&apos;s? We got you:{" "}
                    <Link href="/guides/101">
                      beginner guide to CTF&apos;s on Solana
                    </Link>
                  </li>
                </ol>
              </div>
            </div>

            {wallet.connected ? (
              gameWallet.connected ? (
                <NextStep />
              ) : (
                <div>
                  <button
                    onClick={createGameWallet}
                    className="mt-8 items-center rounded bg-home-green hover:bg-[#1a1f2e] text-base leading-[48px] font-semibold px-6 text-white"
                  >
                    Create game wallet
                  </button>
                </div>
              )
            ) : (
              <div className="mt-8 flex">
                <div className="bg-home-green hover:bg-home-green rounded-md font-['JetBrains_Mono'] text-black">
                  <WalletMultiButtonDynamic className="" />
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

const NextStep = () => {
  const gameWallet = getLs();
  const wallet = useWallet();
  const anchorWallet = useAnchorWallet();

  const { connection } = useConnection();
  const [open, setOpen] = useState(false);

  const [isInstanceDeployedState, setisInstanceDeployedState] =
    useState<boolean>(false);

  const [pawned, setPawned] = useState<boolean>(false);
  const [getFlagA, setGetFlagA] = useState<boolean>(false);

  // const [data, setData] = useState(null);
  const [isStateReady, setStateReady] = useState(false);
  const [deployLoader, setdeployLoader] = useState(false);
  const [getFlagLoader, setgetFlagLoader] = useState(false);

  const isInstanceDeployed = useCallback(async () => {
    console.log("Checking if user've already deployed instance");

    const signer = wallet.publicKey;
    if (!signer || !anchorWallet) throw new Error("Signer doesn't exist");

    const provider = new anchor.AnchorProvider(connection, anchorWallet, {
      preflightCommitment: "recent",
      commitment: "processed",
    });

    const program = new anchor.Program(
      IDL,
      IDL.metadata.address,
      provider
    ) as Program<Winlot>;

    const [challPubkey, _] = anchor.web3.PublicKey.findProgramAddressSync(
      [gameWallet.publicKey.toBuffer(), Buffer.from("CHALLENGE")],
      program.programId
    );

    try {
      const tx = await program.account.challenge.fetch(challPubkey);
      if (tx) {
        setisInstanceDeployedState(true);
      } else {
        console.log("Need to deploy the instance");
      }
    } catch (e) {
      console.log(e);
    }
    setStateReady(true);
  }, [anchorWallet, connection, wallet.publicKey]);

  async function deployNewInstance() {
    console.log("Deploying");
    setdeployLoader(true);

    if (anchorWallet?.publicKey) {
      // Airdrop some sol
      const airdropTxHash = await connection.requestAirdrop(
        gameWallet.publicKey,
        PgCommon.solToLamports(1)
      );
      console.log(`Airdrop txHash :: ${airdropTxHash}`);

      const message = `Setup Winlot Challanage. Click Sign or Approve only means you have proved this wallet is owned by you.`;

      const encodedMessage = new TextEncoder().encode(message);

      if (!wallet.signMessage)
        throw new Error("Wallet does not support message signing!");
      const signedMessage = await (window as any).solana.request({
        method: "signMessage",
        params: {
          message: encodedMessage,
          display: "utf8", //hex,utf8
        },
      });

      // const signedMessage = await signMessage(encodedMessage);
      console.log("signedMessage.toString() :: ", signedMessage);
      try {
        fetch(`${SERVER_URL}/winlot/setup/`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            pubkey: signedMessage.publicKey,
            sig: signedMessage.signature,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data :: ", data);
            if (data) {
              console.log("data :: ", data);
              localStorage.setItem("ctf-winlot", JSON.stringify(data));
              setisInstanceDeployedState(true);
              setdeployLoader(false);
            }
            // setData(data)
            // setLoading(false)
          });
      } catch (error) {
        console.log("error :: ", error);
        setdeployLoader(false);
      }
    }
  }

  const getFlag = async () => {
    setgetFlagLoader(true);
    console.log("Checking if user pawned it or not");

    if (wallet) {
      const signer = wallet.publicKey;
      if (!signer || !anchorWallet) throw new Error("Signer doesn't exist");

      const provider = new anchor.AnchorProvider(connection, anchorWallet, {
        preflightCommitment: "recent",
        commitment: "processed",
      });

      const program = new anchor.Program(
        IDL,
        IDL.metadata.address,
        provider
      ) as Program<Winlot>;

      let accounts = JSON.parse(localStorage.getItem("ctf-winlot")!);

      console.log(accounts);

      const pool_account = new anchor.web3.PublicKey(
        accounts.account.pool_account
      );

      try {
        const pool_balance =
          await program.provider.connection.getTokenAccountBalance(
            pool_account
          );

        console.log("pool_balance :: ", pool_balance);

        if (pool_balance.value.amount <= "0") {
          setPawned(true);
          setOpen(true);
        } else {
          console.log("Need to grind more ser!");
          setOpen(true);
        }
        setgetFlagLoader(false);
      } catch (e) {
        console.log(e);
        setgetFlagLoader(false);
      }
    }
  };

  useEffect(() => {
    try {
      isInstanceDeployed();
    } catch (error) {
      console.log("error, error");
    }
  }, [isInstanceDeployed]);

  return (
    <>
      {isStateReady ? (
        <div>
          {isInstanceDeployedState ? (
            <>
              {pawned ? (
                <div>Wow, you did it</div>
              ) : (
                <div className="mt-4">
                  Mission is started:{" "}
                  <a
                    className="text-blue"
                    onClick={(e) => {
                      downloadSourceCode();
                    }}
                  >
                    download the source code
                  </a>{" "}
                  cadet!
                </div>
              )}

              <div>
                <button
                  onClick={getFlag}
                  className="mt-8 items-center rounded bg-home-green hover:bg-[#1a1f2e] text-base leading-[48px] font-semibold px-6 text-white"
                >
                  Get My Flag
                </button>
                {getFlagLoader ? (
                  <div
                    className="inline-block ml-4 h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      checking ...
                    </span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <div>
              <button
                onClick={deployNewInstance}
                className="mt-8 items-center rounded bg-home-green hover:bg-[#1a1f2e] text-base leading-[48px] font-semibold px-6 text-white"
              >
                Commence Mission
              </button>
              {deployLoader ? (
                <div
                  className="inline-block ml-4 h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    {pawned && getFlagA ? (
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <CheckIcon
                          className="h-6 w-6 text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                    ) : (
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                        <XMarkIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    <div className="mt-3 text-center sm:mt-5">
                      {pawned ? (
                        <>
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            Fam, you did it. 🎉
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              This is your first breakthrough, but the road
                              ahead is not as simple as it appears. You must
                              work hard, but it is exciting.
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            Fam, Need to grid more 🏄‍♂️
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              The one who falls and gets up is stronger than the
                              one who never tried.
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
