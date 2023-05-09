---
title: "Raydium Protocol - hacker gains god mode access to steal ~$4.4M"
pubDate: "Jan 26 2023"
year: 2022
active: true
toc:
  [
    "Why would you use Raydium protocol?",
    "How did the hacker steal funds?",
    "Technical Details:",
    "Patch details",
  ]
toc_links:
  [
    "why-would-you-use-raydium-protocol",
    "how-did-the-hacker-steal-funds",
    "technical-details",
    "patch-details",
  ]
---

Raydium - an AMM based DEX utilizing limit order book to enable trades - got hacked for $4M as hacker was able to get access to private keys for pool owner account.

They then simply withdrew liquidity from various liquidity pools on the protocol to their account.

![](https://i.imgur.com/QG0UU8O.png)

## Why would you use Raydium protocol?

Raydium is essentially a DEX where users can users can swap, trade and provide liquidity to earn yield on digital assets.

It's different from other AMM's (like Uniswap v2 inspired DEX's) as it's AMM provides on-chain liquidity to a central limit order book. This design allows for greater capital efficiency.

![](https://i.imgur.com/952FVYu.jpg)

## How did the hacker steal funds?

The hacker was able to get access to the private key of "Pool Owner" account.

This Pool Owner account had admin authority over certain functions of liquidity pools inside Raydium including withdrawing fees and changing fee parameters.

Given basically hacker got god mode access, they:

1. Withdrew trading fees earned by swaps from pools.
2. Changed trading fee parameters in way to increase expected fees from the pools and then withdrew the same.

The following pools were affected:

- SOL-USDC
- SOL-USDT
- RAY-USDC
- RAY-USDT
- RAY-SOL
- stSOL-USDC
- ZBC-USDC
- UXP-USDC
- whETH-USDC

Approx total funds exploited by attacker

- RAY 1,879,638
- stSOL 3,214
- whETH 39.3
- USDC 1,094,613
- SOL 120,512
- UXP 21,068,507
- ZBC 9,758,647
- USDT 110,427

**Total: ~$4.4M worth of assets.**

Then hacker proceeded to bridge majority of funds to Ethereum, swapped the funds to ETH and then deposited them into Tornado to cover their footprints.

100k SOL worth remained in the hacker's Solana address.

## Technical details:

Relevant addresses:

1. Hacker's account on Solana: [AgJddDJLt17nHyXDCpyGELxwsZZQPqfUsuwzoiqVGJwD](https://solana.fm/address/AgJddDJLt17nHyXDCpyGELxwsZZQPqfUsuwzoiqVGJwD/transfers?cluster=mainnet-qn1)
2. Pool Owner Account (whos private key hacker got access to): [HggGrUeg4ReGvpPMLJMFKV69NTXL1r4wQ9Pk9Ljutwyv](https://solscan.io/account/HggGrUeg4ReGvpPMLJMFKV69NTXL1r4wQ9Pk9Ljutwyv)

**How did the hacker gain access to the private key to the Pool Owner Account?**

- According to Raydium's [post-mortem blog](https://raydium.medium.com/detailed-post-mortem-and-next-steps-d6d6dd461c3e):
  - The Pool Owner account mentioned above was initially deployed on a virtual machine with a dedicated internal server.
  - After additional review, there is currently no evidence that the private key for the Pool Owner account was ever passed, shared, transferred, or stored locally outside of the virtual machine where it was originally deployed.
  - Initial suspicions are that the attacker may have gained remote access to the virtual machine or internal server where the account was deployed. The exact intrusion vector has yet to be identified, but a trojan attack may be one possibility.
- So it's still not clear how the hacker was able to gain access.

Around 2 PM UTC on 16 December 2022, the hacker's account executed ~1000 transactions ([eg](https://solscan.io/tx/3iyVofF2PSaVFMzXaUbAwp3J19s43mRg8MuZHwFJs3bHhMCVciuSx5MWnztoXeJfjdTDu2JqWZa7p55LyEiqd8sw)):

- Each transaction removed liquidity by calling `withdrawPNL` instruction from Raydium without depositing a corresponding LP token, effectively seizing possession of liquidity providers’ funds.

  - ![](https://i.imgur.com/aPODKrQ.png)

- The signer on these transactions was the Raydium contracts' hardcoded owner pubkey, so their private key was most likely compromised.
  - ![](https://i.imgur.com/L22Kfls.png)

## Patch details

1. Initial mitigation steps taken by Raydium team:

   - The first step was to remove the hacker's ability to exploit more pools.
   - So Raydium team
     - revoked access to compromised account ([HggGrUeg4ReGvpPMLJMFKV69NTXL1r4wQ9Pk9Ljutwyv](<](https://solscan.io/account/HggGrUeg4ReGvpPMLJMFKV69NTXL1r4wQ9Pk9Ljutwyv)>))
     - and replaced it with a new account held on a hardware wallet
   - This patch revoked the hacker’s authority and ability to further exploit the pools.

2. Long term risk mitigation steps taken by Raydium team:
   - Raydium AMM V4 program was upgraded using Squads multisig to remove unnecessary admin parameters that could potentially impact funds if compromised.
   - So even in future private key account got compromised, the hacker will not have admin functionalities access.
