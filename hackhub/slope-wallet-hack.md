---
title: "Slope Wallet - Hacker Drains 9,231 Wallets for $4.1M"
pubDate: "Jan 26 2023"
year: 2022
active: true
toc:
  [
    "Why would you use Solend Wallet?",
    "How did the investigation lead to Slope?",
    "How did the hacker steal funds?",
    "Technical Explanation:",
    "Patch Details:",
    "Official Statement:",
  ]
toc_links:
  [
    "why-would-you-use-solend-wallet",
    "how-did-the-investigation-lead-to-slope",
    "how-did-the-hacker-steal-funds",
    "technical-explanation",
    "official-statement",
  ]
---

On 2nd August 2022 around 11 PM UTC, Solana users started noticing that funds were disappearing from their wallets and took to Twitter to alert the community about the same:

![](https://i.imgur.com/TThyIyi.jpg)

SOL and USDC were being directly transferred into hacker's addresses!

Speculation began to emerge regarding the potential presence of a critical vulnerability within Solana's core codebase, raising panic about the possible compromise of all Solana user wallets!

But as the stolen funds were tallied, it became clear that the vulnerability was affecting only certain wallets and during an ecosystem wide investigation comprising of developers, analytics companies, and security auditors, it appeared that affected addresses were related to **Slope Wallet**.

Let's figure out what really happened in this deep dive.

![](https://i.imgur.com/0H4Ntwo.jpg)

## Why would you use Slope Wallet?

Slope Wallet is a user-friendly cryptocurrency wallet designed for the Solana ecosystem.

It allowes you to store, manage, and interact with various cryptocurrencies, including Solana (SOL) and SPL tokens.

![](https://i.imgur.com/qim20jq.jpg)

## How did the investigation lead to Slope?

- **2nd August 2022, around 11 PM UTC**:

  - Solana users started noticing their funds disappearing from their wallets and posting about it on Twitter.

  - Solana ecosystem was ripe with panic stemming from these questions:
    - Has the Solana blockchain core code been compromised?
    - Is the entire Solana ecosystem at risk?
    - Did the issue lie with wallet providers like Slope or Phantom
    - Why were only hot wallets affected? Why hard wallets and wallets of centralised exchanges not affected?
  - The drain transactions show that these are being signed by the actual owners of the account, suggesting that somehow hacker has gained access to the private key of these accounts.
    - ![](https://i.imgur.com/fU3PwMX.png)

- **3rd August**:

  - [Official communication from](https://twitter.com/SolanaStatus/status/1554658171934937090?s=20) Solana Foundation informed some initial findings about the hack:

    - That the exploit has affected several wallets, including Slope and Phantom.
    - Wallets that were generated on both mobile and extension were found to be affected.
    - Hardware wallets have not been impacted.
    - Affected users were [asked to submit details](https://solanafoundation.typeform.com/to/Rxm8STIT?typeform-source=admin.typeform.com) related to their wallet so that engineers could narrow down the root cause. Some questions that were asked were:
      - Where was their wallet located?
      - When did the setup their wallet?
      - Where was the seed phrase generated.
    - ![](https://i.imgur.com/sTPkNjh.png)

  - Anatoly - cofounder of Solana - raised a possibility of an ["iOS supply chain attack"](https://twitter.com/aeyakovenko/status/1554891864066600960). From analyzing tx and affected wallets, he posits:
    - That the wallet key's seem to be imported or generated on mobile.
    - That user's wallets where they just had just received some crypto assets but didn't even execute one transaction (which means that they didn't interact with any dApp) were also affected!
      - See [this wallet](https://solscan.io/account/5Fh8K2UztB1h9ubnsEvuDRd2sGudYhcUysqZPZ8eyweh#solTransfers) where the user had only received 1 $SOL over a year ago but their wallet also got drained.
      - ![](https://i.imgur.com/ulFaNZ7.png)
    - Many affected users were reported using iOS, with a small portion using Android.
    - Most of the user's wallet provider was Slope, but there are a few Phantom users as well.
      - He confirms that most of the Phantom users were using Slope so posits that the [root cause](https://twitter.com/aeyakovenko/status/1554891864066600960?s=20) was mostly Slope.

- **4th August:**
  - Slope Finance (the team behind Slope Wallet) issues a [statement](https://slope-finance.medium.com/slopes-official-statement-regarding-the-breach-b964e70af0d6) confirming the breach.
    - ![](https://i.imgur.com/bUE1xHM.png)

Now all eyes were on Slope to explain what the hell had happened?

## How did the hacker steal funds?

On chain transactions reveal that the hacker got access to private keys of 9229 wallets to drain ~$4.1 million worth of cryto assets.

The attack started on 2nd August, 2022 around 11 PM UTC lasted for 7 hours (22:37 UTC to 05:50 UTC).

![](https://i.imgur.com/wnIP3ch.png)

**So how exactly did the hacker gain access to the private keys?**

- Going from the reports from affected users, hacks were concentrated mainly on users using Phantom and Slope mobile wallets.
- The investigation suspected a supply-chain-attack as the most likely attack vector.
  - Supply chain attacks are the kind of attacks that exploit vulnerabilities not in the core application itself, but in the components, services, or partners that the application relies on and trusts.
  - By targeting these trusted elements, attackers can gain unauthorized access to the main application or system, making it difficult for the target organization to detect and defend against the attack.
- A cross-dependency check between the Phantom and Slope mobile applications was initiated.
- Both applications used application monitoring services provided by Sentry.
  - The investigation team decided to deep dive into Sentry as a possible root cause attack vector.

**What is Sentry?**

- Sentry is an error monitoring sofware.
- It helps developers identify, track, and resolve issues or bugs in their applications by providing detailed information about errors, user actions, and other relevant data.
- Suppose you're a developer building a mobile cryptocurrency wallet app that allows users to store, manage, and transfer various cryptocurrencies.
  - As a developer, you want to ensure that the app runs smoothly and securely, providing users with a reliable and user-friendly experience.
- By integrating Sentry into your mobile app, you can automatically capture and track errors as they occur.
  - Sentry will provide real-time notifications and detailed information about each error, such as stack traces, user actions, and device information.
  - This data enables you to identify the root cause of the problem, whether it's a compatibility issue with a specific device, a bug in the transaction processing code, or an issue with third-party services, like errors from price data API's.
- The whole system comprises of:
  - Data being sent from your app that has Sentry library embedded,
  - to a Sentry backend hosted on a server.
    - This hosting can provided by sentry.io,
    - or self-hosted on one’s own servers using.

**Why does Slope use Sentry?**

- Slope uses Sentry to monitor errors arising in their mobile wallet apps (both iOS and Android).
- Slope self-hosted the Sentry backend server as the hosting provided by Sentry was very costly at their scale.

**How does Sentry factor in this hack?**

- Wallet applications like Slope require the use of wallets’ private keys to unlock the wallets and sign transactions.
- In order to be able to do that, private keys are temporarily loaded into memory and then actively removed from memory.
- **Somehow the embedded Sentry libary in Sollet mobile apps sent these private keys to Slope's Sentry backend server.**
- The hacker managed to obtain these keys by either intercepting the messages while they were being transmitted or by gaining access to the Sentry server.
  - Exactly how is still being investigated.

**If the root cause was Slope, then why were wallets generated from Phantom affected?**

- The initial confusion that threw of investigators from concentrating all resources on Slope was that both Slope and Phantom wallets got drained and thefore the bug might lie at the core protocol layer.
- It was later discovered that some user's - who had generated wallets on Slope - had used the same secret phrase to generate their wallet on Phantom! 🤦🏻
  - This is akin to utilizing identical passwords for various applications which equates to granting entry to all those applications should I acquire your password.
- In similar fashion, some users reported that their wallets on Ethereum also got drained!
  - Possibly due to using compromised secret phrase to generate their wallet on Ethereum.

Running a quick summary:

1. Hacker drained ~9k wallets for $4.1M.
2. These wallets seem to have been related to Slope.
3. Slope used a self-hosted version of Sentry - a error monitoring software - to troubleshoot errors in their mobile apps.
4. Sentry libary embedded inside Slope's mobile wallets accidentally sent wallet's private key data to Slope's Sentry backend server.
5. The hacker managed to obtain these keys by either intercepting the messages while they were being transmitted or by gaining access to the Sentry server.
6. The hacker simply signs send transactions from user's wallet to their wallet.

More analysis on how much was lost in which assets can be found [here](https://twitter.com/Tristan0x/status/1554831086806372352?s=20).

## Technical Explanation:

### The Leak:

Ottersec - a web3 audit company - [reported](https://twitter.com/osec_io/status/1555087560887922688?s=20) that they had confirmed that Slope’s mobile app sends off mnemonics via TLS to their centralized Sentry server.

A mnemonic phrase, mnemonic seed, or seed phrase are defined as a secret group of words that represent a wallet. When used in the sequence, they allow access to the cryptocurrencies stored within.

![](https://i.imgur.com/vBa81jC.png)

These mnemonics were stored in plaintext, meaning anybody with access to Sentry could access user private keys!

### The Leak Source:

Further investigation by Ottersec revealed that the Slope Wallet code did attempt to filter out sensitive information in logs, but some sensitive information was still able to leak.

Specifically:

- The `message` field was filtered (generated in console events), sensitive information
- But the information included in `navigation` events were not be filtered.
  - And private keys were accessible in `data["wallet"]` key value pair.

```json
{
"category": "navigation",
"data": {
    "state": "didReplace",
    "to": "[Filtered]",
    "to_arguments": {
    "pageData": "Instance of 'ivb'",
    "type": "[Filtered]",
    "wallet": "WalletEntity{privateKey: 5Vd..."
    }
},
"level": "info",
"timestamp": 1658990294.618,
"type": "navigation"
},
{
"category": "console",
"level": "debug",
"message": "[WalletEntity{privateKey: [****], address: ByZ..."d
"timestamp": 1658990299.523,
"type": "debug"
},
```

Further, [statement by Sentry](https://blog.sentry.io/2022/08/10/slope-wallet-solana-hack/) reveales that:

- As they work with a lot of organizations and applications, it knows that it might end up with sensitive information accidentaly sent to it's server.
- Therefore it sets some sane defaults, client side scrubbing and server side scrubbing to prevent sending/storing sensitive data.
- Sentry's defaults didn't prevent instances of messages that contained “privatekey” or “private_key” from being stored.

## Official Statement:

1. [Statement by Slope Finance](https://slope-finance.medium.com/slope-wallet-sentry-vulnerability-digital-forensics-and-incident-response-report-d7a5904e5a39)
2. [Statement by Solana Foundation.](https://solana.com/news/8-2-2022-application-wallet-incident).
3. [Statement by Sentry.](https://blog.sentry.io/2022/08/10/slope-wallet-solana-hack/)
