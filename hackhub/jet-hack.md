---
title: "Jet Protocol - $25 million vulnerability"
description: "Learn how rust memory layout works"
pubDate: "Sep 14 2022"
year: 2022
active: true
tags: Superteam Security
---

Jet - a protocol that builds a decentralised lending platform - suffered from a critical vulnerability where a hacker could have siphoned off $25 million!

Fortunately, [Jayne](https://twitter.com/0xjayne/status/1478357088468234243?s=20&t=7dK4vfaYXsmfG7xKq9AtFA) - a dev in the Solana ecosystem - who happened to be going through the Jet's codebase, found the vulnerability and then privately informed the Jet protocol team about it. 

The core team promptly redeployed the mainnet program with the bug patched. 
Nevertheless, it will still be interesting to learn how the hack could have occurred and glean some insights. 

![](https://i.imgur.com/D7qgrb1.png)

<br> 

## Why would you use Jet protocol? 

Jet Protocol is a decentralised, non-custodial protocol that uses a collection of smart contracts that provides lending and borrowing functions.

Users can: 
1. lend assets to earn interest. 
2. borrow assets against the collateral they have posted. 

These lending or borrowing activities are collectively called opening a "**position**". 

Whenever you come across the word position in the article below, think of them as a user doing a lend or a borrow activity with Jet. 
 

So when you open a "position" with Jet, inside the hood the protocol tracks these two values: 
- **total collateral value** - the sum of all the collateral the user has supplied to the protocol 
- **total loans value** - the sum of all the loans users owes to the protocol. 

The above two values calculate the collateral-to-loan ratio (short form C-ratio). 

<br>

### What is collateral-to-loan ratio? 
It is a ratio to determine whether the collateral backing your loan is in a healthy condition or not. If it's not, then the protocol sells some/all your collateral to cover for the loan. 

**Formula for C-ratio = collateral value / borrowed value**

Example: 
* Assume the current market price of 1 SOL = $12.5
* Suppose: 
    * you want to lend 10 SOL i.e $125 worth of SOL
    * and then borrow 100 USDC. 
    * The current C-ratio would come out to be: 
        * = ($125 worth of SOL) / ($100 worth of USDC) 
        * = 125% 
* After a while: 
  * suppose the price of 1 SOL drops to $8.5. 
  * then the value of your collateral effectively becomes $85. 
  * Now any rational person who has borrowed $100 worth of USDC, will not want to return this to the protocol since they will get back only $85 worth of SOL!
  * To paraphrase, they are incentivized to take off with the loaned asset. 

This situation is not ideal hence: 
* Jet protocol instils a guardrail where the user's position C-ratio should always be = 125%. 
* If the user's position C-ratio drops below 125%, then Jet protocol sells off part of the collateral to get the position above 125%.

<br>

![](https://i.imgur.com/VXWz11l.png)


## How could the hacker have stolen the funds? 

Now let's understand what precisely the vulnerability entailed at a high level: 
1. Jet used an array to store users' positions. 
    - Suppose I have four positions in the array. 
        - `c` stands for supplying collateral/lending position 
        - `b` stands for borrowing/loan position 
    - So the array tracking user's positions would look like this: ![](https://i.imgur.com/cXvGN2S.png)



3. Whenever a user tried to take loans: 
    - Jet calculates the C-ratio by looping through the user's positions array. 
    - If the calculated C-ratio was >=125%, then the user was allowed to take loans.  
    - From the above example, C-ratio becomes: ![](https://i.imgur.com/0mlyQnD.png)



4. The recover rent upgrade introduced a vulnerability that if a user closed any loan positions, the positions after it got ignored in the C-ratio calculation. 
    - Let's assume that in the above example, the user closed `b1` loan. 
    - Due to the vulnerability, all positions after `b1` got ignored and the C-ratio calculation became: 
        - ![](https://i.imgur.com/XehuVaw.png)

6. So even if the user takes more loans, the wonky C-ratio will not account for that position, as all positions after `b1` get ignored! 
 


<br>

## How could the exploit work? 

Let's take a real-world example: 
1. deposit `x` SOL as collateral
2. borrow  `0.2*x` USDC 
3. deposit `y' BONK as collateral
4. borrow `0.2*y` USDC


Then the array of positions becomes: 

- [ `x` SOL Collateral, `0.2*x` USDC loan, `y` BONK collateral, `0.2*y` USDC loan]


Now to trigger the vulnerability, repay `0.2*x` USDC loan: 


- [ `x` SOL Collateral, ~~0.2*x USDC loan~~, `y` BONK collateral, `0.2*y` USDC loan]

Due to closing this account, loan value beyond index 1 is ignored in all calculations from here on. 

And voila, you can steal money now! 
1. You can borrow any amount of USDC. 
2. You don't even need to provide any collateral to borrow! 


Now that we have understood the hack at a high level, let's dive deep into technical details. 

<br> 

## Technical Details 

There are 3 functions that are responsible for calculating C-Ratio: 
- [**collateral_value**](https://github.com/jet-lab/jet-v1/blob/e9cfe1810a6614b78934704ac46dffef67a8d794/programs/jet/src/state/obligation.rs#L293-L299) - responsible for calculating total market value of all the collateral user has supplied
- [**loan_value**](https://github.com/jet-lab/jet-v1/blob/e9cfe1810a6614b78934704ac46dffef67a8d794/programs/jet/src/state/obligation.rs#L301-L307) - responsible for calculating total market value of all the loans the user owes to the protocol. 
- [_market_value](https://github.com/jet-lab/jet-v1/blob/e9cfe1810a6614b78934704ac46dffef67a8d794/programs/jet/src/state/obligation.rs#L483-L496) - called by the above functions to calculate market value of the assets. 


![](https://i.imgur.com/Xfy6dfj.png)




Focus on the `for` loop in the above code. 

* The break statement breaks the loop when `Pubkey::default()` is encountered. 
    - What is `Pubkey::default()`? 
        - In Solana, every account has a public address represented by it's public key. 
        - [`Pubkey` struct](https://docs.rs/solana-program/1.4.9/solana_program/pubkey/struct.Pubkey.html) offers developers various methods around public keys like public key generation for a new account. 
        - One such method is `default`. 
            - The default value for a Pubkey Solana is an all-zero value. 
            - The accounts that have a `default` Pubkey means that either they are not created or they are closed. 
        - So this method helps developers check whether a particular account exists or not.
- **Hence encountering `Pubkey::default()` means a blank account which meant that there are no positions after this iteration**

This wasn't an issue before Jet added the feature to close accounts to recover rent for users. 

<br> 

The close account feature: 
- introduced 2 new instructions: 
    - [`close_loan_account`](https://github.com/jet-lab/jet-v1/blob/e9cfe1810a6614b78934704ac46dffef67a8d794/programs/jet/src/instructions/close_loan_account.rs) and 
    - [`close_collateral_account`](https://github.com/jet-lab/jet-v1/blob/e9cfe1810a6614b78934704ac46dffef67a8d794/programs/jet/src/instructions/close_collateral_account.rs)

- which when closing accounts set the account value to `Pubkey::default`. 

<br> 

Now when a user tries to borrow funds after closing any loan position: 
- `_market_value` get's called to calculate user's C-ratio to check whether the user can borrow more funds or not. 
- As soon as the `for` loop encounters the `Pubkey` for a closed account, it breaks.  
-  **leading to ignoring the rest of the loans and collateral remaining in the array!**

<br> 

This incorrect breaking of `for` loop results in:
- inaccurate calculation for: 
    - total market value of user's collateral 
    - and total market value of user's loans!
- resulting in calculating an inaccurate C-ratio. 

---

Another function `is_healthy` also became vulnerable: 

![](https://i.imgur.com/DL9N5rr.png)



Here also `take_while` statement only iterates only till a `Pubkey::default()` is encountered which introduces a bug in determining if a user’s collateral-to-loan ratio is healthy or not. 




## How to fix the vulnerability? 


* Inside `_market_value` function, replace the `break` statement with `continue` so that loop still runs after encountering `Pubkey::default` - [patch here](https://github.com/jet-lab/jet-v1/commit/e4617be106449faed319feeadca18887ab97f9da#diff-4a3d8fc5d1304a2a6e54d9201bf8bcd038ad1adea84dc1d83be6e574039f1ca4R479). 
* Inside, `is_healthy`, replace `take_while` with `filter` so instead of breaking while loop on `Pubkey::default` we just filter the array where accounts exist - [patch here.](https://github.com/jet-lab/jet-v1/commit/f6951a454d049304ef3af0654751dffea652e205#diff-4a3d8fc5d1304a2a6e54d9201bf8bcd038ad1adea84dc1d83be6e574039f1ca4R470)

## Official Response

Jet protocol publicly disclosed the bug [here](https://medium.com/jetprotocol/jet-protocol-upgrade-bug-patch-disclosure-6eb74cf7149). 
