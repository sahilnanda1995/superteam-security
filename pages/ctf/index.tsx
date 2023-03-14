import Head from "next/head";
import { Header } from "../../components/Header";

export default function Home() {
  const today = new Date();

  const CTFs = [
    {
      title: "101: Steal a billy 🤑",
      link: "/ctf/0x101",
      year: 2022,
    },
    {
      title: "102: Lanzy",
      link: "/ctf/0x102",
      year: 2022,
    },
    {
      title: "103: No Loss Lottery",
      link: "/ctf/0x103",
      year: 2022,
    },
    {
      title: "104: Bankrupt Solman Brothers",
      link: "/ctf/0x104",
      year: 2022,
    },
    {
      title: "105: Borrow and Bye 💸",
      link: "/ctf/0x105",
      year: 2022,
    },

    // {
    //   title: "106: Dark horse",
    //   link: "",
    //   year: 2022,
    // },
  ];

  return (
    <div className="px-4 sm:px-0 max-w-4xl m-auto">
      <Head>
        <title>SuperSec</title>
        <meta name="description" content="Solana CTFs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative pt-8 pb-3 px-2 sm:px-0">
        <div className="flex flex-col sm:flex-row sm:gap-12 items-start py-3">
          <div className="text-[#a7a7a7] basis-1/4">
            <span>CTFs</span>
          </div>

          <div
            className="basis-3/4 content grow"
            style={{ width: "-webkit-fill-available" }}
          >
            <section>
              <ul>
                {CTFs.map((sbp) => (
                  <li
                    className="flex justify-between mb-4 sm:mb-2"
                    key={sbp.title}
                  >
                    <a href={sbp.link}>{sbp.title}</a>
                    <div className="text-[#888] min-w-[130px] text-right">
                      {sbp.year}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
