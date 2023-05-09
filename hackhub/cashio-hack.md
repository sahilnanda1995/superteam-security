---
title: "Cashio protocol - “Robinhood” hacker steals $52.8 million"
description: "Learn how rust memory layout works"
pubDate: "Sep 14 2022"
year: 2022
active: true
toc:
  [
    "What would you use Cashio protocol for?",
    "How did the hacker steal funds?",
    "Technical details",
    "How to fix the vulnerability",
    "What did hacker do with the funds after the exploit was successful",
    "Hacker hailed as robinhood",
    "Appendix",
  ]
toc_links:
  [
    "what-would-you-use-cashio-protocol-for",
    "how-did-the-hacker-steal-funds",
    "technical-details",
    "how-to-fix-the-vulnerability",
    "what-did-hacker-do-with-the-funds-after-the-exploit-was-successful",
    "hacker-hailed-as-robinhood",
    "appendix",
  ]
---

Cashio - a protocol that builds a decentralized stablecoin $CASH - got hacked for $52M.

The $CASH stablecoin, whose value is supposed to be pegged to $1 dollar, plummeted to a low of $0.0005 right after the exploit!

Let’s first understand what cashio protocol does and then deep dive in figuring out how the hacker tricked the protocol in giving them all the user deposited funds.

## What would you use Cashio protocol for?

Cashio is a decentralized stablecoin protocol on Solana that manages the issuance of $CASH stablecoin - a token that is soft pegged 1:1 to $USD.

The protocol allows you do 2 things:

- mint $CASH stablecoin by depositing an equivalent amount of LP tokens.
  - For eg: to mint $100 CASH, you had to deposit $100 worth of USDT-USDC LP tokens.
- Burn $CASH to redeem the equivalent amount of LP tokens.

Once you get $CASH, you can then use it as a store of value, medium of exchange and swap 1:1 to any stablecoin

## How did the hacker steal funds?

As we mentioned above, a user can burn $CASH tokens to redeem an equivalent amount of LP tokens.

**Now what if you create fake $CASH tokens (that have no value in the market) out of thin air and “convince” the protocol that you in fact have legit tokens and the protocol hands over the underlying LP tokens (that have real value in the market)?**

That’s the vulnerability the hacker was able to spot and exploit.

High level view of how the hack worked:

- Hacker cleverly exploited the protocol’s $CASH minting code by depositing fake invaluable collateral to mint 2 billion valuable $CASH tokens.
- Burned part of these fake $CASH tokens to get all the USDC-USDT LP tokens (collateral that has real value in the market)
- They then swapped these collateral LP tokens on Saber (a decentralized exchange) to get $16.4 million USDC and $10.8 million USDT respectively.
- Swapped the remaining $CASH tokens for $8.6 million UST and $17 million USDC through Saber exchange.

It’s funny that the project’s tagline was literally:

<img src="/assets/cashio_title.png" alt="Cashio patch.">
Now that you understand at a high level how the hack worked, let’s deep dive into technical details of the hack.

## Technical details:

Let’s look inside the hood of Cashio protocol.

Cashio mainly consisted of 2 programs:

1. Brr - program - responsible for printing and burning $CASH tokens
2. Bankman - program - responsible for recording and tracking collateral that is required to mint $CASH

The vulnerability lied in the Brr program. It has 2 instructions:

1. print_cash
2. burn_cash

Let’s zoom into `print_cash` instruction:

- The print_cash instruction is responsible for minting $CASH tokens.
- It receives a list of accounts including the “Bank” account and “Collateral” account.
- These accounts are responsible to record and track the collateral that is allowed to mint $CASH.
- It also has validation logic that is given below.

<img src="/assets/cashio_validate.png" alt="Cashio account validation.">

The vulnerability lies in the above code as it fails to check the validity of the “Bank” account.

- That means an attacker could create a fake bank account, transfer fake collateral into it to bypass the validation checks.
- The only check of the input Bank account is to ensure the input Collateral account is associated with the Bank account (line 12). However, it can be easily bypassed by providing a fake Collateral account as well.
- In fact, all other checks become meaningless because the Bank account is the source of trust. And the hacker did exactly that: out of the 12 input accounts, the attacker created 8 fake accounts to pass all of the validity checks.

As a result, a Bank with a worthless collateral could be used to mint real CASH tokens.

And therefore, the hacker (using the [6D…Vuzw](https://solscan.io/account/6D7fgzpPZXtDB6Zqg3xRwfbohzerbytB2U5pFchnVuzw#splTransfers) address) sent the [attack transaction](https://solscan.io/tx/4fgL8D6QXKH1q3Gt9GPzeRDpTgq4cE5hxf1hNDUWrJVUe4qDJ1xmUZE7KJWDANT99jD8UvwNeBb1imvujz3Pz2K5) that consisted of a fake bank with fake collateral to mint 2B $CASH tokens!

Please check the Attack Payload in the Appendix section that describes what all was sent through the attack transaction.

## How to fix the vulnerability?

We need to add 1 line of code that is `assert_keys_eq!(self.bank.crate_mint, self.crate_mint)`.

This validation ensures that the Bank account's `crate_mint` is the correct `crate_mint` for $CASH.
<img src="/assets/cashio_patch.png" alt="Cashio patch.">

[Patch link](https://github.com/cashioapp/cashio/commit/7df658184c2610139fa2c0058363c66b28add4c4#diff-5a7cf0dd74343ddc0823329b685703a7666125f78f0d9cfe73749bf1cee22aa8R13)

## What did hacker do with the funds after the exploit was successful?

1. Part of CASH tokens were burnt for LP tokens USDT-USDC pool & swapped for USDT, USDC

   - [Tx 1](https://solscan.io/tx/67D5eFRRa4xDVmWSEuGwNKYScroBzw2ECMLCWN516y8ZhYciprW3HPWADX2RARqqTyUED7d23hHzjJfDdYf3J7w) to burn $CASH to get USDT-USDC LP
   - Tx 2 to swap USDT-USDC LP for 16.4M $USDC and 10.8M $USDT https://solscan.io/tx/pjUgAeUfWaSSJuw2Cq1cQ9gHNWs8jkxJMtHqVAMuwhg3Uk9LN9Y2obfwt6Qm8bztg56xidWBMytzmqyWzvbsrwH

2. Around 1.97 billion CASH tokens were swapped for $8 million UST and $17 million USDC

   - Tx: [https://solscan.io/tx/3qeUYN3sjxxhZFTEGoDYEe4YNwqqQH8tpaa4UGdAqfVNWautK9fQ5JRoo4W1YKZ6ouVkk3sC51WQiwmxbpuinXm3](https://solscan.io/tx/3qeUYN3sjxxhZFTEGoDYEe4YNwqqQH8tpaa4UGdAqfVNWautK9fQ5JRoo4W1YKZ6ouVkk3sC51WQiwmxbpuinXm3)

3. Then hacker converted a portion of the funds and transfer to Ethereum blockchain
   - Converted ~$11 million USD worth of stablecoins to ETH via Jupiter:
     - Conversion to ETH logs:
       - $5.5 million USDC -> 1848 ETH
       - $5.3 million USDT -> 1769 ETH
       - $459k USDC -> 155 ETH
     - Bridge ETH to Ethereum via Wormhole logs:
       - Transfer 1000 ETH
       - Transfer of 2618 ETH
       - Transfer of 155 ETH
   - Converted $21M USDC to UST and bridge to Ethereum:
     - Conversion to UST
     - Bridge UST to Ethereum via Wormhole
   - Transferred $7.9M USDC to Ethereumn

## Hacker hailed as “Robinhood”

The hacker had embedded a hidden messsage on one of their’s transactions on Ethereum.
[https://etherscan.io/tx/0xa8394d2e55042f84d096c72dd1075fa2648faf88e248c7992273b4d50a6a647b](https://etherscan.io/tx/0xa8394d2e55042f84d096c72dd1075fa2648faf88e248c7992273b4d50a6a647b)
<img src="/assets/cashio_hacker_sta.png" alt="Cashio patch.">

**By looking through the hacker’s address on Solana, they indeed have stuck to their word where we can see numerous transactions sending USDC to accounts!**

We don’t have proof whether the hacker did donate money to charity or not.

## Appendix:

### Links:

- [GitHub - cashioapp/cashio: $CASH Rules Everything Around Me](https://github.com/cashioapp/cashio).
- [arrowprotocol](https://github.com/arrowprotocol/arrow)

### Attack payload

- bank (faked): [5ahaayrV5epV3oKChn4S4F5oek2vzoMbRpuC2fB4Q2kv](https://explorer.solana.com/address/5ahaayrV5epV3oKChn4S4F5oek2vzoMbRpuC2fB4Q2kv) (created by [bankman program](https://explorer.solana.com/address/BANKhiCgEYd7QmcWwPLkqvTuuLN6qEwXDZgTe6HEbwv1) with faked crate_mint and faked crate_token)
- collateral (faked): [HrCe9oUYRJKpfWiUwrkRNCxHSRx8gDX1bSF98Aq8qqjq](https://explorer.solana.com/address/HrCe9oUYRJKpfWiUwrkRNCxHSRx8gDX1bSF98Aq8qqjq) (created by the token program with faked collateral.mint [GCnK63zpqfGwpmikGBWRSMJLGLW8dsW97N4VAXKaUSSC](https://explorer.solana.com/address/GCnK63zpqfGwpmikGBWRSMJLGLW8dsW97N4VAXKaUSSC))

- crate_token: [J77Nq48nbq4Etf1voss38R3dTdR3yD7y5F6W6TaVHvmb](https://explorer.solana.com/address/J77Nq48nbq4Etf1voss38R3dTdR3yD7y5F6W6TaVHvmb) (valid crate_token with valid CASH mint)

- crate_mint: [CASHVDm2wsJXfhj6VWxb7GiMdoLc17Du7paH4bNr5woT](https://explorer.solana.com/address/CASHVDm2wsJXfhj6VWxb7GiMdoLc17Du7paH4bNr5woT) (CASH mint)

- crate_collateral_tokens (faked): [EAYzx8dqABiNdZKtfavg16rdyShHQB2k5hUa6UmXHiky](https://explorer.solana.com/address/EAYzx8dqABiNdZKtfavg16rdyShHQB2k5hUa6UmXHiky) (created by the token program with faked crate_collateral_tokens.mint == collateral.mint )

- arrow (faked): [HnWb284fT2yw2jjWyw6Ex7cf72PJvjBSYsK5H4fHEGpw](https://explorer.solana.com/address/HnWb284fT2yw2jjWyw6Ex7cf72PJvjBSYsK5H4fHEGpw) (created by the arrow program with faked arrow.mint == collateral.mint )

- saber_swap (faked): [8uBqLjfRrwKxDG92nxDVGbkhbsZfaBqJ8Y2wJoXuHmHU](https://explorer.solana.com/address/8uBqLjfRrwKxDG92nxDVGbkhbsZfaBqJ8Y2wJoXuHmHU) (faked swap_info account initialized by the Saber Stable Swap Program with faked pool_mint, reserve_a and reserve_b)

- pool_mint (faked): [GoSK6XvdKquQwVYokYz8sKhFgkJAYwjq4i8ttjeukBmp](https://explorer.solana.com/address/GoSK6XvdKquQwVYokYz8sKhFgkJAYwjq4i8ttjeukBmp)

- reserve_a (faked): [DBgB7Bw7mQ5Qk7VVcV51qL8FyLDsJDHV5bnJNsPSwVgL](https://explorer.solana.com/address/DBgB7Bw7mQ5Qk7VVcV51qL8FyLDsJDHV5bnJNsPSwVgL)

- reserve_b (faked): [3efHXgB12zP1EzKivsYTZeqAWc5YYCio9Dri9XATFsu3](https://explorer.solana.com/address/3efHXgB12zP1EzKivsYTZeqAWc5YYCio9Dri9XATFsu3)

- token_program: [TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA](https://explorer.solana.com/address/TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA)

- crate_token_program: [CRATwLpu6YZEeiVq9ajjxs61wPQ9f29s1UoQR9siJCRs](https://explorer.solana.com/address/CRATwLpu6YZEeiVq9ajjxs61wPQ9f29s1UoQR9siJCRs)
