import Head from "next/head";
import { Header } from "../../components/Header";

import fs from "fs";
import matter from "gray-matter";
import markdown from "markdown-it";
import shiki from "shiki";

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

function BlogPage({ frontMatter, content }: any) {
  return (
    <>
      <div className="px-4 sm:px-0 max-w-4xl m-auto">
        <Head>
          <title>SuperSec</title>
          <meta name="description" content="Solana CTFs" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        <main className="relative pt-8 pb-3 px-2 sm:px-0"></main>
      </div>

      <div className="">
        <div className="m-10 flex flex-col lg:items-center">
          <h1 className="text-2xl">{frontMatter.title}</h1>

          <br />
          <div className="line w-full"></div>
          <article
            className="prose force_widht"
            dangerouslySetInnerHTML={{
              __html: markdown({ html: true }).render(content),
            }}
          />
        </div>
      </div>
    </>
  );
}

export default BlogPage;
