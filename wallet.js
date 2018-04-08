async function wallet () {
    let lotion = require('lotion')
    let coins = require('coins')
    let { randomBytes } = require('crypto')
    let client = await lotion.connect('734d0f2d9a6c7255c1a9b5f5a75fea58f5ff8310027c614e417a5349ba718c3d')

    console.log('here')

    let wallet = coins.wallet(randomBytes(32), client)

    // wallet methods:
    let address = wallet.address
    console.log(address) // 'OGccsuLV2xuoDau1XRc6hc7uO24'

    let balance = await wallet.getBalance()
    console.log(balance) // 20

    let result = await wallet.send('04oDVBPIYP8h5V1eC1PSc/JU6Vo', 5)
    console.log(result) // { height: 42 }
}

wallet();