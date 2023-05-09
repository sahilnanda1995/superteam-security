---
title: "Solend Protocol - Hacker Pumps $USDH Price To Steal $1.26M"
pubDate: "Jan 26 2023"
year: 2022
active: true
toc:
  [
    "Why would you use Solend protocol?",
    "How did the hacker steal funds?",
    "Technical Concepts:",
    "Technical Explanation:",
  ]
toc_links:
  [
    "why-would-you-use-solend-protocol",
    "how-did-the-hacker-steal-funds",
    "technical-concepts",
    "technical-explanation",
  ]
---

[Solend protocol](https://solend.fi/) - a decentralized lending protocol - was affected by price manipulation of [$USDH](https://docs.hubbleprotocol.io/faq/usdh-stablecoin) (a stablecoin built by Hubble Protocol) and as a result lost $1.26M of user deposits.

Let's figure out how the hacker executed the hiest!

![](https://i.imgur.com/BNpvDU7.png)

## Why would you use Solend protocol?

Solend Protocol is a decentralised, non-custodial protocol that uses a collection of smart contracts that provides lending and borrowing functions.

Users can:

- lend assets to earn interest.
- borrow assets against the collateral they have posted.

## How did the hacker steal funds?

A high level overview of the strategy hacker executed:

1. Inflated the price of a crypto asset.
2. Deposited that asset as collateral to Solend.
3. Borrowed assets against the inflated price of collateral.
4. Withdrew those assets to their wallet.
5. Defaulted on the loan.

Let us walk you through an example how this strategy resulted in a profitable trade.

- Assumptions:
  - You have 10 SOL tokens that you want to use as collateral to borrow USDC.
  - You aim to manipulate the market to inflate the price of SOL and then borrow USDC against the inflated value of your SOL holdings using the Solend protocol.
- The above strategy executed:
  - You hold 10 SOL tokens, initially worth $20 each, for a total value of $200.
  - You buy more SOL tokens in the open market, creating artificial demand and driving the price up.
    - You manage to inflate the price of SOL to $50 each.
    - Your 10 SOL tokens are now worth $500 due to the price manipulation.
  - You deposit your 10 SOL tokens (now worth $500) into the Solend protocol as collateral.
  - The Solend protocol allows you to borrow up to a certain percentage of your collateral value.
    - Let's say the protocol has a 50% loan-to-value (LTV) ratio.
    - With your $500 worth of SOL, you are allowed to borrow up to $250 in USDC.
  - You take out a loan of $250 in USDC against your inflated SOL collateral.
    - After a short while, you intentionally default on the loan, meaning you fail to repay the borrowed USDC.
- Summarizing:
  - You started with $200 worth of crypto asset (10 $SOL tokens)
  - You ended with $250 worth of crypto asset (250 $USDC token )
  - Your profit/heist money = $50

Hopefully by now you would have gotten the gist of the hack.

To understand how the hacker manipulated the price of $USDH at a technical depth, we first need to run you through some essential technical concepts that will be leveraged inside the technical explanation.

## Technical Concepts:

To understand how $USDH stablecoin is lent on Solend, we need to understand the interplay between the following protocols:

1. Solend - lending protocol where the user deposits got stolen from:

   - Solend uses the concept of [isolated lending pools](https://blog.solend.fi/what-are-isolated-pools-4a443ac670bb#:~:text=Isolated%20pools%20are%20separate%20lending,be%20borrowed%20against%20any%20other.) where assets like $USDH can be lent and borrowed in isolation.
   - Each lending pool is focused on group of cryto assets and operates independently, minimizing the risk of contagion in case of a price manipulation or other types of issues affecting one particular asset.
   - In this scenario, $USDH was listed in the following isolated pools :
     - [Kamino USDH Pool](https://solend.fi/dashboard?pool=Epa6Sy5rhxCxEdmYu6iKKoFjJamJUJw8myjxuhfX2YJi),
     - [Stable Pool](https://solend.fi/dashboard?pool=GktVYgkstojYd8nVXGXKJHi7SstvgZ6pkQqQhUPD7y7Q)
     - and [Coin98 Pool](https://solend.fi/dashboard?pool=7tiNvRHSjYDfc6usrWnSNPyuN68xQfKs1ZG2oqtR5F46)

2. [Saber](https://app.saber.so/swap) - a decentralized exchange (DEX) on Solana.

   - In this scenario, the hacker manipulated the price of $USDH on Saber.

3. [Orca](https://www.orca.so/) - another DEX on Solana.

   - In this scenario, the hacker traded $USDH between Saber and Orca to manipulate price.
   - We will be explaining how the hacker manipulated $USDH price in detail under the "Technical Explanation" section.

4. [Switchboard](https://switchboard.xyz/) - community curated oracle feeds on Solana.
   - Oracles are essential components in DeFi protocols, as they provide reliable, real-time price data from off-chain sources to on-chain smart contracts.
   - In this scenario:
     - Solend used Switchboard as an oracle to create a price feed to track realtime price of $USDH.
     - Solend's price feed only tracked Saber's $USDH price.

The relationship between the above four components in the hack is as follows:

- Solend relies on Switchboard as an oracle to provide accurate price data for the assets on its platform, including USDH.
- USDH price was manipulated on Saber (by trading $USDH with Orca )
- Solend's price feed was vulnerable because it only looked at the Saber pool for USDH price data, making it susceptible to the price manipulation exploit.

The hacker likely spotted Solend's price feed vulnerability and saw an opportunity to exploit the system.

They then focused on figuring out two things:

- how to artificially inflate the USDH price on Saber
- and how to use Switchboard to relay the fraudulent price to Solend.

Once they successfully inflated the USDH price on Solend, the hacker deposited the overvalued $USDH as collateral and borrowed a staggering $1.26M against this artificially inflated collateral value, successfully profiting from the heist.

Now that you have understood all the lego blocks that connect together to execute the heist mission, let's understand the hack at a more technical depth.

## Technical Explanation:

Let's deep dive into $USDH price got manipulated:

1. The hacker manipulated the price of USDH by trading between Saber's USDH/USDC pool and Orca's USDH/USDC pool.
2. In both the liquidity pools, the price of USDH is determined by the ratio of USDH to USDC in the pool.
3. The hacker first purchased large amounts of $USDH using $USDC on Saber.
   - This huge purchase of USDH led to a decrease in the amount of USDH available in the pool.
   - This imbalance between the supply of USDH and USDC in the pool led to USDH's price rising.
4. The hacker proceeded to trade the purchased USDH for USDC on the Orca $USDH/$USDC pool.
5. The hacker then repeated this process, continuously buying USDH on Saber, which maintained the inflated price, and selling it on Orca to regain USDC.
   - This loop allowed the attacker to manipulate the USDH price in the Saber pool while keeping the costs relatively low.

Let's look at sample [tx](https://solscan.io/tx/FQySuLRrkihuvyiyAUn5F2BRmTS4UPSR2PLCC9qH3na7V8TpybqhzWs3y5kSxhxLP1oP9jGLcXGSHBUctDRSR7X):

- ![](https://i.imgur.com/uWJVfRe.png)
- Notes from the above tx:
  - As you can see the hacker started from $113k USDC to buy USDH on Saber.
  - They then sell that USDH for USDC on Orca.
  - Use that USDC to again buy USDH on Saber.
  - Repeat this loop a lot of times to decrease the supply of USDH in the USDH/USDC pool on Saber.
  - This inflates USDH price and in this transaction $USDH price has gone:
    - from ~$0.99 (113,604.46/113,652.55)
    - to ~$8.8 (113,604.46/12897.01)

---

We have reached the stage where we can now walkthrough the hack step by step.
The hacker attempted this exploit multiple times over a week. Timestamps are in UTC.

### What happened just before the hack?

- October 28 2022 2:30 AM:

  - The hacker spent 203k USDC ([tx](https://solscan.io/tx/3EBSM7nD5YFf28swj7Tm5bCERymzN8twfoirkEZX2sN2FCuDMzyQ2zYLDX3DiZ6ScUak3XCFwHaAEUvqDHZZQ7MM)) to pump the USDH price on Saber.

    - ![](https://i.imgur.com/vd86g6c.png)

  - The price manipulation failed because the price got arbitraged back in the same slot ([arb tx 1](https://solscan.io/tx/5HLQwnpm2jLP4FJwin7Ae59ayXgJ9U41H5JushgkY1kQEe5q9Hnk5ksNPt6f7YpayhWp4xTqya2WKjYaUghbnhTV), [arb tx 2](https://solscan.io/tx/3EBSM7nD5YFf28swj7Tm5bCERymzN8twfoirkEZX2sN2FCuDMzyQ2zYLDX3DiZ6ScUak3XCFwHaAEUvqDHZZQ7MM)).

    - Arbitrage is a trading strategy that involves buying and selling an asset simultaneously in different markets to profit from price discrepancies.
    - These arbitrage traders are constantly looking for these kind of price discrepencies
    - As soon as they noticed the imbalance with USDH and USDC on Saber:
      - they bought USDH on Orca
      - supplied USDH on the imbalanced USDH/USDC pool on Saber to get USDC.
      - this increased supply of USDH with relative to USDC caused the USDH price on Saber to drop back to its original price, preventing the hacker from achieving their goal.
      - ![](https://i.imgur.com/DtCbxVe.png)
      - In the above screenshot, the arb trader executes the arb strategy generate a profit of ~$199k ($278k - $79k)

  - Because of these arbs, the USDH price reversed back to $1 and the oracle service Switchboard didn't need to report anything different.

  - In this scenario, the hacker lost their 203k USDC to arb traders. Oops.
    - ![](https://i.imgur.com/c6b3LXu.png)

- Oct 29 2022:

  - Solend’s team identified that the USDH price feed is vulnerable to price manipulation, as it was only looking at the Saber pool.
  - However, the team wasn't satisfied with existing alternative feeds, so they started working with Hubble Protocol team (the creators of USDH) to create a better one.

### What happened on the hack day?

Nov 2, 2022

- At 12:15 AM:

  - Hacker spent $113k USDC to pump USDH price from $0.99 to $8.8 (tx).

    - There were 2 differences in this attempt compared to the last one:

      - Difference 1:

        - After the hacker pumped the USDH price, they started spamming the network with a large volume of transactions to the Saber account, essentially write-locking the account.
        - This prevented any user from writing to the account, including arbitrage traders tx to land in the same slot.

      - Difference 2:
        - The attacker arbitraged themselves in the next slot (tx)
        - Because of these changes, the attacker only lost 600 USDC on this attempt.

  - This time, the Switchboard oracle picked up the high price (Oracle1, oracle2, oracle3, oracle4)
  - The attacker didn’t borrow assets against their USDH collateral. It is unclear why.

- At 2:16 AM:

  - The attacker pumped USDH price again to roughly $15 (tx).
  - Similar to the attempt at 12:15am, they arbed themselves in next slot (tx) and the oracle picked up the price (oracle1, oracle2, oracle3, oracle4)
  - Price manipulation was succesful:
    - This time the attacker drained the isolated pools for about $400k .
    - Since the USDH price was inflated, the attacker deposited USDH and borrowed as many assets as they could.

- At 2:53 AM:

  - Attacker pumped USDH price again using the exact same methodology at 2:16am.
  - The attacker drained the isolated pools for approximately $800k (see 1 of many borrow txns)

- At 3:37 AM:

  - The Solend team discovered the bad debt from these exploits.

- 3:53 AM:

  - Borrows are disabled for the affected pools to prevent further exploits.

- 4:03 AM:
  - Open LTVs are set to 0 for USDH in the affected pools.
    - LTV stands for "Loan-to-Value" and refers to the ratio of the loan amount to the value of the collateral deposited by the borrower. For example, if a borrower deposited $100 worth of collateral and borrowed $50, the LTV would be 50/
    - Setting the Open LTVs to 0 effectively means that the Loan-to-Value ratios for USDH in the affected pools were set to 0%, or in other words, the value of the assets that could be borrowed against the USDH collateral became zero.
    - As a result, users were no longer able to borrow assets against their USDH collateral in these affected pools.
