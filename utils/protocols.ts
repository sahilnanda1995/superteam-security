const protocols = [
  {
    id: 1,
    name: "Cashio",
    title: "Stablecoin",
    amount: 48000000,
    exploit_type: "Faulty Account Validation",
    technique: "Fake Collateral validated correctly",
    audit_by: "Unaudited",
    hackmd_link: "https://security.superteam.fun/hacks/cahio-hack",
    link: "/hacks/cashio-hack",
    doh: "2022-03-23",
    authors: [
      { name: "prastut", socials: "https://twitter.com/prastutkumar" },
      { name: "deep", socials: "https://twitter.com/0xDeep" },
    ],
  },
  {
    id: 2,
    name: "Jet",
    title: "Lending and Borrowing Crypto Assets",
    amount: 0,
    exploit_type: "Vulnerability",
    technique:
      "Broken C-ratio calculation leading to borrow all liquidity without posting collateral ",
    audit_by: "Ottersec",
    hackmd_link: "https://security.superteam.fun/hacks/jet-hack",
    link: "/hacks/jet-hack",
    doh: "2021-12-21",
    authors: [{ name: "prastut", socials: "https://twitter.com/prastutkumar" }],
  },
  {
    id: 3,
    name: "Wormhole",
    title: "Bridge",
    amount: 325000000,
    exploit_type: "Spoofed Signature exploit",
    technique:
      "Bypass validation of fake signatures to authorisee mint of 120k ETH",
    audit_by: "Neodyme",
    hackmd_link: "https://security.superteam.fun/hacks/wormhole-hack",
    link: "/hacks/wormhole-hack",
    doh: "2022-02-02",
    authors: [
      { name: "prastut", socials: "https://twitter.com/prastutkumar" },
      { name: "deep", socials: "https://twitter.com/0xDeep" },
    ],
  },
  {
    id: 4,
    name: "Crema",
    title: "Concentrated Liquidity Provider ",
    amount: 8800000,
    exploit_type: "Faulty Account Validation",
    technique: "Fake Account supplied to issue excess LP fees",
    audit_by: "Bramah Systems",
    hackmd_link: "https://security.superteam.fun/hacks/crema-hack",
    link: "/hacks/crema-hack",
    doh: "2022-07-03",
    authors: [
      { name: "prastut", socials: "https://twitter.com/prastutkumar" },
      { name: "deep", socials: "https://twitter.com/0xDeep" },
    ],
  },
  {
    id: 5,
    name: "Nirvana",
    title: "Stablecoin",
    amount: 3500000,
    exploit_type: "Flashloan Attack",
    technique: "Inflate price using flashloan to drain protocol treasury",
    audit_by: "Sec3 Auto Audit Software",
    hackmd_link: "https://security.superteam.fun/hacks/nirvana",
    link: "/hacks/nirvana",
    doh: "2022-07-28",
    authors: [
      { name: "prastut", socials: "https://twitter.com/prastutkumar" },
      { name: "deep", socials: "https://twitter.com/0xDeep" },
    ],
  },
  {
    id: 6,
    name: "Raydium",
    title: "Order book Decentralized Exchange",
    amount: 4400000,
    exploit_type: "Private Key Compromised",
    technique:
      "Illegally withdraw liquidity by using compromised admin's private key.",
    audit_by: "N/A",
    hackmd_link: "https://security.superteam.fun/hacks/raydium-hack",
    link: "/hacks/raydium-hack",
    doh: "2022-12-16",
    authors: [
      { name: "prastut", socials: "https://twitter.com/prastutkumar" },
      { name: "deep", socials: "https://twitter.com/0xDeep" },
    ],
  },
  {
    id: 7,
    name: "Mango ",
    title: "Leverage Trading",
    amount: 115000000,
    exploit_type: "Price Manipulation",
    technique:
      "Manipulate $MNGO price to profit from leveraged open long position. Use unrealized PNL to borrow liquidity.",
    audit_by: "N/A",
    hackmd_link: "https://hackmd.io/q3J-B87pRV2R0k7mlBl2Jw?view",
    link: "/hacks/mango-hack",
    doh: "2022-10-11",
    authors: [
      { name: "prastut", socials: "https://twitter.com/prastutkumar" },
      { name: "deep", socials: "https://twitter.com/0xDeep" },
    ],
  },
  {
    id: 8,
    name: "Solend",
    title: "Lending and Borrowing Crypto Assets",
    amount: 1260000,
    exploit_type: "Price Oracle Attack",
    technique: "Inflated price of collateral to borrow excess liquidity",
    audit_by: "N/A",
    hackmd_link: "https://hackmd.io/@prastut/Bkxx_JC-h",
    link: "/hacks/solend-poa-hack",
    doh: "2022-11-02",
    authors: [
      { name: "prastut", socials: "https://twitter.com/prastutkumar" },
      { name: "deep", socials: "https://twitter.com/0xDeep" },
    ],
  },
  {
    id: 9,
    name: "Solend",
    title: "Lending and Borrowing Crypto Assets",
    amount: 0,
    exploit_type: "Faulty Account Validation",
    technique:
      "Bypass admin checks using fake account to manipulate core protocol parameters",
    audit_by: "N/A",
    hackmd_link: "https://hackmd.io/@prastut/r1wMdtcf3",
    link: "/hacks/solend-fav-hack",
    doh: "2021-08-19",
    authors: [
      { name: "prastut", socials: "https://twitter.com/prastutkumar" },
      { name: "deep", socials: "https://twitter.com/0xDeep" },
    ],
  },
  {
    id: 10,
    name: "Slope wallet",
    title: "Wallet",
    amount: 5000000,
    exploit_type: "Private Key Compromise",
    technique:
      "Transferred assets to hacker account using compromised private key",
    audit_by: "N/A",
    hackmd_link: "https://hackmd.io/@prastut/SJoJUzKz3",
    link: "/hacks/slope-wallet-hack",
    doh: "2022-08-02",
    authors: [
      { name: "prastut", socials: "https://twitter.com/prastutkumar" },
      { name: "deep", socials: "https://twitter.com/0xDeep" },
    ],
  },
];

export default protocols;
