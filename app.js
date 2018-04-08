const lotion = require('lotion')
const coins = require('coins')

const app = lotion({
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
        marketCap: 20,
        votePrices: {},
        stakedAmount: {},
        lastVoteWindow: 0,
    },
    // logTendermint: true,
    devMode: true
})

// const redeemBonds = (factor, bondqueue) => {
//
//     while (bondqueue.length &&) {
//
//
//     }
// }

app.use(coins({
    name: 'imara',
    handlers: {
        'coin': {
            onInput(input, tx, substate, chain, state) {
                // this function is called when coins of
                // this type are used as a transaction input.

                // if the provided input isn't valid, throw an error.
                if (!(input)) {
                    throw Error('this input isn\'t valid!')
                }

                // if the input is valid, update the state to
                // reflect the coins having been spent.
                state[input.senderAddress].balance -= input.amount
            },

            onOutput(output, tx, substate, chain, state) {
                // here's where you handle coins of this type
                // being received as a tx output.

                // usually you'll just want to mutate the state
                // to increment the balance of some address.
                state[output.receiverAddress].balance = (state[output.receiverAddress].balance || 0) + output.amount
            }
        },
        // 'airdrop': {
        //
        //     onInput(input, tx, substate, chain, state) {
        //
        //         if (!(input)) {
        //             throw Error('this input isn\'t valid!')
        //         }
        //
        //         const targetCap = state.marketCap * state.airdropFactor
        //         while (state.bondqueue.length && state.marketCap < targetCap) {
        //             state.bondqueue[].balance = (state[input.senderAddress].balance || 0) - input.amount * state.bondFactor
        //             state.marketCap += 1
        //         }
        //         state[input.senderAddress].balance = (state[input.senderAddress].balance || 0) - input.amount * state.bondFactor
        //         state.bondQueue.pop({bondowner: input.senderAddress, amount: input.amount})
        //
        //
        //     },
        //     onOutput(input, tx, substate, chain, state) {
        //
        //     }
        //
        // },
        'bonds': {

            onInput(input, tx, substate, chain, state) {

                if (!(input)) {
                    throw Error('this input isn\'t valid!')
                }
                state.bondQueue.push({bondowner: input.senderAddress, amount: input.amount})


                state[input.senderAddress].balance = (state[input.senderAddress].balance || 0) - input.amount * state.bondFactor

            }
        },
        'vote': {

            onInput(input, tx, substate, chain, state) {

                if (!(input)) {
                    throw Error('this input isn\'t valid!')
                }

                console.log(chain.height)
                console.log(state)

                if ((chain.height - state.lastVoteWindow) > 20) {
                    state.lastVoteWindow = chain.height
                } else {
                    return
                }

                if (input.senderAddress in state.votePrices) {
                    return
                }

                state.votePrices[input.senderAddress] = input.price
                state.stakedAmount[input.senderAddress] = input.amount
                state.wallets[input.senderAddress].balance -= input.amount

                var totalPrices = 0;
                var totalWeight = 0;
                for (var address in state.votePrices) {
                    totalPrices += state.votePrices[address] * state.stakedAmount[address]
                    totalWeight += state.stakedAmount[address]
                }
                console.log(totalPrices, totalWeight)
                state.finalPrice = totalPrices / totalWeight
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
            },
            onOutput(output, tx, substate, chain, state) {
            }
        }
    }
}))

app.listen(3000).then(appInfo => {
    console.log(appInfo.GCI)
})
