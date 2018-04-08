const lotion = require('lotion')
const coins = require('coins')
const _ = require('underscore')

const app = lotion({
    initialState: {
        wallets: {
            "ting": {
            balance: 20
            }
        ,
            "wai" :  {
            balance: 20
            }
        },
        bondQueue: [{bondowner: 'ting', amount: 2}],
        bondFactor : 0.9,
        airdropFactor: 1.1,
        supply : 40
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
                
                state.supply -= input.amount*state.bondFactor
                state.wallets[input.senderAddress].balance = (state.wallets[input.senderAddress].balance || 0) - input.amount*state.bondFactor
            },

            onOutput(input, tx, substate, chain, state){

            }
        }
    }
}))    

// app.listen(3000)
app.listen(3000).then(appInfo => {
    console.log(appInfo.GCI)
})