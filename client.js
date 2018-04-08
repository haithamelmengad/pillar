async function client() {
    let lotion = require('lotion')

    let client = await
        lotion.connect('734d0f2d9a6c7255c1a9b5f5a75fea58f5ff8310027c614e417a5349ba718c3d')

    let result = await
        client.send({
            from: [
                // tx inputs. each must include an amount:
                {amount: 4, type: 'test', senderAddress: 'judd'}
            ],
            to: [
                // tx outputs. sum of amounts must equal sum of amounts of inputs.
                {amount: 4, type: 'test', receiverAddress: 'OGccsuLV2xuoDau1XRc6hc7uO24'}
            ]
        })

    console.log('\nRESULT:\n', result)
}

client()
