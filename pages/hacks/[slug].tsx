import Head from "next/head";
import { Header } from "../../components/Header";

import fs from "fs";
import matter from "gray-matter";
import markdown from "markdown-it";
import shiki from "shiki";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkSlug from "remark-slug";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import protocols from "../../utils/protocols";
import { useRouter } from "next/router";
import remarkGemoji from "remark-gemoji";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight/lib";
import rehypeSanitize from "rehype-sanitize";
import remarkDirective from "remark-directive";

export async function getStaticPaths() {
  // get slugs
  const files = fs.readdirSync("hackhub");
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }: any) {
  // get content for each blog
  console.log(slug);
  const mdfile = fs.readFileSync(`hackhub/${slug}.md`);
  const { data: frontMatter, content } = matter(mdfile);
  const info = protocols
    .filter((data) => data.link == `/hacks/${slug}`)
    .reduce((data) => {
      return data;
    });
  console.log("info");
  console.log(info);

  return {
    props: {
      frontMatter,
      content,
      info,
    },
  };
}

import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import USDollar from "../../utils/formatNumberUSD";

function MyPopover({ toc, links }: any) {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover className="relative text-black w-full max-w-xs">
      {/* Popover trigger */}
      <Popover.Button
        className="bg-gray-200 px-4 py-2 rounded-md mb-4"
        // onClick={() => setIsOpen(!isOpen)}
      >
        <Bars3Icon className="h-6 w-6" />
      </Popover.Button>

      {/* Popover panel */}
      <Popover.Panel className="absolute bottom-full min-w-full mb-2 bg-white shadow-lg rounded-lg p-4">
        {/* Popover content */}
        <div className="flex flex-col w-full">
          <div>contents</div>
          <ul className="flex flex-col text-xs mt-2 space-y-1 list-outside">
            {toc.map((data: string, index: number) => (
              <li key={index} className="hover:underline">
                <Link href={`#${links[index]}`} scroll={false}>
                  {data}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Popover.Panel>
    </Popover>
  );
}

export default function BlogPage({ frontMatter, content, info }: any) {
  return (
    <div className="flex flex-col w-full min-h-screen items-center py-8 lg:py-10 px-6 lg:px-[72px] bg-home-bg font-['JetBrains_Mono']">
      <Head>
        <title>SuperSec</title>
      </Head>
      <Navbar />
      <Link
        href="/"
        className="flex text-base w-full text-guide-sub-txt mt-10 leading-5 font-['JetBrains_Mono']"
      >
        &lt; Hacks
      </Link>
      <div className="relative w-full items-center mt-20">
        {frontMatter?.toc && frontMatter.toc_links && (
          <div className="fixed w-1/6 pr-8 lg:pr-2">
            <div className="hidden 2lg:flex flex-col">
              <div>contents</div>
              <ul className="flex flex-col text-sm mt-2 space-y-1 list-outside">
                {frontMatter.toc.map((data: string, index: number) => (
                  <li key={index} className="hover:underline">
                    <Link
                      href={`#${frontMatter.toc_links[index]}`}
                      scroll={false}
                    >
                      {data}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {frontMatter?.toc && frontMatter.toc_links && (
          <div className="fixed pr-8 lg:pr-2 bottom-2 w-full">
            <div className="2lg:hidden flex w-full">
              <MyPopover toc={frontMatter.toc} links={frontMatter.toc_links} />
              {/* <ul className="flex flex-col text-sm mt-2 space-y-1 list-outside">
              {frontMatter.toc.map((data: string, index: number) => (
                <li key={index} className="hover:underline">
                  <Link href={`#${frontMatter.toc_links[index]}`}>{data}</Link>
                </li>
              ))}
            </ul> */}
            </div>
          </div>
        )}
        <div className="flex flex-col w-full items-center">
          <div className="flex flex-col w-full items-center max-w-xl">
            <div className="flex flex-col space-y-2">
              <div className="text-[#A0A0A0] font-['JetBrains_Mono'] text-left w-full">
                {info.exploit_type}
                <span className="font-bold text-[#535353] px-1">&bull;</span>
                {info.doh}
                <span className="font-bold text-[#535353] px-1">&bull;</span>
                {USDollar.format(info.amount)} Stolen
              </div>
              <h1 className="flex w-full text-left font-archivosemi text-3xl">
                {frontMatter.title}
              </h1>
              <div className="text-[#A0A0A0] font-['JetBrains_Mono'] text-left w-full">
                by&nbsp;
                {info.authors.map((data: any, index: any) => {
                  if (index == 0) {
                    return (
                      <Link
                        href={data.socials}
                        target="_blank"
                        className="underline underline-offset-4"
                      >
                        {data.name}
                      </Link>
                    );
                  } else
                    return (
                      <>
                        &nbsp;&&nbsp;
                        <Link
                          href={data.socials}
                          target="_blank"
                          className="underline underline-offset-4"
                        >
                          {data.name}
                        </Link>
                      </>
                    );
                })}
              </div>
            </div>
            <br />
            <ReactMarkdown
              className="prose w-full flex flex-col font-['Inter'] prose-headings:font-['JetBrains_Mono'] max-w-xl prose-headings:text-home-neon"
              remarkPlugins={[
                remarkGfm,
                remarkToc,
                remarkSlug,
                remarkGemoji,
                remarkDirective,
              ]}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
