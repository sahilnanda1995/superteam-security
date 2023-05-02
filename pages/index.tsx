import Image from "next/image";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import protocols from "../utils/protocols";

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
