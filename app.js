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
    }
}))    

// app.listen(3000)
app.listen(3000).then(appInfo => {
    console.log(appInfo.GCI)
})