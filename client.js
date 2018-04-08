async function client() {
    let lotion = require('lotion')
    let client = await
        lotion.connect('488d68c7e40b578da9accd3a6788c4b983373df5563580e558a00fc04d7a17ce')

    let result = await
        client.send({
            from: [
                // tx inputs. each must include an amount:
                {amount: 4, type: 'bonds', senderAddress: 'ting'}
            ],
            to: [
                // tx outputs. sum of amounts must equal sum of amounts of inputs.
                {amount: 4, type: 'bonds', receiverAddress: 'wai'}
            ]
        })
    
    let result2 = await
        client.send({
            from: [
                // tx inputs. each must include an amount:
                {amount: 1, type: 'price', price: 1.01, senderAddress: 'ting'}
            ],
            to: [
                // tx outputs. sum of amounts must equal sum of amounts of inputs.
                {amount: 1, type: 'price', price: 1.01}
            ]
        })

        client.send({
            from: [
                // tx inputs. each must include an amount:
                {amount: 1, type: 'price', price: 0.99, senderAddress: 'wai'}
            ],
            to: [
                // tx outputs. sum of amounts must equal sum of amounts of inputs.
                {amount: 1, type: 'price', price: 1.01}
            ]
        })

    console.log('\nRESULT2:\n', result2)
}

client()
