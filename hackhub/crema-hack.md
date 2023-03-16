---
title: "Crema Protocol - hacked for $8.8M"
description: "  "
pubDate: "Jan 26 2023"
year: 2022
active: true
---



Crema protocol - a DEX that uses concentrated liquidity - got hacked for $8.8M.

# Crema Protocol - hacked for $8.8M 

Crema protocol - a DEX that uses concentrated liquidity - got hacked for $8.8M. 

![](https://i.imgur.com/er3duwK.jpg)



<br> 

## Why would you use Crema? 

Crema helps: 
- Traders with lesser price impact when they swap assets.  
- Liquidity providers with better utilization of the capital supplied. 



![](https://i.imgur.com/SBiAgJu.jpg)


<br> 

Under the hood, Crema swaps assets **using Concentrated Liquidity Market Maker (CLMM)** which offers a **delta of efficiency over Automated Market Makers (AMM) based DEX's.**


![](https://i.imgur.com/Pgyqtcr.png)


<br> 

Read more here about CLMM model and why it's better than AMM model [here](https://gitbook.crema.finance/product/concentrated-liquidity-market-maker-clmm). 


## How did the hacker steal funds? 


In DEX's liquidity provider's are paid fees to incentivize them to provide liquidity so that traders can swap assets. 

* Under the hood of Crema, the protocol used "Tick" account - a dedicated account that stores price tick data. 
* The data in this Tick account is used to calculate the final LP fees. 
* Now what if one could create a fake Tick account with fake data in it? Then one could extract any amount of LP fees. 
* All that needs to be done is to bypass the protocol's checks on Tick account i.e the protocol gets convinced that it's reading data from a legit Tick account, but inherently it's a fake account. 


That's what the clever hacker was able to figure out! 

<br> 

High level view of how the hack worked:
1. Hacker creates a fake Tick account and loads it up with fake data. 
2. Hacker then creates a batch transaction where: 
    1. they take a flash loan from Solend to get access to a large amount of assets
    2. deposit that liquidity to Crema's pools
    3. claim a huge amount of fees based on the fake data provided in the fake Tick account. 
    4. withdraw liquidity from Crema 
    5. close flash loan by depositing liquidity to Solend. 


In fact, reading [one of the hacker's exploit transaction](https://solscan.io/tx/4FaMTKqha9Uw6hvxg5TQc5W7vRDKxVkfPn5GDMThGYSj3tgyCYSzXzQsAsT3dXDY6yZ26iYieV6bcV7bFDkTZ83W) shows that in one single tx hacker is chaining several (deposit => claim => withdraw) instructions together to repeatedely claim huge amount of LP fees from the pool they are depositing liquidity in. 


![](https://i.imgur.com/im5IGol.png)

As you can see from the above example: 
1. Hacker takes 3000 stSOL flash loan from Solend. 
2. Deposits the same to Crema 
3. Then runs the following loop 5 times: 
    1. Withdraws 218.82 stSOL and 206.64 SOL as LP fees.   
    3. Withdraws 3000 stSOL back. 
    4. Deposits 3000 stSOL again. 
5. Then the hacker returns 3000 stSOL back to Solend back with 9 additional SOL as Solend charges 0.3% as flash loan fees ([src](https://github.com/solendprotocol/solana-program-library/blob/5a53f75df4b6ce354e8274e5bee9e12af20ecae8/token-lending/cli/src/main.rs#L96))

And voila, hacker is able to steal (218.82 stSOL + 206.64 SOL) * 5 = ~2k SOL 


The hacker doesn't stop at one flash loan. In fact, they took out 6 flash loans - each composed of the same deposit => claim => withdraw flow. 

1. [Flash loan of 3000 stSOL](https://solscan.io/tx/4FaMTKqha9Uw6hvxg5TQc5W7vRDKxVkfPn5GDMThGYSj3tgyCYSzXzQsAsT3dXDY6yZ26iYieV6bcV7bFDkTZ83W)
2. [Flash loan of 5,500,000 USDT](https://solscan.io/tx/2TLDzCCFQ2LdApQBhnXBdbYF7ebTmBgZ8MtQFjYE29BbBxHdBgAmyikmK2s76xQRQErPmR8KsE9jLFnJbJHy3Mvn)
3. [Flash loan of 10,500 mSOL](https://solscan.io/tx/5iTy2smznuB2iQ9rgxP2YmEEGcv8bSvjqntiX8Vscxfr4Jakfnu5wZf1XJ86Xv79wwp1LeXCa6A9L9TLJ3TAoMhh) 
4. [Flash loan of 57,000 stSOL](https://solscan.io/tx/4q5Hs4N2FS6BeuyvgHLCgH6bKzdnAvKuLm59kxSt4REafve2ZqDt7qxVRvWwWk3jQCyhGfKwWsJFeHueXJF5Hrs9)
5. [Flash loan of 840,000 PAI](https://solscan.io/tx/pit8jmLpxF2bsHTfeQngUM7sR6cvbwXynYnCUHUjybiKaLPKPcRbCFQeoK2pdtquvybSaqpvk4jHJ7GuAb9xn5u)
6. [Flash loan of 400,000 USDH]()


All the stolen funds were swapped into 69422.9SOL and 6,497,738 USDCet via Jupiter. 

The USDCet was then bridged to Ethereum network via Wormhole and swapped to 6064 ETH via Uniswap after that.



<br> 





## Technical Explanation: 


Hacker's wallet: [Esmx2QjmDZMjJ15yBJ2nhqisjEt7Gqro4jSkofdoVsvY](https://solana.fm/address/Esmx2QjmDZMjJ15yBJ2nhqisjEt7Gqro4jSkofdoVsvY)





1. Created fake Tick account [CiDwX4eMS7hfit1oMHK6MCrgve9HVvgm2PAp7Cz6Bck](https://explorer.solana.com/address/CiDwX4eMS7hfit1oMHK6MCrgve9HVvgm2PAp7Cz6Bck) via this [tx](https://solana.fm/tx/JdorRBPfKNWnZNhWcjwc9Uz5yYaA15CVjT8kLM12tVUqZUu28CqtVEuJ5KpjWHJmVtL7j7sQVhPHHrByhNEKqej)

2. Used this fake Tick account when executing the batch [tx](https://solscan.io/tx/4FaMTKqha9Uw6hvxg5TQc5W7vRDKxVkfPn5GDMThGYSj3tgyCYSzXzQsAsT3dXDY6yZ26iYieV6bcV7bFDkTZ83W) to take flash loan and deposit that liquidity to Crema: 

![](https://i.imgur.com/bTouTKs.png)

<br> 


## Aftermath of the hack


* Crema put out the following message in an attempt to talk to the hacker in returning funds: 
    * ![](https://i.imgur.com/KBp0wlZ.png)

* And after a while, Crema [tweeted](https://twitter.com/Crema_Finance/status/1544792330674135040) that they were able to get ~$8.3 million back from the hacker!  
    * ![](https://i.imgur.com/8siN3ij.png)

* To compensate for the remaining loss of funds, Crema also drafted a compensation plan [here](https://medium.com/@Crema.finance/the-compensation-plan-regarding-cremas-exploit-incident-62fb9ba4c4bc)