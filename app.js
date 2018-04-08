const lotion = require('lotion')
const coins = require('coins')

const app = lotion({
    initialState: {
        'ting': {
            balance: 10,
        },
        'wai':  {
            balance: 10,
        },
        bondQueue: [],
        bondFactor : 0.9
        //votePrices: [],
        votes: {},
    },
    // logTendermint: true,
    devMode: true
})


app.use(coins({
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
        'airdrop':{},
        'bonds':{

            onInput(input, tx, substate, chain, state) {

                if(!(input)) {
                    throw Error('this input isn\'t valid!')
                }
                state.bondQueue.push({bondowner : input.senderAddress, amount: input.amount})
            },

            onOutput(output, tx, substate, chain, state) {
                state[output.receiverAddress].balance = (state[output.receiverAddress].balance || 0) - output.amount*state.bondFactor

            }
        }
        'price':{

            onInput(input, tx, substate, chain, state) {

                if(!(input)) {
                    throw Error('this input isn\'t valid!')
                }

                state.votePrices[input.senderAddress] = input.price
                state.stakedAmount[input.senderAddress] = input.amount
                if(!(state.height%60)) {
                    var totalPrices = 0;
                    var totalWeight = 0;
                    for (var address in state.votePrices) {
                        totalPrices += state.votePrices[address] * state.stakedAmount[address]
                        totalWeight += state.stakedAmount[address]
                    }
                    var finalPrice = totalPrices/totalWeight
                    for (var address in state.votePrices) {
                        if (state.votePrices[address] < finalPrice * 0.95) {
                            state.accounts[address].balance -= state.stakedAmount[address] * state.votePrices[address]/finalPrice
                        }
                        else if (state.votePrices[address] > finalPrice * 1.05) {
                            state.accounts[address].balance -= state.stakedAmount[address] * finalPrice/state.votePrices[address]
                        }
                        else {
                            state.accounts[address].balance += state.stakedAmount[address] * 0.0001
                        }
                    }
                }
            },

            onOutput(output, tx, substate, chain, state) {

            }
        }
    }
}))

// app.listen(3000)
app.listen(3000).then(appInfo => {
    console.log(appInfo.GCI)
})
