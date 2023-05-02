import Image from "next/image";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";

const protocols = [
  {
    id: 1,
    name: "Cashio",
    title: "Stablecoin",
    amount: "$48,000,000.00",
    exploit_type: "Faulty Account Validation ",
    technique: "Fake Collateral validated correctly",
    audit_by: "Unaudited",
    hackmd_link: "https://security.superteam.fun/hacks/cahio-hack",
    link: "/hacks/cashio-hack",
    doh: "2022-03-23",
  },
  {
    id: 2,
    name: "Jet",
    title: "Lending and Borrowing Crypto Assets",
    amount: "$0.00",
    exploit_type: "Vulnerability ",
    technique:
      "Broken C-ratio calculation leading to borrow all liquidity without posting collateral ",
    audit_by: "Ottersec",
    hackmd_link: "https://security.superteam.fun/hacks/jet-hack",
    link: "/hacks/jet-hack",
    doh: "2021-12-21",
  },
  {
    id: 3,
    name: "Wormhole",
    title: "Bridge",
    amount: "$325,000,000.00",
    exploit_type: "Spoofed Signature exploit",
    technique:
      "Bypass validation of fake signatures to authorisee mint of 120k ETH",
    audit_by: "Neodyme",
    hackmd_link: "https://security.superteam.fun/hacks/wormhole-hack",
    link: "/hacks/wormhole-hack",
    doh: "2022-02-02",
  },
  {
    id: 4,
    name: "Crema",
    title: "Concentrated Liquidity Provider ",
    amount: "$8,800,000.00",
    exploit_type: "Faulty Account Validation ",
    technique: "Fake Account supplied to issue excess LP fees",
    audit_by: "Bramah Systems",
    hackmd_link: "https://security.superteam.fun/hacks/crema-hack",
    link: "/hacks/crema-hack",
    doh: "2022-07-03",
  },
  {
    id: 5,
    name: "Nirvana",
    title: "Stablecoin",
    amount: "$3,500,000.00",
    exploit_type: "Flashloan Attack",
    technique: "Inflate price using flashloan to drain protocol treasury",
    audit_by: "Sec3 Auto Audit Software",
    hackmd_link: "https://security.superteam.fun/hacks/nirvana",
    link: "/hacks/nirvana",
    doh: "2022-07-28",
  },
  {
    id: 6,
    name: "Raydium",
    title: "Order book Decentralized Exchange",
    amount: "$4,400,000.00",
    exploit_type: "Private Key Compromised",
    technique:
      "Illegally withdraw liquidity by using compromised admin's private key.",
    audit_by: "N/A",
    hackmd_link: "https://security.superteam.fun/hacks/raydium-hack",
    doh: "2022-12-16",
  },
  {
    id: 7,
    name: "Mango ",
    title: "Leverage Trading",
    amount: "$115,000,000.00",
    exploit_type: "Price Manipulation",
    technique:
      "Manipulate $MNGO price to profit from leveraged open long position. Use unrealized PNL to borrow liquidity.",
    audit_by: "N/A",
    hackmd_link: "https://hackmd.io/q3J-B87pRV2R0k7mlBl2Jw?view",
    doh: "2022-10-11",
  },
  {
    id: 8,
    name: "Solend",
    title: "Lending and Borrowing Crypto Assets",
    amount: "$1,260,000.00",
    exploit_type: "Price Oracle Attack",
    technique: "Inflated price of collateral to borrow excess liquidity",
    audit_by: "N/A",
    hackmd_link: "https://hackmd.io/@prastut/Bkxx_JC-h",
    doh: "2022-11-02",
  },
  {
    id: 9,
    name: "Solend",
    title: "Lending and Borrowing Crypto Assets",
    amount: "$0.00",
    exploit_type: "Faulty Account Validation ",
    technique:
      "Bypass admin checks using fake account to manipulate core protocol parameters",
    audit_by: "N/A",
    hackmd_link: "https://hackmd.io/@prastut/r1wMdtcf3",
    doh: "2021-08-19",
  },
  {
    id: 10,
    name: "Slope wallet",
    title: "Wallet",
    amount: "$5,000,000.00",
    exploit_type: "Private Key Compromise",
    technique:
      "Transferred assets to hacker account using compromised private key",
    audit_by: "N/A",
    hackmd_link: "https://hackmd.io/@prastut/SJoJUzKz3",
    doh: "2022-08-02",
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-home-bg font-['JetBrains_Mono']">
      <title>SuperSec</title>
      <Image
        alt="bg_img"
        src="/assets/bg_img.svg"
        fill
        className="fixed inset-0 -z-10 h-full w-full object-cover -mt-[480px]"
      />
      <div className="flex min-h-screen flex-col py-8 lg:py-10 px-6 lg:px-[72px]">
        <Navbar />
        <div className="mx-auto max-w-2xl py-10 lg:py-12">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <Image
              alt="st_key"
              src="/assets/st_key.png"
              height={52}
              width={52}
            />
            <div className="flex w-full justify-center">
              <h1 className="text-[32px] leading-9 text-white font-sans stretch-semi">
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
        <div className="hidden sm:flex bg-gradient-to-r from-home-tab-head via-home-green to-home-tab-head rounded-lg">
          <table className="min-w-full mt-[0.5px] rounded-lg overflow-hidden">
            <thead className="bg-home-tab-head hidden sm:table-row-group">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-sm">
                  protocol
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 whitespace-nowrap text-left text-sm"
                >
                  date of hack
                </th>
                <th
                  scope="col"
                  className="hidden px-6 py-4 text-left text-sm lg:table-cell"
                >
                  $ stolen
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left whitespace-nowrap text-sm"
                >
                  exploit type
                </th>
                <th
                  scope="col"
                  className="hidden px-6 py-4 text-left text-sm lg:table-cell"
                >
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
                  onClick={() => protocol?.link && router.push(protocol.link)}
                >
                  <td className="px-6 py-6 text-sm">
                    <div className="flex flex-col">
                      <div className="flex flex-row space-x-2 items-center">
                        <div>{protocol.name}</div>
                        <div className="bg-home-tab-head px-2 py-1 rounded-lg lg:hidden">
                          {protocol.amount}
                        </div>
                      </div>
                      <div className="text-home-tab-title mt-2">
                        {protocol.title}
                      </div>
                      <div className="mt-2 sm:hidden">
                        {protocol?.audit_by !== "Unaudited"
                          ? "Audited by " + protocol.audit_by
                          : "Unaudited"}
                      </div>
                      <div className="bg-home-tab-exp-bg p-4 mt-4 rounded-lg sm:hidden">
                        <div className="text-xs text-home-tab-exp-subtxt tracking-widest">
                          EXPLOIT TYPE
                        </div>
                        <div className="mt-2 text-home-tab-exp-txt">
                          {protocol.exploit_type}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm hidden sm:table-cell">
                    {protocol.doh}
                  </td>
                  <td className="hidden px-6 py-3 text-sm lg:table-cell">
                    {protocol.amount}
                  </td>
                  <td className="px-6 py-3 text-sm hidden sm:table-cell">
                    {protocol.exploit_type}
                  </td>
                  <td className="hidden px-6 py-3 text-sm lg:table-cell">
                    {protocol.technique}
                  </td>
                  <td className="px-6 py-3 text-sm italic hidden sm:table-cell">
                    {protocol.audit_by}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="sm:hidden flex flex-col items-center justify-center space-y-8">
          {protocols.map((protocol, index) =>
            index === 0 ? (
              <div
                key={index}
                className="bg-gradient-to-r from-home-tab-head via-home-green to-home-tab-head w-full rounded-lg"
              >
                <div className="hover:bg-home-tab-head bg-home-bg w-full rounded-lg border border-home-tab-head cursor-pointer divide-x divide-home-tab-head mt-[0.5px]">
                  <div className="px-6 py-6 text-sm">
                    <div className="flex flex-col">
                      <div className="flex flex-row space-x-2 items-center">
                        <div>{protocol.name}</div>
                        <div className="bg-home-tab-head px-2 py-1 rounded-lg lg:hidden">
                          {protocol.amount}
                        </div>
                      </div>
                      <div className="text-home-tab-title mt-2">
                        {protocol.title}
                      </div>
                      <div className="mt-2 sm:hidden">
                        {protocol?.audit_by !== "Unaudited"
                          ? "Audited by " + protocol.audit_by
                          : "Unaudited"}
                      </div>
                      <div className="bg-home-tab-exp-bg p-4 mt-4 rounded-lg sm:hidden">
                        <div className="text-xs text-home-tab-exp-subtxt tracking-widest">
                          EXPLOIT TYPE
                        </div>
                        <div className="mt-2 text-home-tab-exp-txt">
                          {protocol.exploit_type}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={index}
                className="hover:bg-home-tab-head bg-home-bg w-full rounded-lg border border-home-tab-head cursor-pointer divide-x divide-home-tab-head"
              >
                <div className="px-6 py-6 text-sm">
                  <div className="flex flex-col">
                    <div className="flex flex-row space-x-2 items-center">
                      <div>{protocol.name}</div>
                      <div className="bg-home-tab-head px-2 py-1 rounded-lg lg:hidden">
                        {protocol.amount}
                      </div>
                    </div>
                    <div className="text-home-tab-title mt-2">
                      {protocol.title}
                    </div>
                    <div className="mt-2 sm:hidden">
                      {protocol?.audit_by !== "Unaudited"
                        ? "Audited by " + protocol.audit_by
                        : "Unaudited"}
                    </div>
                    <div className="bg-home-tab-exp-bg p-4 mt-4 rounded-lg sm:hidden">
                      <div className="text-xs text-home-tab-exp-subtxt tracking-widest">
                        EXPLOIT TYPE
                      </div>
                      <div className="mt-2 text-home-tab-exp-txt">
                        {protocol.exploit_type}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
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
