async function client() {
    let lotion = require('lotion')
    let client = await
        lotion.connect('7f138745fe9a7ce5c05015bcc7923a22b8493e6a34531b61a791ff1d8d3fd763')

    // let result = await
    //     client.send({
    //         from: [
    //             // tx inputs. each must include an amount:
    //             {amount: 4, type: 'bonds', senderAddress: 'ting'}
    //         ],
    //         to: [
    //             // tx outputs. sum of amounts must equal sum of amounts of inputs.
    //             {amount: 4, type: 'bonds', receiverAddress: 'wai'}
    //         ]
    //     })

    let tingVote = await
        client.send({
            from: [
                // tx inputs. each must include an amount:
                {amount: 25, type: 'vote', price: 1.01, senderAddress: 'ting'}
            ],
            to: [
                // tx outputs. sum of amounts must equal sum of amounts of inputs.
                {amount: 25, type: 'vote', price: 1.01}
            ]
        })

    let waiVote = await
        client.send({
            from: [
                // tx inputs. each must include an amount:
                {amount: 25, type: 'vote', price: 0.99, senderAddress: 'wai'}
            ],
            to: [
                // tx outputs. sum of amounts must equal sum of amounts of inputs.
                {amount: 25, type: 'vote', price: 1.01}
            ]
        })

    let badActor = await
        client.send({
            from: [
                // tx inputs. each must include an amount:
                {amount: 1, type: 'vote', price: 0.1, senderAddress: 'badActor'}
            ],
            to: [
                // tx outputs. sum of amounts must equal sum of amounts of inputs.
                {amount: 1, type: 'vote', price: 1.01}
            ]
        })

        // client.send({
        //     from: [
        //         // tx inputs. each must include an amount:
        //         {amount: 1, type: 'price', price: 0.99, senderAddress: 'wai'}
        //     ],
        //     to: [
        //         // tx outputs. sum of amounts must equal sum of amounts of inputs.
        //         {amount: 1, type: 'price', price: 1.01}
        //     ]
        // })

    // console.log('\ntingVote:\n', tingVote)
    // console.log('\nwaiVote:\n', waiVote)
    console.log('\nbadActor:\n', badActor)
}

client()
