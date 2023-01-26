import '../styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from "next/dynamic";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { Analytics } from '@vercel/analytics/react';

const endpoint = "https://api.devnet.solana.com";

const WalletProvider = dynamic(
  () => import("../contexts/ClientWalletProvider"),
  {
    ssr: false,
  }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <ConnectionProvider endpoint={endpoint}>
    <WalletProvider>
      <Component {...pageProps} />
      <Analytics />
    </WalletProvider>
  </ConnectionProvider>
  </>
  );
}
