import Head from "next/head";
import { Header } from "../../components/Header";
// web3 stuff import
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Lanzy, IDL } from "../../IDLs/lanzy";
import { useConnection } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { PgWallet } from "../../utils/wallet";
import Footer from "../../components/Footer";

const downloadSourceCode = async () => {
  console.log("downloading ....");
  
  const response = await fetch("/api/flashloan", {
    method: "POST",
    body: JSON.stringify({
      player: PgWallet.getLs()?.sk,
    }),
  })
  if (response.status === 200 ) {
    window.open("/api/flashloan", "_blank")
  }
};

export default function Home() {
  return (
    <div className="px-4 sm:px-0 max-w-4xl m-auto">
      <Head>
        <title>SuperSec</title>
        <meta name="description" content="Solana CTFs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative pt-8 pb-3 px-2 sm:px-0">
        <div className="py-3">
          <div className="text-[#2bbc8a]"> CTF::0x105::Borrow and Bye</div>


          {/* CTFs
                    - Introduction
                    - Instruction
                    - KeepInMind
            */}
          <div className="mt-8">
            Hello,
          </div>

          <div className="mt-4">
            Your mission is to hack &ldquo;Borrow and Bye&ldquo; contract.
            <br></br>
          </div>

          <div className="mt-4">
            To start hacking:
            <div className="mt-4 ml-2">
              <ol className="list-disc ml-4">
                <li>
                  Download the source code after clicking on commence mission
                </li>
                <li>
                  Noob to CTF&apos;s? We got you:{" "}
                  <Link href="/guides/101">
                    beginner guide to CTF&apos;s on Solana
                  </Link>
                </li>
              </ol>
            </div>
          </div>
          <NextStep />
        </div>
      </main>

      <Footer />

    </div>
  );
}

const NextStep = () => {
  // const wallet = useAnchorWallet();
  const wallet = new PgWallet();

  const { connection } = useConnection();
  const [open, setOpen] = useState(false);

  const [isInstanceDeployedState, setisInstanceDeployedState] =
    useState<boolean>(false);

  const [pawned, setPawned] = useState<boolean>(false);
  const [getFlagA, setGetFlagA] = useState<boolean>(false);

  const isInstanceDeployed = useCallback(async () => {
    console.log("Checking if user've already deployed instance");

    const signer = wallet.publicKey;

    const provider = new anchor.AnchorProvider(connection, wallet, {
      preflightCommitment: "recent",
      commitment: "processed",
    });
    const program = new anchor.Program(
      IDL,
      IDL.metadata.address,
      provider
    ) as Program<Lanzy>;

    const [challPubkey, _] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("STATE"), signer.toBuffer()],
      program.programId
    );

    try {
      const tx = await program.account.state.fetch(challPubkey);
      if (tx) {
        setisInstanceDeployedState(true);
      } else {
        console.log("Need to deploy the instance");
      }
    } catch (e) {
      console.log(e);
    }
  }, [connection]);

  async function deployNewInstance() {
    console.log("Deploying");
    setisInstanceDeployedState(true);

    // if (wallet) {
    //   const signer = wallet.publicKey;

    //   const provider = new anchor.AnchorProvider(connection, wallet, {
    //     preflightCommitment: "recent",
    //     commitment: "processed",
    //   });
    //   const program = new anchor.Program(
    //     IDL,
    //     IDL.metadata.address,
    //     provider
    //   ) as Program<Lanzy>;

    //   const txx = await program.methods.playeSetup();
    //   const autoInferKey = await txx.pubkeys();

    //   console.log("chall :: ", autoInferKey.state?.toString());
    //   console.log("depositAccount :: ", autoInferKey.depositAccount?.toString());
    //   console.log("voucherMint :: ", autoInferKey.voucherMint?.toString());
    //   console.log("depositMint :: ", autoInferKey.depositMint?.toString());


    //   const tx = await program.methods.playeSetup().accounts({
    //     player: signer,
    //   });

    //   const txHash = await tx.rpc();
    //   console.log("txHash :: ", txHash);

    //   const confirmTx = await connection.getSignatureStatus(txHash);
    //   console.log("Tx status :: ", confirmTx);

    //   if (confirmTx.value?.confirmationStatus === "confirmed") {
    //     setisInstanceDeployedState(true);
    //   }
    // }
  }

  const removeInstance = async () => {
    if (wallet) {
      const signer = wallet.publicKey;

      const provider = new anchor.AnchorProvider(connection, wallet, {
        preflightCommitment: "recent",
        commitment: "processed",
      });
      const program = new anchor.Program(
        IDL,
        IDL.metadata.address,
        provider
      ) as Program<HelloSupersec>;

      const tx = await program.methods
        .close()
        .accounts({
          signer: signer,
        })
        .rpc();

      console.log("txHash :: ", tx);

      const confirmTx = await connection.getSignatureStatus(tx);
      console.log("Tx status :: ", confirmTx);

      if (confirmTx.value?.confirmationStatus === "confirmed") {
        setisInstanceDeployedState(false);
      }
    }
  };

  const getFlag = async () => {
    setGetFlagA(true);
    console.log("Checking if user pawned it or not");

    if (wallet) {
      const signer = wallet.publicKey;

      const provider = new anchor.AnchorProvider(connection, wallet, {
        preflightCommitment: "recent",
        commitment: "processed",
      });
      const program = new anchor.Program(
        IDL,
        IDL.metadata.address,
        provider
      ) as Program<Lanzy>;

      const [challPubkey, _] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from("hello-supersec"), signer.toBuffer()],
        program.programId
      );

      try {
        const tx = await program.account.challAccount.fetch(challPubkey);
        if (tx.pawned === true) {
          setPawned(true);
          setOpen(true);
        } else {
          console.log("Need to grind more ser!");
          setOpen(true);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    isInstanceDeployed();
  }, [isInstanceDeployed]);

  return (
    <>
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
                    downloadSourceCode()
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
                className="mt-8 inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Get My Flag
              </button>

              <button
                onClick={removeInstance}
                className="ml-8 mt-8 inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Reset Mission
              </button>
            </div>
          </>
        ) : (
          <div>
            <button
              onClick={deployNewInstance}
              className="mt-8 inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Commence Mission
            </button>
          </div>
        )}
      </div>

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
