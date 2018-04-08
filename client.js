async function client() {
    let lotion = require('lotion')
    let client = await
        lotion.connect(YOUR_CGI)

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

    console.log('\nRESULT:\n', result)
}

client()
