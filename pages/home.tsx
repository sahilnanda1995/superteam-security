import { useEffect, useState } from "react";

import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const protocols = [
  {
    name: "Cashio",
    title: "Stable Coin",
    exploit_type: "Faulty Account Validation",
    amount: 48000000,
    doh: "349312",
    technique: "Faulty Account Validation",
    audit_by: "Unaudited",
  },
  {
    name: "Cashio",
    title: "Concentrated Liquidity Provider",
    exploit_type: "Faulty Account Validation",
    amount: 48000000,
    doh: "349312",
    technique: "Faulty Account Validation",
    audit_by: "Unaudited",
  },
  {
    name: "Cashio",
    title: "Concentrated Liquidity Provider",
    exploit_type: "Faulty Account Validation",
    amount: 48000000,
    doh: "349312",
    technique: "Private Key compromised(Stored Publicly) on Sentry Server",
    audit_by: "Unaudited",
  },
  {
    name: "Cashio",
    title: "Stable Coin",
    exploit_type: "Faulty Account Validation",
    amount: 48000000,
    doh: "349312",
    technique: "Faulty Account Validation",
    audit_by: "Unaudited",
  },
  {
    name: "Cashio",
    title: "Concentrated Liquidity Provider",
    exploit_type: "Faulty Account Validation",
    amount: 48000000,
    doh: "349312",
    technique: "Faulty Account Validation",
    audit_by: "Unaudited",
  },
  {
    name: "Cashio",
    title: "Concentrated Liquidity Provider",
    exploit_type: "Faulty Account Validation",
    amount: 48000000,
    doh: "349312",
    technique: "Private Key compromised(Stored Publicly) on Sentry Server",
    audit_by: "Unaudited",
  },
  {
    name: "Cashio",
    title: "Stable Coin",
    exploit_type: "Faulty Account Validation",
    amount: 48000000,
    doh: "349312",
    technique: "Faulty Account Validation",
    audit_by: "Unaudited",
  },
  {
    name: "Cashio",
    title: "Concentrated Liquidity Provider",
    exploit_type: "Faulty Account Validation",
    amount: 48000000,
    doh: "349312",
    technique: "Faulty Account Validation",
    audit_by: "Unaudited",
  },
  {
    name: "Cashio",
    title: "Concentrated Liquidity Provider",
    exploit_type: "Faulty Account Validation",
    amount: 48000000,
    doh: "349312",
    technique: "Private Key compromised(Stored Publicly) on Sentry Server",
    audit_by: "Unaudited",
  },
];

export default function Home() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-home-bg font-['JetBrains_Mono']">
      <title>SuperSec</title>
      <Image
        alt="bg_img"
        src="/assets/bg_img.svg"
        fill
        className="absolute inset-0 -z-10 h-full w-full object-cover -mt-96 sm:-mt-80 lg:-mt-96"
      />
      <div className="flex min-h-screen flex-col py-8 lg:py-10 px-6 lg:px-[72px]">
        <nav className="flex items-center justify-between" aria-label="Global">
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
            <Image
              alt="st_key"
              src="/assets/st_key.png"
              height={52}
              width={52}
            />
            <div className="flex w-full justify-center">
              <h1 className="text-[32px] leading-9 text-white font-serif stretch-semi">
                solana exploits
                <br />
                for security nerds
              </h1>
            </div>
            <div className="text-home-parrot text-sm">
              <p>
                a detailed handbook of every hack
                <br />
                on solana conducted till date.
              </p>
            </div>
            <div className="text-sm text-home-bg font-bold p-2 bg-home-green border-0 rounded-lg">
              <p>$234M hacked across 10 Protocols</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-home-tab-head via-home-green to-home-tab-head rounded-lg">
          <table className="min-w-full mt-[0.5px] rounded-lg overflow-hidden">
            <thead className="bg-home-tab-head">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-sm">
                  protocol
                </th>
                <th
                  scope="col"
                  className="hidden px-6 py-4 whitespace-nowrap text-left text-sm lg:table-cell"
                >
                  date of hack
                </th>
                <th
                  scope="col"
                  className="hidden px-6 py-4 text-left text-sm sm:table-cell"
                >
                  $ stolen
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left whitespace-nowrap text-sm"
                >
                  exploit type
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm">
                  technique
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left whitespace-nowrap text-sm"
                >
                  audited by
                </th>
              </tr>
            </thead>
            <tbody className="text-white bg-home-bg divide-y divide-home-tab-head">
              {protocols.map((protocol, index) => (
                <tr
                  key={index}
                  className="hover:bg-home-tab-head cursor-pointer divide-x divide-home-tab-head"
                >
                  <td className="px-6 py-6 text-sm font-medium">
                    {protocol.name}
                    <dl className="">
                      {/* <dt className="sr-only">Title</dt> */}
                      <dd className="mt-1 text-home-tab-title">
                        {protocol.title}
                      </dd>
                      {/* <dt className="sr-only sm:hidden">Email</dt> */}
                      {/* <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        {protocol.email}
                      </dd> */}
                    </dl>
                  </td>
                  <td className="hidden px-6 py-3 text-sm lg:table-cell">
                    {protocol.doh}
                  </td>
                  <td className="hidden px-6 py-3 text-sm sm:table-cell">
                    {protocol.amount}
                  </td>
                  <td className="px-6 py-3 text-sm">{protocol.exploit_type}</td>
                  <td className="px-6 py-3 text-sm">{protocol.technique}</td>
                  <td className="px-6 py-3 text-sm italic">
                    {protocol.audit_by}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <footer className="mb-2 hidden flex-1 place-items-end justify-center text-white sm:flex 2xl:mb-4"></footer>
      </div>
    </div>
  );
}
