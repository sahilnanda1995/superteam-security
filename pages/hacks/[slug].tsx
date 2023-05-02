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

// function BlogPage({ frontMatter, content }: any) {
//   return (
//     <>
//       <div className="px-4 sm:px-0 max-w-4xl m-auto">
//         <Head>
//           <title>SuperSec</title>
//           <meta name="description" content="Solana CTFs" />
//           <link rel="icon" href="/favicon.ico" />
//         </Head>

//         <Header />

//         <main className="relative pt-8 pb-3 px-2 sm:px-0"></main>
//       </div>

//       <div className="">
//         <div className="m-10 flex flex-col lg:items-center">
//           <h1 className="text-2xl">{frontMatter.title}</h1>

//           <br />
//           <div className="line w-full"></div>
//           <article
//             className="prose force_widht"
//             dangerouslySetInnerHTML={{
//               __html: markdown({ html: true }).render(content),
//             }}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

export default function BlogPage({ frontMatter, content }: any) {
  //   const renderers = {
  //     heading: ({ level, children }) => {
  //       if (level === 1) {
  //         return <h1>{children}</h1>;
  //       } else {
  //         return <h2 id={children}>{children}</h2>;
  //       }
  //     },
  //     toc: ({ ast, heading }) => {
  //       return (
  //         <>
  //           <h2>{heading}</h2>
  //           <ol>
  //             {ast.map((node) => (
  //               <li key={node.id}>
  //                 <a href={`#${node.value}`}>{node.value}</a>
  //                 {node.items.length > 0 && (
  //                   <ol>
  //                     {node.items.map((item) => (
  //                       <li key={item.id}>
  //                         <a href={`#${item.value}`}>{item.value}</a>
  //                       </li>
  //                     ))}
  //                   </ol>
  //                 )}
  //               </li>
  //             ))}
  //           </ol>
  //         </>
  //       );
  //     },
  //   };

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-home-bg font-['JetBrains_Mono']">
      <title>SuperSec</title>
      {/* <Image
        alt="bg_img"
        src="/assets/bg_img.svg"
        fill
        className="fixed inset-0 -z-10 h-full w-full object-cover -mt-10 sm:-mt-80 lg:-mt-56"
      /> */}
      <div className="flex min-h-screen bg-home-bg flex-col py-8 lg:py-10 px-6 lg:px-[72px]">
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
        <div className="mx-auto max-w-2xl py-10 lg:py-12"></div>
        <div className="m-10 flex flex-col lg:items-center">
          <h1 className="font-sans text-3xl tracking-wider">
            {frontMatter.title}
          </h1>

          <br />
          <div className="border border-home-neon bg-home-neon w-full h-0"></div>
          {/* <article
            className="prose force_widht font-['Inter'] prose-headings:font-['JetBrains_Mono'] prose-headings:text-home-neon"
            dangerouslySetInnerHTML={{
              __html: markdown({ html: true }).render(content),
            }}
          /> */}
          <ReactMarkdown
            className="prose force_widht font-['Inter'] prose-headings:font-['JetBrains_Mono'] prose-headings:text-home-neon"
            children={content}
            remarkPlugins={[remarkGfm, remarkToc, remarkSlug]}
            // renderers={renderers}
            // pluginsOptions={{
            //   toc: {
            //     heading: "Contents",
            //   },
            // }}
          />
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
