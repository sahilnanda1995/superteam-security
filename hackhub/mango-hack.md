---
title: "Mango Market Protocol - Hacker Manipulates Markets to Steal $115M"
pubDate: "Jan 26 2023"
year: 2022
active: true
toc:
  [
    "Why would you use Mango protocol?",
    "How did the hacker steal funds?",
    "Technical Details:",
    "Aftermath of the hack",
    "Official Statement",
  ]
toc_links:
  [
    "why-would-you-use-mango-protocol",
    "how-did-the-hacker-steal-funds",
    "technical-details",
    "aftermath-of-the-hack",
    "official-statement",
  ]
---

On October 11th 2022, a team comprising of trader named [Avraham Eisenberg](https://twitter.com/avi_eisen?lang=en) manipulated $MNGO token price to drain $115M worth of liquidity from Mango Protocol.

Let’s deep dive into how the heist went underway:

![](https://i.imgur.com/ANXWuxf.jpg)

## Why would you use Mango protocol?

Mango Markets is Solana's flagship margin trading protocol that provides users with a single venue to lend, borrow, swap, and leverage-trade crypto assets.

Margin trading allows traders to use borrowed funds to amplify their returns, but it also comes with increased risk.

Though there are many other exchanges on Solana for spot trading, **Mango Markets became the key venue where you can take leverage to trade crypto assets.**

Say you are bullish on $SOL, but you only have $1k USDC to invest.

Here's how you could magnify the returns on your investment:

- Deposit $1k USDC into your Mango Markets account.
- Open a leveraged position in SOL, for example, a position worth $10k in SOL using 10x leverage.
- This means you would be borrowing $9k in addition to your $1k deposit to open the $10k position.
- If the price of $SOL goes up by 10%:
  - your position of $10k becomes $11k profiting you $1k.
  - contrast this with a profit of $100 if you would have bought $1k worth of $SOL on the spot market.
- But if the price of $SOL goes down by 10%:
  - your position will go down from $10k to $9k netting you a loss of $1k!

Leverage trading can potentially give you greater returns, but also comes with greater risk.

![](https://i.imgur.com/xyql3kA.png)

## How did the hacker steal funds?

This hack was not a technical hack but a case of market manipulation.

High level of how the hack went underway:

1. The hacker opened two accounts on Mango Protocol and deposited $5M of USDC in each.

   - From Account A, the hacker took leverage and opened a short position to sell 483 million of Mango Perpetual contracts ($MNGO-PERP) at $0.038.
     - Effectively, this position was worth $18.3 million, so the hacker took ~3.6x leverage on their $5M deposit.
   - From Account B, the hacker bought all the 483 million contracts, effectively making this a long position.

2. Then the hacker went and bought $4 million worth of $MNGO on three separate exchanges to spike $MNGO's price:

   - The spot price of $MGNO went from $0.038 to $0.91 (an increase of ~2294%!)

3. This spike in price made the long position in Account B hugely profitable:

   - The hacker had bought 483 million of $MNGO-PERP contracts at $0.038
   - At the spiked price of $0.91, the position resulted in 483 million\*(0.91 - 0.038) = ~$420M of unrealized profit.

4. Mango allows you to also borrow against unrealized profit and loss:
   - leveraging the unrealized pnl, the hacker went ahead and took out loans in multiple crypto assets totalling $115M!
   - then simply withdrew these assets from Mango to their wallet.

You can listen to a statement by Avraham [here](https://www.youtube.com/watch?v=e-y4WmrndQ4):

![](https://i.imgur.com/N3Nu7mK.jpg)

Now that you have got a gist of how the hack went underway, let's go through the hack step by step.

## Technical Details:

Wallets involved in counter-trading:

1. Wallet A: [CQvKSNnYtPTZfQRQ5jkHq8q2swJyRsdQLcFcj3EmKFfX](https://trade.mango.markets/account?pubkey=CQvKSNnYtPTZfQRQ5jkHq8q2swJyRsdQLcFcj3EmKFfX)
2. Wallet B: [4ND8FVPjUGGjx9VuGFuJefDWpg3THb58c277hbVRnjNa](https://trade.mango.markets/account?pubkey=4ND8FVPjUGGjx9VuGFuJefDWpg3THb58c277hbVRnjNa)

Step by step flow of how the hack went underway:

1. Hacker deposits:

   - $5M USDC in wallet A:
     - ![](https://i.imgur.com/2SRTL4A.png)
   - $5M USDC in wallet B:
     - ![](https://i.imgur.com/gONynfS.png)

2. Wallet A places an offer to sell 483 million Mango perpetual futures (MNGO-PERPs) at a price of $0.038

   - ![](https://i.imgur.com/Vt44qYJ.png)

3. Wallet B buys all 483 million MNGO-PERP:

   - ![](https://i.imgur.com/4z5qsc7.png)

4. Hacker then manipulates price by spot buying on 3 exchanges:

   - Bought $1.44M worth of $MNGO on Mango Markets:

     - ![](https://i.imgur.com/xMySvxe.png)

   - Bought $1 million worth of $MNGO on AscendEX exchange:

     - ![](https://i.imgur.com/Wtlg9hP.png)

   - Bought $1.6 million of $MNGO on FTX:
     - ![](https://i.imgur.com/jZAeELc.png)

5. The huge spot buys above spiked the price of $MNGO to a peak of $0.91

   - ![](https://i.imgur.com/FN5YiOW.png)

6. The position in Wallet B reaches an unrealized profit of ~$420 million. The hacker uses this position to borrow $115M worth of crypto assets from the protocol.
   - ![](https://i.imgur.com/bQOSssH.png)

---

**Upon gaining a complete understanding of the hack, an intriguing question naturally emerges: how did the hacker orchestrate such a substantial manipulation of $MGNO's price?**

This was possible because of MNGO token’s low circulating supply and trading volume.

- Low liquidity means there is a limited number of buy and sell orders on any exchange.
- This results in a thin order book, where small trades can lead to significant price movements.
- Manipulators can take advantage of this by placing large buy or sell orders, which can cause the price to spike or crash, respectively.

A community member reported this issue in March 2022, but sadly Mango market team didn't put in appropriate guardrails to prevent this exploit.

![](https://i.imgur.com/0JIkT6a.png)

## Aftermath of the hack

In a surprising twist of events, the hacker posted a proposal on Mango DAO:

![](https://i.imgur.com/gAOTiJi.png)

Overview of the hacker terms:

- Out of the $115M hack, the hacker wants Mango to use their treasury of $70M.
- The hacker proposes to send the remaining difference i.e ~$45M to Mango if Mango drops all investigation.
  - This would make the user's whole and the protocol could restart from scratch.
- Hacker keeps the rest of the exploited money as a bounty.

The hacker doesn't stop here:

- The heist money also included 32M MNGO tokens.
  - Each MNGO token grants users voting rights to vote on the proposals posted on Mango DAO.
- Using the stolen governance tokens, the hacker voted yes on the proposal! 😅
- To everybody's relief, Mango community members were able to gather majority to vote against the proposal.

---

Then Mango team counter-negotiated with another [proposal](https://dao.mango.markets/dao/MNGO/proposal/GYhczJdNZAhG24dkkymWE9SUZv8xC4g8s9U8VF5Yprne):

![](https://i.imgur.com/H5nxYEX.png)

To put things to an end, the hacker accepted this proposal and returned $67M worth of crypto assets back to Mango. Whew!

![](https://i.imgur.com/mJAUStj.png)

## Official Statement

Mango tweeted out their statement [here](https://twitter.com/mangomarkets/status/1580053208130801664).

They also clarified in a later tweet that exploit did not occur due to an oracle failure, but rather through genuine price manipulation.

## FAQ:

### What is $MNGO-PERP?

A $MNGO-PERP is Mango token's perpetual future contract.

### What are pepetual future contracts?

Recommend reading on [Bitfinex blog](https://blog.bitfinex.com/education/what-are-perpetual-futures-contracts-in-the-crypto-world/#:~:text=Perpetual%20futures%20contracts%20are%20a,but%20with%20some%20key%20differences.)
