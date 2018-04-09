import lotion from 'lotion'
import coins from 'coins'
import _ from 'underscore'

const url = 'http://localhost:3000'

class Imara {
  constructor () {
    this.app = lotion({
      initialState: {
          wallets: {
              'ting': {
                  balance: 100,
                  bonds: 0
              },
              'wai': {
                  balance: 100,
                  bonds: 0
              },
              'badActor': {
                  balance: 100,
                  bonds: 0
              }
          },
          bondQueue: [],
          bondFactor: 0.9,
          airdropFactor: 1.1,
          supply: 20,
          votePrices: {},
          stakedAmount: {},
          lastVoteWindow: 0,
          finalPrice: 0
      },
      // logTendermint: true,
      createEmptyBlocks: true,
      devMode: true
    })

    let count = 0

    this.app.useBlock((state, chain) => {
      if ((chain.height - state.lastVoteWindow) > 20) {
          state.lastVoteWindow = chain.height
      } else {
          return
      }

      //state.wallets[input.senderAddress].balance -= input.amount

      var totalPrices = 0;
      var totalWeight = 0;


      for (var address in state.votePrices) {
          totalPrices += state.votePrices[address] * state.stakedAmount[address]
          totalWeight += state.stakedAmount[address]
      }

      if (totalWeight > 0) {
        state.finalPrice = totalPrices / totalWeight
      }
      for (var address in state.votePrices) {
          if (state.votePrices[address] < state.finalPrice * 0.95) {
              continue
          }
          else if (state.votePrices[address] > state.finalPrice * 1.05) {
              continue
          }
          else {
              continue
              // state.wallets[address].balance += state.stakedAmount[address] * 1.01
          }
      }
      state.votePrices = {}
      state.stakedAmount = {}
    })

    this.app.use(coins({
      name: 'imara',
      handlers: {
          'coin': {
              onInput(input, tx, substate, chain, state) {
                  // this function is called when coins of
                  // this type are used as a transaction input.

                  // if the provided input isn't valid, throw an error.
                  if(!(input)) {
                      throw Error('this input isn\'t valid!')
                  }

                  // if the input is valid, update the state to
                  // reflect the coins having been spent.
                  state.wallets[input.senderAddress].balance -= input.amount
              },

              onOutput(output, tx, substate, chain, state) {
                  // here's where you handle coins of this type
                  // being received as a tx output.

                  // usually you'll just want to mutate the state
                  // to increment the balance of some address.
                  state.wallets[output.receiverAddress].balance = (state.wallets[output.receiverAddress].balance || 0) + output.amount
              }
          },
          'airdrop':{

              onInput(input, tx, substate, chain, state) {
                  if(!(input)) {
                      throw Error('this input isn\'t valid!')
                  }
                  const initialSupply = state.supply
                  _.mapObject(state.wallets, (wallet, address) => {
                      wallet.share = wallet.balance/initialSupply
                  })
                  const targetCap = state.supply * state.airdropFactor
                  while(state.bondQueue.length){
                      const bondtoRedeem = state.bondQueue.splice(0,1)
                      for(let i = 0; i < bondtoRedeem[0].amount; i++){
                          if(state.supply < targetCap){
                              state.wallets[bondtoRedeem[0].bondowner].balance += 1
                              state.supply += 1
                          }
                      }
                  }
                  if(state.supply < targetCap){
                      let margin = (targetCap - state.supply)
                      _.mapObject(state.wallets, (wallet, address) => {
                              console.log(wallet.share)
                              wallet.balance += margin*(wallet.share)
                              state.supply += margin*(wallet.share)
                      })

                  }
                  console.log('this is new supply : ', state.supply)

                  // state.wallets[input.senderAddress].balance = (state.wallets[input.senderAddress].balance || 0) - input.amount*state.bondFactor
                  // state.bondQueue.pop({bondowner : input.senderAddress, amount: input.amount})



              },
              onOutput(input, tx, substate, chain, state){
              }

          },
          'bonds':{

              onInput(input, tx, substate, chain, state) {

                  if(!(input)) {
                      throw Error('this input isn\'t valid!')
                  }
                  state.bondQueue.push({bondowner : input.senderAddress, amount: input.amount})
                  state.wallets[input.senderAddress].bonds += input.amount
                  state.wallets[input.senderAddress].balance = (state.wallets[input.senderAddress].balance || 0) - input.amount*state.bondFactor
              },

              onOutput(input, tx, substate, chain, state) {

              }
          },
          'vote': {

              onInput(input, tx, substate, chain, state) {

                  if (!(input)) {
                      throw Error('this input isn\'t valid!')
                  }

                  if (input.senderAddress in state.votePrices) {
                      return
                  }

                  state.votePrices[input.senderAddress] = input.price
                  state.stakedAmount[input.senderAddress] = input.amount

                  console.log(state.votePrices)

              },
              onOutput(output, tx, substate, chain, state) {
              }
          }
      }
    }))
  }

  async init () {
    return await this.app.listen(3000)
  }

}

export default Imara
