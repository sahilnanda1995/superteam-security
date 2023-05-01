import { useEffect, useState } from "react";

import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";

const ctfs = [
  {
    id: "101",
    title: "Steal a billy 🤑",
    link: "/ctf/0x101",
    year: 2022,
  },
  {
    id: "102",
    title: "Lanzy",
    link: "/ctf/0x102",
    year: 2022,
  },
  { id: "103", title: "No Loss Lottery", link: "/ctf/0x103", year: 2022 },
  {
    id: "104",
    title: "Bankrupt Solman Brothers",
    link: "/ctf/0x104",
    year: 2022,
  },
  { id: "105", title: "Borrow and Bye 💸", link: "/ctf/0x105", year: 2022 },
];

export default function CTF() {
  const router = useRouter();
  return (
    <div
      className="flex min-h-screen w-full bg-repeat items-center"
      style={{ backgroundImage: "url('/assets/ctf_bg.svg')" }}
    >
      <div className="flex w-full min-h-screen flex-col items-center py-8 lg:py-10 px-6 lg:px-[72px]">
        <nav
          className="flex items-center w-full justify-between"
          aria-label="Global"
        >
          <div className="flex w-full justify-between items-center text-base">
            <div className="w-max flex flex-row">
              <p className="whitespace-nowrap text-white">
                superteam <span className="text-home-neon">&gt;</span>
              </p>
              <p className="animate-typing overflow-hidden whitespace-nowrap border-r-8 border-home-neon pr-1 text-home-neon">
                security
              </p>
            </div>
            <p className="-mx-3 block rounded-lg py-2 px-3 leading-6 text-white hover:bg-gray-400/10">
              CTFs
            </p>
          </div>
        </nav>
        <div className="mx-auto max-w-2xl py-10 lg:py-12">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            {/* <Image
              alt="st_key"
              src="/assets/st_key.png"
              height={52}
              width={52}
            /> */}
            <div className="flex w-full justify-center">
              <h1 className="text-[32px] leading-9 text-white font-sans stretch-semi">
                Capture The Flags
              </h1>
            </div>
            <div className="text-home-parrot text-sm">
              <p>
                short excercises amd emulations for
                <br />
                beginners to practice hacks
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full max-w-xl items-center space-y-8">
          <div className="p-6 space-y-2 w-full text-white text-left bg-home-bg border border-home-green rounded-lg">
            <p className="text-sm text-home-tab-title">
              Not Sure Where to Start?
            </p>
            <p className="text-xl">Beginner guide to CTF's on Solana</p>
          </div>
          {ctfs.map((ctf, index) => (
            <div className="p-6 space-y-2 w-full text-white text-left bg-home-bg border border-ctf-bodr rounded-lg">
              <p className="text-sm text-home-tab-title">{ctf.id}</p>
              onClick={} <p className="text-xl">{ctf.title}</p>
              <button
                className="text-sm bg-home-tab-exp-bg p-4 w-full rounded-lg hover:bg-home-green"
                onClick={() => router.push(ctf.link)}
              >
                Begin
              </button>
            </div>
          ))}
        </div>
        <footer className="flex flex-col items-center text-home-green mt-10 text-sm">
          <div className="text-center bg-home-tab-head p-6 rounded-lg">
            <div>
              proudly built by findsignal studio.
              <span className="absolute text-xs -ml-1 -mt-1">FS</span>
            </div>
            <div>designed by @pragdua</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
