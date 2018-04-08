let lotion = require('lotion')
let coins = require('coins')

let app = lotion({
    initialState: {},
    logTendermint: true,
    devMode: true
})

app.use(coins({
    name: 'imara',
    initialBalances: {
        // map addresses to balances
        '04oDVBPIYP8h5V1eC1PSc5JU6Vo': 10,
        'OGccsuLV2xuoDau1XRc6hc7uO24': 20
    },
    modules: {
        'test': {
            onInput(input, state) {
                // this function is called when coins of
                // this type are used as a transaction input.

                // if the provided input isn't valid, throw an error.
                if(isNotValid(input)) {
                    throw Error('this input isn\'t valid!')
                }

                // if the input is valid, update the state to
                // reflect the coins having been spent.
                state[input.senderAddress] -= input.amount
            },

            onOutput(output, state) {
                // here's where you handle coins of this type
                // being received as a tx output.

                // usually you'll just want to mutate the state
                // to increment the balance of some address.
                state[output.receiverAddress] = (state[output.receiverAddress] || 0) + output.amount
            }
        }
    }
}))

// app.listen(3000)
app.listen(3000).then(appInfo => {
    console.log(appInfo.GCI)
    // '6d767e6c20257640bc8715a6b7af10c77a15a69f8ac68b196bee4dfbc7773ba8'
})