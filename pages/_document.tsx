import React from "react";

import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&family=Archivo&display=swap"
            rel="stylesheet"
          />
          <meta name="description" content="" />
          <meta name="keywords" content="" />
          <meta name="robots" content="index, follow" />
          {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
          <meta property="og:title" content="" />
          <meta property="og:description" content="" />
          <meta property="og:image" content="" />
          <meta name="twitter:title" content="" />
          <meta name="twitter:site" content="" />
          <meta name="twitter:description" content="" />
          <meta name="twitter:image" content="" />
          <meta name="twitter:site" content="" />
          <meta name="twitter:description" content="" />
          <meta name="twitter:image" content="" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
