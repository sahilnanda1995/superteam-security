---
title: "Nirvana Protocol - treasury hacked for $3.2M, user's lose $10M "
description: "  "
pubDate: "Jan 26 2023"
year: 2022
active: true
toc:
  [
    "Why would you use Nirvana protocol?",
    "How did the hacker steal funds?",
    "Technical Details:",
  ]
toc_links:
  [
    "why-would-you-use-nirvana-protocol",
    "how-did-the-hacker-steal-funds",
    "technical-details",
  ]
---

Nirvana vision is to build an investment protocol for a sustainable store of wealth.

It primarily built 2 tokens:

1. $ANA - partially collateralized volatile token
2. $NIRV - a stablecoin pegged to 1 $USD

The hacker was able to drain Nirvana's treasury for $3.5 million.

Draining this treasury - which acts as collateral to back the value of $ANA and $NIRV - led to their market capitalizing tanking and user's holding either of these tokens combined lost greater than $10M 😭

Let's deep dive on how the hacker was able to exploit the treasury.

![](https://i.imgur.com/699U75u.png)

<br>

## Why would you use Nirvana protocol?

We mention above that Nirvana builds two tokens $ANA and $NIRV.

- [$ANA token](https://docs.nirvana.finance/tokens/ana):

  - Aimed to become a store of wealth for users.
  - It utilizes a form of protocol owned liquidity where the protocol would guarantee a minimum floor price of the token.
  - ![](https://i.imgur.com/kTMlBZc.png)

- [$NIRV token](https://docs.nirvana.finance/tokens/nirv):
  - A stablecoin that get's stabilized using $ANA.
    - Similar to how the Terra project stabilized the stablecoin $UST using the volatile token $LUNA.
  - It get's minted by taking a collateralized loan in $ANA.
    - Similar to how $DAI get's minted by providing collateral in $ETH

<br>

## How did the hacker steal funds?

Before explaining the hack, we need some pre-requisite knowledge about how $ANA get's created.

- Nirvana has built out a virtual AMM and it utilizes it to control the supply of $ANA.
  - ![](https://i.imgur.com/FsiPn6G.png)
- New $ANA get's minted when user's purchase it from the protocol by sending stablecoins directly to Nirvana's treasury.
  - These stablecoins then remain in the treasury to support the floor price of $ANA.
- $ANA get's burned out of circulation when you sell it back to Nirvana in exchange for stablecoins.
- The documentation is not very specific on the price curve of $ANA though you can read more about how $ANA's price is determined [here](https://docs.nirvana.finance/mechanics/reserve-backed-rising-floor).

<br>

Now that we know how $ANA get's minted, let's see how the hacker drained the protocol's treasury.

- The exploit in Nirvana resulted from an inaccurate pricing for the ANA token.
- The hacker was able to artificially inflate the price of $ANA from $8 to $24
  - The hacker takes a $10M flashloan
  - Buys 1.17M $ANA using that $10M
  - Since the act of purchasing $ANA from Nirvana’s native AMM pushes the price upward, the hacker exploited the price curve logic to inflate the price of $ANA abnormally.
  - Then he sold the overpriced $ANA back to the Nirvana netting the exploiter ~$3.5M in profit, on top of the flash loaned amount.

<br>

The flow of attack would have looked like this:

1. Before attacker's tx got executed:
   - Nirvana treasury had: ~$3.5 million worth of stables.
   - price of $ANA: $8
2. Hacker then takes a flashloan from Solend and buys ANA:
   - Now Nirvana treasury had: $3.5M + $10M worth of stables.
   - price of $ANA: $24
3. Hacker sells overpriced $ANA back to the protocol
   - Nirvana sends all it's treasury ($3.5 million + $10M from flashloan) back to hacker.
4. Hacker then closes flashloan by sending $10M back to Solend.

<br>

But the hack was not just limited to $3.5 worth of lost assets.

From [Nirvana's official post mortem](https://medium.com/nirvanafinance/technical-post-mortem-d738935aeec):

> What makes this theft unusual is the asymmetry between what the hacker gained, and what Nirvana investors lost.
>
> Unlike a typical theft, where the amount stolen is equal to the amount lost by the victims, the damage to investors is many times greater than what was stolen.
>
> Though the hacker walked away with 3.5M USDT, the entire market capitalization of NIRV & ANA would algorithmically cease to function without this reserve capital, causing well over $10M of lost assets.
>
> The reason for this asymmetry is that much of NIRV & ANA was leveraged, and requires the grounding collateral beneath these positions.

**It is like the lower floor of a tower was removed, causing the entire structure to fall**

<br>

## Technical details:

Hacker address: [76w4SBe2of2wWUsx2FjkkwD29rRznfvEkBa1upSbTAWH](https://solscan.io/account/76w4SBe2of2wWUsx2FjkkwD29rRznfvEkBa1upSbTAWH)

- Hacker first [creates a new account](https://solscan.io/account/62o4UiW394cbFXtVHbCyuA7DDeRL26bnpfDDPXpm7PRR) to upload their program:

  - ![](https://i.imgur.com/t3RQgyw.png)

- Then executes the [attack tx](https://solana.fm/tx/LyUnvdY9KBQiVRFqmSzGUfCuPGqYX1xNHCWLWxWZ4MvgLcNis2Kui6T25Ayai5UzpTAFkSRSgriKb3pM8tAoeR5?cluster=mainnet-qn1) via the above account.
  - Takes flash loan of 10,250,000 USDC from Solend
    - ![](https://i.imgur.com/kpHTjHl.png)
  - Manipulated price from $8 to $24 by executing Buy3 instruction to buy 1.17M from the above USDC
    - ![](https://i.imgur.com/qwy0qfd.png)
  - Calls two Swap instructions:
    - Swap 153,524.98 ANA for ~3.49M USDT
      - ![](https://i.imgur.com/rQ4izrK.png)
      - ![](https://i.imgur.com/adbYOlF.png)
    - Swap 624,284.63 ANA for ~10.29M USDC
      - ![](https://i.imgur.com/9kVGGeT.png)
