import lotion from 'lotion'
import coins from 'coins'

const url = 'http://localhost:3000'

class Imara {
  constructor () {
    this.app = lotion({
        initialState: {
            accounts: [{
                'ting': {
                balance: 10,
                }
            },
            {
                'wai' :  {
                balance: 10,
                }
            }],
            bondQueue: [],
            bondFactor : 0.9,
            airdropFactor: 1.1,
            marketCap : 20
        },
        // logTendermint: true,
        devMode: true
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
            'bonds':{

                onInput(input, tx, substate, chain, state) {

                    if(!(input)) {
                        throw Error('this input isn\'t valid!')
                    }
                    state.bondQueue.push({bondowner : input.senderAddress, amount: input.amount})


                    state[input.senderAddress].balance = (state[input.senderAddress].balance || 0) - input.amount*state.bondFactor

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
