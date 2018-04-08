this is a stable crypto

Impact:
One of the largest barriers to using cryptocurrencies is the volatility. This volatility leads to two problems. First, this leads to over-speculation, and second, the upside of using cryptocurrencies just isn't worth the risk for most people. Stablecoins are the answer to the volatility problem. They have all the decentralized properties of normal cryptocurrencies, with orders of magnitude less volatility. 

VENEZUELA EXAMPLE:
    - Bolivar is super volatile
    - government is oppressive
    - decentralized currencies allow the people to own their money
    - stablecoins would solve the volatility problem, as well as the decentralization problem

Feasibility:
We have implemented a basic version of a stable currency, not the cosmos SDK library) in lotionjs. What we have left to do is to tune the parameters on how sensitive imara is to price changes. Assuming you have a correct way of managing supply in respond to demand, the hardest part is getting accurate price data to respond to in a trustless way, which is essentially the oracle problem.

Implementation:
Right now, imara can send money back and forth between wallets. When the price is too low, users have the option of buying up bonds in exchange for coins, decreasing the supply. When the price is too high, imara pays back these bonds in FIFO order, increasing the supply. Once bonds run out, users are "airdropped" currency if imara still needs to increase the supply.

Next Steps:
Turn imara into a lotionjs library so other apps can pull from it.
