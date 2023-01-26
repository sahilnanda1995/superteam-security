---
title: "Wormhole Protocol - hacker spoofs signatures to net $325 million"
description: "  "
pubDate: "Jan 26 2023"
year: 2022
active: true
---



Wormhole - an interoperability protocol that allows transferring assets between different blockchains - got exploited for a whopping $325 million! 

This hack is the 5th biggest heist in the history of Defi industry so far, and hence becomes very important to understand how the hack played out. 


![](https://i.imgur.com/dwv25OQ.png)

<br>



# Why would you use Wormhole? 

Wormhole is a generic message-passing protocol that helps user transfer assets and information across different blockchains. 

Say you want to move your USDC from Ethereum to Solana. As there is no way these blockchains can talk with each other, we need a bridge to facilitate the transfer. 

**Enter Wormhole.**

![](https://i.imgur.com/Gl6bbB6.png)

<br> 

Let's understand at a high level how Wormhole works by taking an example of moving 100 USDC from Ethereum to Solana: 

* First, you will transfer 100 USDC to Wormhole core contract on Ethereum. 
    * This would "lock" your 100 USDC inside Wormhole's Ethereum contract. 

* Then Wormhole's Guardians will attest that this transfer was legit or not: 
    *  Think of Guardians as the protocol's watchguards. 
    *  They observe and verify each deposit for legitimacy and then stamp their approval via signatures.  
    * This signed approval is then handed over to Wormhole's Solana contract

* Wormhole's Solana contracts, then check the legitimacy of signers. 
    * After everything checks out, Wormhole's Solana Contract now mints an equivalent 100 Wormhole-USDC (wrapped tokens) on Solana. 
* At any time, you can transfer these 100 Wormhole-USDC back to the bridge on Solana side to "unlock" 100 USDC on Ethereum. 


Now that you have a basic understanding of how Wormhole works let's understand how the hack went underway. 

<br>

![](https://i.imgur.com/VXWz11l.png)


<br> 

# How did the hacker steal funds?

As you read earlier: 
* Guardians are responsible for generating a signed approval that verifies the authenticity of user deposits in Wormhole contracts on blockchain A.
* this approval is then submitted to Wormhole contracts on blockchain B so it can mint an equivalent value of the user's deposit. 

The clever hacker: 
* **figured out a way to spoof Guardian signatures.**
* used these fake signatures to create a signed approval to mint 120,000 ETH on Solana 😱

Seeing a valid signed approval, Wormhole's Solana contracts minted the 120k Wormhole-ETH on Solana. Now all the hacker had to was to make this "play" money real, which they did by: 
1. bridging 93,750 Wormhole-ETH to Ethereum 
    - On Solana's side: 
        - ![](https://i.imgur.com/93FGRQn.png)
        - [above screenshot source](https://solscan.io/account/2SDN4vEJdCdW3pGyhx2km9gB3LeHzMGLrG2j4uVNZfrx#splTransfer)
    - On Ethereum's side: 
        - tx [1](https://etherscan.io/tx/0x4d5201dd4a377f20e61fb8f42e6f929ec16bcec918f0584e39241d15b254a80f)
        - tx [2](https://etherscan.io/tx/0x24c7d855a0a931561e412d809e2596c3fd861cc7385566fd1cb528f9e93e5f14)
        - tx [3](https://etherscan.io/tx/0xd31b155e259a403ebe69831fae0ec2b4bd33dfa090c43b605a57d5c72c4fbbc7)

3. converting ~26,000 Wormhole-ETH to SOL and USDC on Solana. 
    

<br>

[Attacker's Ethereum wallet:](https://etherscan.io/address/0x629e7da20197a5429d30da36e77d06cdf796b71a)
![](https://i.imgur.com/3qB8RYR.png)

To understand the hack at a technical depth, we first need to run you through some essential technical concepts that will be leveraged inside the technical explanation. 

If you are already familiar with Wormhole's architecture, you can straightway move to technical explanation section. 

<br>

# Technical Concepts: 

This section describes: 

1. Wormhole core protocol - the base message passing protocol layer. 
2. Guardians - watchful guards that check the validity of messages passed to Wormhole core. 
3. VAA or Verifiable Action Approval - signed messages submitted on the receiving chain. 
4. Token Bridge - the token bridge that builds on top of the Wormhole core to provide the functionality of bridging tokens cross-chain. 


<br>

## Wormhole Core: 
At its core layer, Wormhole is a message-passing protocol that transmits messages across chains. 

To do so, it requires the following infrastructure:
1. Wormhole smart contract on each supported chain. Some examples: 
    - [Wormhole Core - smart contract on Ethereum](https://etherscan.io/address/0x98f3c9e6E3fAce36bAAd05FE09d375Ef1464288B)
    - [Wormhole Core - smart contract/program on Solana](https://solana.fm/address/worm2ZoG2kUd4vFXhvjh93UUH596ayRfgQ2MgjNMTth)
2. Network of guardians that provide signed approvals for all Wormhole messages. 

More detailed information about Wormhole can be found [here.](https://docs.wormhole.com/wormhole/)

<br>

## Guardians:


Wormhole relies upon a set of distributed nodes which monitor messages on several blockchains. This distributed network of nodes is called the  Guardian network. 

Guardian's role is to observe each message, verify the message's authenticity and sign off on them. There are currently [19 Guardians](https://wormhole.com/network/) standing guard.  


Each guardian performs the attestation step in isolation, combining the resulting signatures with other guardians as a final step. 

![](https://i.imgur.com/oaJ8cbR.png)


When enough signatures are collected, a multisig is formed. 

The multisig represents proof that the majority of Guardians have observed the same message and agreed to its legitimacy.

This multisig is referred to as Verifiable Action Approval (VAA's for short) in Wormhole.


<br> 

## Verifiable Action Approval (or VAA's)

To recap: 
- Wormhole is a message transfer protocol between different blockchains. 
- To send and receive messages between different blockchains, Wormhole core contracts are deployed on each supported chain. 
- Suppose you want to send a message from blockchain A --> blockchain B. 
- Messages emitted by Wormhole core contract on blockchain A need to be verified by the Guardians before they can be sent to blockchain B. 

Once the majority of Guardians reach consensus that an observation has been made, the message is wrapped up in a structure called a Verifiable Action Approval (or VAA) which combines the message with the guardian signatures to form a proof. 

These VAA's are ultimately what a smart contract on a receiving chain must process to trigger the message instructions on blockchain B.

![](https://i.imgur.com/PdDDpwS.png)


### Concept refresher time: 



[In the high level explanation of the hack](https://hackmd.io/3NU5bOTURrKMSdmjnpceUw#How-did-the-hacker-steal-funds), we mentioned the following: 

> The clever hacker figured out a way to spoof guardian signatures. 
Using these signatures, they submitted an attestation on Wormhole's Solana contract to mint 120,000 ETH on Solana.

Now that you know about VAA's, the hacker was actually able to bypass guardian signatures altogether to generate a valid VAA. 

They then used this VAA to trigger the 120k ETH mint to their account! 

<br>

## Token Bridge 
 

On top of Wormhole's base message transfer layer, token-bridges are built. 


- Token bridges are separate contracts and must exist on each supported chain. Some example: 
    - [Token Bridge Contract on Ethereum](https://etherscan.io/address/0x3ee18b2214aff97000d974cf647e7c347e8fa585#:~:text=Wormhole%3A%20Portal%20Token%20Bridge%20%7C%20Address%200x3ee18b2214aff97000d974cf647e7c347e8fa585%20%7C%20Etherscan)
    - [Token Bridge Contract/Program on Solana](https://solana.fm/address/wormDTUJ6AWPNvk59vGQbDvGJmqbDTdgWgAqcLBCgUb)
- To transfer assets between a native and a target chain:  
  - Wormhole locks the assets on the native chain inside the token-bridge and generates a transfer message.
  - This transfer message then gets attested by Guardians and a VAA is generated. 
  - With the VAA submitted to the receiving chain, a user can cause the token-bridge on the target chain to mint the corresponding wrapped tokens. 
  - The holder of the wrapped assets can, at any time, transfer them back to the bridge and thus obtain the corresponding amount of locked tokens on the native chain.




Hopefully, now you have understood all the critical lego blocks to understand the hack. 



<br>


# Technical Explanation 


Let's start with the exploit transaction and reverse engineer what exactly happened. 


- [Tx where hacker mints 120,000 Wormhole-ETH on Solana](https://solana.fm/tx/2zCz2GgSoSS68eNJENWrYB48dMM1zmH8SZkgYneVDv2G4gRsVfwu5rNXtK5BKFxn7fSqX9BvrBc1rdPAeBEcD6Es?cluster=mainnet-qn1)
    - Here we can see that 120k ETH has been minted: 
    - ![](https://i.imgur.com/6KOuh9v.png)

    - We see that the transaction has been executed by ["Wormhole Token Bridge"](https://solana.fm/address/wormDTUJ6AWPNvk59vGQbDvGJmqbDTdgWgAqcLBCgUb?cluster=mainnet-qn1) program and see an encoded `4` has been passed as instruction data: 
    - ![](https://i.imgur.com/m1BBCRK.png)

---
- Let's head over the [source code for Wormhole Token Bridge Solana contracts](https://github.com/wormhole-foundation/wormhole/tree/8d15138d5754b5e1202ff8581012debef25f7640/solana) to figure out what function is being called from the above instruction data. 
    - ![](https://i.imgur.com/2yuqd6S.png)
    - We zoom into [modules/token_bridge folder](https://github.com/wormhole-foundation/wormhole/tree/8d15138d5754b5e1202ff8581012debef25f7640/solana/modules/token_bridge/program) and find the [program's](https://github.com/wormhole-foundation/wormhole/tree/8d15138d5754b5e1202ff8581012debef25f7640/solana/modules/token_bridge/program) entry point (which is usually inside the [lib.rs](https://github.com/wormhole-foundation/wormhole/blob/8d15138d5754b5e1202ff8581012debef25f7640/solana/modules/token_bridge/program/src/lib.rs) file)
    - ![](https://i.imgur.com/YrqYlKA.png)
    - We see `complete_wrapped` function at index 4, which checks out with the tx to mint 120k Wormhole-ETH.  
    - Voila, now we can look deeper into this function to see where the exploit lay. 

---

- Let's zoom into [`complete_wrapped`](https://github.com/wormhole-foundation/wormhole/blob/8d15138d5754b5e1202ff8581012debef25f7640/solana/modules/token_bridge/program/src/instructions.rs#L152-L211) function: 
    - This function generates an instruction that takes in a `message_acc` account. 
    - ![](https://i.imgur.com/Hk7xlE8.png)

    - This [`message_acc`](https://github.com/wormhole-foundation/wormhole/blob/8d15138d5754b5e1202ff8581012debef25f7640/solana/modules/token_bridge/program/src/instructions.rs#L164) is an account that stores the valid VAA. 
    - ![](https://i.imgur.com/6A7mEqQ.png)

---

- Without the valid VAA, the `complete_wrapped` function should not execute. Then how was the hacker able to supply a valid VAA account to `complete_wrapped` function call? 
    - Let's check the accounts that were supplied by the hacker in the [exploit tx:](https://solana.fm/tx/2zCz2GgSoSS68eNJENWrYB48dMM1zmH8SZkgYneVDv2G4gRsVfwu5rNXtK5BKFxn7fSqX9BvrBc1rdPAeBEcD6Es?cluster=mainnet-qn1)
     -  ![](https://i.imgur.com/wBtDZYm.jpg)
     -  `message_ac` account corresponds to [`GvAarWUV8khMLrTRouzBh3xSr8AeLDXxoKNJ6FgxGyg5`](https://solana.fm/address/GvAarWUV8khMLrTRouzBh3xSr8AeLDXxoKNJ6FgxGyg5?cluster=mainnet-qn1) on-chain.


    -  Inspecting [`GvAarWUV8khMLrTRouzBh3xSr8AeLDXxoKNJ6FgxGyg5`](https://solana.fm/address/GvAarWUV8khMLrTRouzBh3xSr8AeLDXxoKNJ6FgxGyg5?cluster=mainnet-qn1) and we see that it's created in a previous [tx](https://solana.fm/tx/2SohoVoPDSdzgsGCgKQPByKQkLAXHrYmvtE7EEqwKi3qUBTGDDJ7DcfYS7YJC2f8xwKVVa6SFUpH5MZ5xcyn1BCK?cluster=mainnet-qn1).
 
    -  ![](https://i.imgur.com/MBBOp5B.png)

    -  Inspecting the [tx](https://solana.fm/tx/2SohoVoPDSdzgsGCgKQPByKQkLAXHrYmvtE7EEqwKi3qUBTGDDJ7DcfYS7YJC2f8xwKVVa6SFUpH5MZ5xcyn1BCK?cluster=mainnet-qn1) that created the above account, we see that this instruction is executed on the main "Wormhole Program" i.e the Core bridge contract! 

    -  ![](https://i.imgur.com/f4LAa9O.jpg)

---
    
-  Now we need to move our search to [Wormole core bridge contract on Solana](https://github.com/wormhole-foundation/wormhole/tree/91296e67722032debf04e95c71b3d701d4625c5b/solana/bridge/program/src) 
    -  We zoom into [`wormhole/solana/bridge/program/src/instruction.rs`](https://github.com/wormhole-foundation/wormhole/blob/91296e67722032debf04e95c71b3d701d4625c5b/solana/bridge/program/src/instructions.rs) to find that `message_acc` account is being created by the [`post_vaa`](https://github.com/wormhole-foundation/wormhole/blob/9a4af890e3e2d4729fe70e43aaced39ba8b33e35/solana/bridge/program/src/instructions.rs#L162-L201) function. 

   -  ![](https://i.imgur.com/UdRaYnJ.png)
   -  Notice on line 190, `post_vaa` function creates a new account that stores the valid VAA. 
   -  Notice on line 189,  `signature_set` account is being passed. This account is crucial for `post_vaa` function to run as this account contains the Guardian signatures. 
   

---



- How did the `signature_set` account get created? 
    - Re-checking the [tx](https://solana.fm/tx/2SohoVoPDSdzgsGCgKQPByKQkLAXHrYmvtE7EEqwKi3qUBTGDDJ7DcfYS7YJC2f8xwKVVa6SFUpH5MZ5xcyn1BCK?cluster=mainnet-qn1) that called `post_vaa` function, we see that `signature_set` account corresponds to [EtMw1nQ4AQaH53RjYz3pRk12rrqWjcYjPDETphYJzmCX](https://solana.fm/address/EtMw1nQ4AQaH53RjYz3pRk12rrqWjcYjPDETphYJzmCX?cluster=mainnet-qn1)

    - Inspecting on-chain, we see that this account gets created in this [tx](https://solana.fm/tx/25Zu1L2Q9uk998d5GMnX43t9u9eVBKvbVtgHndkc2GmUFed8Pu73LGW6hiDsmGXHykKUTLkvUdh4yXPdL3Jo4wVS?cluster=mainnet-qn1). 

-  The above [tx](https://solana.fm/tx/25Zu1L2Q9uk998d5GMnX43t9u9eVBKvbVtgHndkc2GmUFed8Pu73LGW6hiDsmGXHykKUTLkvUdh4yXPdL3Jo4wVS?cluster=mainnet-qn1) calls [`verify_signatures`](https://github.com/wormhole-foundation/wormhole/blob/91296e67722032debf04e95c71b3d701d4625c5b/solana/bridge/program/src/instructions.rs#L132-L160) on the main Wormhole Program which creates the `signatures_set` account on-chain: 
   -  ![](https://i.imgur.com/OnQMDD9.png)


    
---

- Let's zoom into `verify_signatures`: 
    - What does it do? 
        - it takes a set of signatures provided by the Guardians
        - verify the signatures - whether they are legit signatures or not
        - and finally, store them in a newly created account `signature_set`
    - ![](https://i.imgur.com/zODaMCP.png)

    - It outsources the second step i.e the verification of signatures to `secp256k1` program. 
        - The[`secp256k1`](https://docs.solana.com/developing/runtime-facilities/programs#secp256k1-program) program is a [native Solana program](https://docs.solana.com/developing/runtime-facilities/programs) - built directly into the core of the Solana blockchain. 
        - It verifies whether the given signatures are correct or not. 


    - As observed from `verify_signatures` code [here](https://github.com/wormhole-foundation/wormhole/blob/ca509f2d73c0780e8516ffdfcaf90b38ab6db203/solana/bridge/program/src/api/verify_signature.rs#L100-L110): 

        - before triggering `verify_signatures` function,  `secp256k1` instruction needs to be executed. 
    
        - ![](https://i.imgur.com/uF7P0qU.png)   
        - Let's see an [example of a valid call](https://solana.fm/tx/5g6t8Qo3CYoCGg9iaDcAii63HjkmHjiDgnHr88vsAJs89CuSJt5zbDcnCvjZw7vF4zLcvhwwqxsDgiZcxp9FNqyi) for `verify_signatures` 
            - ![](https://i.imgur.com/8NrbbtU.png)
            - Here, you can see that the transaction has two instructions:
                - #1: call `secp256k1` to extract signatures from the [message](https://github.com/wormhole-foundation/wormhole/blob/ca509f2d73c0780e8516ffdfcaf90b38ab6db203/solana/bridge/program/src/api/verify_signature.rs#L165-L171)
                    - ![](https://i.imgur.com/sknpoo6.png)

                - #2: call `verify_signatures` to verify the previous signatures and create the `signature_set` account.
                    - ![](https://i.imgur.com/qY3CRbH.png)




    - Now, the Wormhole contracts used `load_instruction_at` to check whether the instruction before triggering `verify_signatures` is a secp256k1 verification instruction or not. **This is where the vulnerability lay that hacker exploited!**
        - ![](https://i.imgur.com/XUHLvVA.png)


<br>

## Vulnerability Explained: 

To recap so far: 
1. To mint wrapped Wormhole tokens on Solana, one needs to call `complete_wrapped` on Wormhole's Token Bridge contract deployed on Solana. 

2. Function `complete_wrapped` takes in a `message_acc` account which contains valid VAA. 

3. We see that `message_acc` account was created in a previous transaction when `post_vaa` function was called on Wormhole's Core bridge contract deployed on Solana. 

4. We see that `post_vaa` takes in a `signature_set` account which is generated in a previous transaction when `verify_signatures` is called on Wormhole's core bridge contract. 

5. We see that `verify_signatures` executes 2 instructions in sequential order: 
    - call `secp256k1` to extract signatures from the [message](https://github.com/wormhole-foundation/wormhole/blob/ca509f2d73c0780e8516ffdfcaf90b38ab6db203/solana/bridge/program/src/api/verify_signature.rs#L165-L171)
    - call `verify_signatures` to verify the previous signatures and create the `signature_set` account.


<br><br> 

Now let's finally understand the vulnerability.
     

1. To make sure that `secp256k1` program instruction is executed before triggering `verify_signatures`, Wormhole contracts used `load_instuction_at`

2. Solana recently deprecated `load_instruction_at` because it does not check whether it's executing against the actual system address. 
    - ![](https://i.imgur.com/r1f4rvi.png)

3. Ideally, when triggering `verify_signatures`,  one needs to provide the `system` account [here](https://github.com/wormhole-foundation/wormhole/blob/9a4af890e3e2d4729fe70e43aaced39ba8b33e35/solana/bridge/program/src/instructions.rs#L153).
    - Here is the system address provided as input for a legit `verify_signatures` tx. 
    - ![](https://i.imgur.com/rceTa1C.png)

4. But here's the `verify_signatures` trigger call for the fake mint of 120k ETH: 
    - ![](https://i.imgur.com/aPRC2mQ.png)
    - Boom! This doesn't feel like the system's address!

5. So it means that anyone could: 
    - create a new account
    - store the same data that `Sysvar:Instructions` account would have stored. 
    - substitute the account in place of `Sysvar:instructions` account when calling `verify_signatures`


6. That's what the hacker did: 
    - They created a fake account with fake instruction data: [2tHS1cXX2h1KBEaadprqELJ6sV9wLoaSdX68FqsrrZRd](https://solana.fm/address/2tHS1cXX2h1KBEaadprqELJ6sV9wLoaSdX68FqsrrZRd) 

    - Called `verify_signatures` in this [tx](https://solana.fm/tx/25Zu1L2Q9uk998d5GMnX43t9u9eVBKvbVtgHndkc2GmUFed8Pu73LGW6hiDsmGXHykKUTLkvUdh4yXPdL3Jo4wVS) with the above fake account in the place of `sysvar:instructions`
    - ![](https://i.imgur.com/b2Kw1vp.png)

    - The above tx created a fake `signature_set` in this account: [EtMw1nQ4AQaH53RjYz3pRk12rrqWjcYjPDETphYJzmCX](https://solana.fm/address/EtMw1nQ4AQaH53RjYz3pRk12rrqWjcYjPDETphYJzmCX?cluster=mainnet-qn1)

    - Used the above `signature_set` account as an input to `post_vaa` function in this [tx](https://solana.fm/tx/2SohoVoPDSdzgsGCgKQPByKQkLAXHrYmvtE7EEqwKi3qUBTGDDJ7DcfYS7YJC2f8xwKVVa6SFUpH5MZ5xcyn1BCK?cluster=mainnet-qn1) 
 
    - The above tx generated a `message_ac` account: [GvAarWUV8khMLrTRouzBh3xSr8AeLDXxoKNJ6FgxGyg5](https://solana.fm/address/GvAarWUV8khMLrTRouzBh3xSr8AeLDXxoKNJ6FgxGyg5?cluster=mainnet-qn1)

    - The above `message_acc` is then inserted as an input to call `complete_wrapped` function to mint 120k ETH in this [tx](https://solana.fm/tx/2zCz2GgSoSS68eNJENWrYB48dMM1zmH8SZkgYneVDv2G4gRsVfwu5rNXtK5BKFxn7fSqX9BvrBc1rdPAeBEcD6Es?cluster=mainnet-qn1). 



<br>

# Potential Impact 

For a brief moment, $320 million worth of Wormhole-ETH on Solana was unbacked by deposits on Ethereum side. 
 - If the Wormhole-ETH wasn't backed up with Ether, then Defi protocols on Solana that accepted Wormhole-ETH as collateral could become insolvent. 
 - Users could have rushed to sell their Wormhole-ETH, causing its value to crash, which could have serious implications for Solana's Defi ecosystem. 
 

Luckily Jump Trading, Wormhole's parent company, decided to front 120k ETH to avoid the above catastrophe and make users whole. 


<br>

# Official Statement

Wormhole team's official disclosure is [here](https://wormholecrypto.medium.com/wormhole-incident-report-02-02-22-ad9b8f21eec6). 

