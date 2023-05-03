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

  return {
    props: {
      frontMatter,
      content,
    },
  };
}

export default function BlogPage({ frontMatter, content }: any) {
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
      <div className="flex flex-col w-full items-center">
        <div className="flex flex-col w-full items-center max-w-xl mt-20">
          <h1 className="flex font-sans text-3xl tracking-wider">
            {frontMatter.title}
          </h1>
          <br />
          <ReactMarkdown
            className="prose w-full flex flex-col font-['Inter'] prose-headings:font-['JetBrains_Mono'] max-w-xl prose-headings:text-home-neon"
            remarkPlugins={[remarkGfm, remarkToc, remarkSlug]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
