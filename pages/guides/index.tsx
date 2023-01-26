import Head from "next/head";
import Image from "next/image";
import { Header } from "../../components/Header";

import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";

export async function getStaticProps() {
    // get the hacks
    const files = fs.readdirSync("guide");
    const posts = files.map((filename) => {
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
        posts,
      },
    };
}

export default function HackHome({posts}: any) {
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
            <span>Hacks</span>
          </div>

          <div
            className="basis-3/4 content grow"
            style={{ width: "-webkit-fill-available" }}
          >
            <section>
              <ul>
                {posts.map((sbp: any) => (
                  <li
                    className="flex justify-between mb-4 sm:mb-2"
                    key={sbp.frontMatter.title}
                  >
                    <Link href={`/guides/${sbp.slug}`}>{sbp.frontMatter.title}</Link>
                    <div className="text-[#888] min-w-[130px] text-right">
                      {sbp.frontMatter.year}
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
