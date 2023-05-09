---
title: "Solend Protocol - Hacker Attempts To Steal ~$2M By Manipulating Core Parameters"
pubDate: "Jan 26 2023"
year: 2022
active: true
toc:
  [
    "Why would you use Solend protocol?",
    "Pre-Context to explain the hack:",
    "How did the hacker attempt to steal funds?",
    "Technical Explanation:",
    "Patch Details:",
    "Official Response:",
  ]
toc_links:
  [
    "why-would-you-use-solend-protocol",
    "pre-context-to-explain-the-hack",
    "how-did-the-hacker-attempt-to-steal-funds",
    "technical-explanation",
    "patch-details",
    "official-response",
  ]
---

On 19th August, 2021 around 12:40 UTC, a hacker attempted to exploit [Solend](https://solend.fi/) - a decentralized lending protocol.

Though the hacker was succesfully able to manipulate core protocol parameters in an attempt to steal funds, the manipulation was quickly detected and stopped by Solend's team.

**Thankfully no user funds were lost.**

It would still be valuable to see how the hacker went about executing the failed heist!

![](https://i.imgur.com/BNpvDU7.png)

## Why would you use Solend protocol?

Solend Protocol is a decentralised, non-custodial protocol that uses a collection of smart contracts that provides lending and borrowing functions.

Users can:

- lend assets to earn interest.
- borrow assets against the collateral they have posted.

## Pre-Context to explain the hack:

Before explaining the hack, we would need to give you context about the internals of borrowing assets on Solend since the hacker manipulated the borrow side parameters in an attempt to steal assets.

Let's do this in a Q/A format:

1. How do I borrow assets on Solend?

   - When a user wants to borrow from Solend, they first need to provide collateral.
   - This collateral acts as a safety net to ensure that the loan is repaid.
   - When a user borrows, they must pay interest on the loan.
     - This interest is expressed in Borrow APY.
   - If the value of the collateral drops below a certain threshold, Solend considers the loan to be at risk of not being repaid.
     - To protect lenders, the Solend initiates a process called Liquidation.

2. What is Borrow APY?

   - Borrow APY (Annual Percentage Yield) represents the annualized interest rate that borrowers need to pay on their loans.
   - The Borrow APY depends on market conditions and the specific crypto assets involved in the loan.
   - It is usually expressed as a percentage of loan amount.
   - Eg:
     - Suppose the Borrow APY for SOL is currently set at 8%.
     - This means that for every 100 SOL you borrow, you will need to pay an annual interest of 8 SOL.

3. What is Liquidation?

   - Liquidation involves selling a borrower's collateral to repay the outstanding loan.
   - It is triggered when the value of the borrower's collateral falls below a certain threshold (called Liquidator Threshold), indicating that the loan is at risk of not being repaid.

4. What is Liquidation Threshold?

   - The liquidation threshold is a critical ratio that determines when a loan is at risk of not being repaid.
   - Formula = (Loan Value/Collateral Value) \* 100
   - Solend sets Liquidation Threshold for each asset it supports. Eg: for $SOL ![](https://i.imgur.com/bp2THBF.png)
   - As long as your borrowing position's loan to collateral ratio (called LTV) is less than liquidation threshold, your loan will not be liquidated.
   - But in case your position's loan to collateral ratio becomes greater than liquidation threshold, Solend will start the liquidation process.

5. Who is reponsible for carrying the process of Liquidation?

   - Solend takes help of third party Liquidators.
   - They are incentivized to participate in the liquidation process because they can earn profits through it.
   - These are people who run liquidation bots to assess the health of loan positions.
   - As soon as the loan's loan to collateral ratio goes above liquidation threshold, third party Liquidators can repay 20% of your loan.
   - The Liquidators will also collect an additional 5% of the amount they liquidated as a bounty.
     - This is know as Liquidation Bonus.

6. Can you give me an example to understand all concepts?

   - Suppose you have 5 SOL and you want to borrow 80 USDC against it.
     - Assumptions we are going to take:
       - Current price of 1 SOL = $20
       - Liquidation threshold for SOL: 85%.
       - Borrow APY for USDC: 8%
       - Liquidation Bonus for SOL: 5%
   - So your loan position becomes:
     - Collateral: 5 SOL\*$20 = $100 of value.
     - Loan: $80 USDC
     - Current Loan to Collateral Ratio (LTV)
       - => (loan value)/(collateral value)\*100
       - => ($80 USDC)/($100 worth of SOL)\*100
       - = 80%
     - Since this loan's position LTV of 80% is less than Solend's threshold of 85%, the loan is considered safe.
   - Now suppose bear market comes and SOL price goes from $20 to $10

     - Updated collateral value
       - => 5 SOL\*10 = $50
     - Updated Loan to Collateral Ratio (LTV):
       - => ($80 USDC/($50 worth of SOL)/\*100
       - = 160%
     - Now your loan's position LTV of 160% is greater than Solend's threshold of 80%, your loan is now subject to liquidation.

   - Third party liquidators step in:

     - They deposit 20% of USDC loan
       - => $80\*0.2 = $16 USDC
     - Collect $16 worth of SOL from user's collateral
       - => SOL is currently at $10
       - = $16/$10 = 1.6 SOL
     - Collects 5% of loan amount as Liquidation Bonus from user's collateral
       - => 5% of 80 USDC = $4 worth of SOL will be collected
       - => SOL is currently at $10
       - => Collects $4/$10 = 0.4 SOL
     - Profit of Liquidator:
       - They supplied: $16 USDC
       - They got:
         - 1.6 SOL from repaying 20% of user's loan
         - 0.4 SOL as liquidation bonus
         - Total = 2 SOL
         - SOL current price = $10
         - Total becomes => 2\*10 = $20
       - Profit = $20 - $16 = $4

   - Your loan position becomes:
     - Updated Collateral Amount
       - => 5 SOL - 2 SOL (paid to Liquidator) = 3 SOL
     - Updated Loan Amount
       - => 80 USDC - 16 USDC (given by Liquidator) = 64 USDC
     - Updated Loan to Collateral Ratio:
       - => (3 SOL worth $30)/($64 USDC)\*100
       - = 46%
     - Now your loan position is considered safe.

Now that you understand how borrowing works on Solend let's deep dive into hacker's manipulation.

## How did the hacker attempt to steal funds?

The hacker was able to subvert protocol's admin check to change three core parameters for USDC, SOL, ETH, BTC assets:

1. `liquidationThreshold`:

   - What this parameter does:
     - Solend's Liquidation Threshold for that particular asset.
   - Manipulation:
     - Old Value set by Solend: 80
     - Value set by hacker: 1
   - It's impact:
     - Liquidated Threshold being 1 means that all user's accounts that had loans had become eligible for liquidation.
     - Even though user's position had sufficient collateral to borrow against them.

2. `liquidationBonus`:

   - What this parameter does:
     - Solend Liquidation Bonus for that particular asset paid to Liquidators.
   - Manipulation:
     - Old Value set by Solend: 5
     - Value set by hacker: 90
   - It's impact:
     - This change leads to Liquidator getting a massive 90% of loan's amount as reward!

3. `minBorrowRate`
   - What this parameter does:
     - Sets the min borrow APY for a particular asset.
   - Manipulation:
     - Old Value set by Solend: 0
     - Value set by hacker: 250
   - It's impact:
     - Extremely high Borrow APY means that borrowers' outstanding loan balances would increase rapidly.
     - Making it more difficult for them to maintain the required collateral-to-loan ratio.
     - Hence would accelerate liquidation.

From the above info, it's clear that the hacker intended to steal funds by wrongfully liquidating accounts with an outsized bonus.

Solend's team estimated that $2M was at risk.

## Technical Explanation:

Wallet info:

- Hacker's wallet: [5ELHytHM4cvKUPCWX8HPwkwtw3J866Wtexdpo8PPxp2u](https://solscan.io/account/5ELHytHM4cvKUPCWX8HPwkwtw3J866Wtexdpo8PPxp2u)
- Hacker got funding from this wallet which seems to be Binance's (centralized exchange) address: [2ojv9BAiHUrvsm9gxDe7fJSzbNZSJcxZvf8dqmWGHG8S](https://solscan.io/account/2ojv9BAiHUrvsm9gxDe7fJSzbNZSJcxZvf8dqmWGHG8S)

What the hacker did:

- First created a new Lending Market ([tx](https://solscan.io/tx/cREgLF54zHB7pebGzGQi9TzBN7xuTKKf9Sqz5kbommmEMGpCFgAkM94tuJFEhbxGCfLrUZHbXhmp4Nrpr85msyM))
- Then manipulated core parameters as described above by calling `UpdateReserveConfig` instruction for USDC, SOL, ETH, BTC.

  - This instruction can only be called by program's admin (Solend) so the hacker must have figured out a way to bypass the checks related to whether you are the program's admin or not.
  - Eg: for SOL ([tx](https://solscan.io/tx/USfM4hoy4f8rNvq9KYYpDkG5x8gA56fgVs2wV7ybNN5RiXWPQC55iDEQHcWESuWLvCBEenfQGnabTsfpAJ1CeSC))
    ![](https://i.imgur.com/O2Zv00d.png)

  - As you can see:
    - Liquidation Threshold has been reduced to 1
    - Liquidation Bonus has been pushed to 90
    - Min Borrow Rate has been pushed to 250

How was the hacker able to bypass the admin checks that are run when `UpdateReserveConfig` instruction is executed? Let's deep dive into code:

- function [`process_update_reserve_config`](https://github.com/solendprotocol/solana-program-library/blob/6ab9d7b2f8b16a1fb907cd324202e88f2c46c66c/token-lending/program/src/processor.rs#L1975-L1983) was run when UpdateReserveConfig instruction is called.
  - ![](https://i.imgur.com/a8k8XzI.png)
- The highlighted checks were insufficient, as the hacker was able to pass in the account of an arbitrary Lending Market created and owned by them.
- This resulted in the hacker able to bypassing the admin check's on this function and successfully update reserve configs.

According to Solend, no liquidations occurred except by Solend's own liquidator bot.

- It appears the attacker's attempts to liquidate didn't work.
- Note that by default on Solana, txs are simulated locally and never sent to a validator if the simulation run fails. Because of this, we have no way of knowing if there were failed liquidation attempts.

## Patch Details:

Solend team quickly added a [patch](https://github.com/solendprotocol/solana-program-library/commit/132d74cf171dac66f896c4009ad6836f8c0b3799?diff=split) to `process_update_reserve_config`.

- The function will now throw which fails if the user has supplied an arbitrary lending market.
- ![](https://i.imgur.com/rjekBux.png)

## Official Response:

Statement by Solend team is [here.](https://docs.google.com/document/d/1-WoQwT1QrPEX-r4N-fDamRQ50LM8DsdsOyq1iTabS3Q/edit#)
