import Head from "next/head";
import { Header } from "../components/Header";

import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";

export async function getStaticProps() {
  // Get all the hacks from hackhub dir
  const files = fs.readdirSync("hackhub");
  const guides = fs.readdirSync("guide");


  const hacks = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const readFiles = fs.readFileSync(`hackhub/${filename}`);
    const { data: frontMatter } = matter(readFiles);

    return {
      slug,
      frontMatter,
    };
  });

  const guide = guides.map((filename) => {
    const slug = filename.replace(".md", "");
    const readFiles = fs.readFileSync(`guide/${filename}`);
    const { data: frontMatter } = matter(readFiles);

    return {
      slug,
      frontMatter,
    };
  });

  return {
    props: {
      hacks,
      guide
    },
  };
}

export default function Home({ hacks, guide } : any) {
  // const security_best_practices = [
  //   {
  //     title: "101: Basic philoshpy for writing secure smart contract",
  //     link: "",
  //     year: 2022,
  //   },
  //   {
  //     title: "Systematic approach to auditing smart contract",
  //     link: "",
  //     year: 2022,
  //   },
  // ];
  return (
    <div className="px-4 sm:px-0 max-w-4xl m-auto">
      <Head>
        <title>SuperSec</title>
        <meta name="description" content="Solana CTFs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative pt-8 pb-3 px-2 sm:px-0">
        {/* <!-- Writing --> */}
        {/* <div className="flex flex-col sm:flex-row sm:gap-12 items-start py-3">
        <div className="label basis-1/4 text-[#888]">
          <span>Smart Contract Security & Best Practices</span>
        </div>
        <div
          className="basis-3/4 content grow width-fill-webkit"
        >
          <section>
            <ul>
              {
                security_best_practices.map((sbp) => (
                  <li key={sbp.link} className="flex justify-between mb-4 sm:mb-2">
                    <a href={sbp.link}>{sbp.title}</a>
                    <div className="text-[#888] min-w-[130px] text-right">
                      {sbp.year}
                    </div>
                  </li>
                ))
              }
            </ul>
          </section>
        </div>
      </div> */}

        {/* <!-- Hacks --> */}
        <div className="flex flex-col sm:flex-row sm:gap-12 items-start py-3">
          <div className="label basis-1/4 text-[#888]">
            <span>Hack Explanations</span>
          </div>
          <div className="basis-3/4 content grow">
            <section>
              <ul>
                {hacks.map((hack: any) => (
                  <>
                    {hack.frontMatter.active ? (
                      <li className="flex justify-between mb-4 sm:mb-2">
                        <Link href={`/hacks/${hack.slug}`}>
                          {hack.frontMatter.title}
                        </Link>
                        <div className="text-[#888] min-w-[130px] text-right">
                          {hack.frontMatter.year}
                        </div>
                      </li>
                    ) : null}
                  </>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* <!-- Guide --> */}
        <div className="flex flex-col sm:flex-row sm:gap-12 items-start py-3">
          <div className="label basis-1/4 text-[#888]">
            <span>Guide</span>
          </div>
          <div className="basis-3/4 content grow">
            <section>
              <ul>
                {guide.map((g: any) => (
                  <>
                    {g.frontMatter.active ? (
                      <li className="flex justify-between mb-4 sm:mb-2">
                        <Link href={`/guides/${g.slug}`}>
                          {g.frontMatter.title}
                        </Link>
                        <div className="text-[#888] min-w-[130px] text-right">
                          {g.frontMatter.year}
                        </div>
                      </li>
                    ) : null}
                  </>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
