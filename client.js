async function client() {
    let lotion = require('lotion')
    let client = await
        lotion.connect("66f852a9eea6de1783f82730d5d216263010a7ba219f8fec5f056d4e59fb2a7d")

    let result = await
        client.send({
            from: [
                // tx inputs. each must include an amount:
                {amount: 4, type: 'airdrop', senderAddress: 'ting'}
            ],
            to: [
                // tx outputs. sum of amounts must equal sum of amounts of inputs.
                {amount: 4, type: 'bonds', receiverAddress: 'wai'}
            ]
        })

    console.log('\nRESULT:\n', result)
}

client()
