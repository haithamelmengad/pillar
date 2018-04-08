let { connect } = require('lotion')

async function main() {
    const GCI = '734d0f2d9a6c7255c1a9b5f5a75fea58f5ff8310027c614e417a5349ba718c3d'
    let { state, send } = await connect(GCI)
    console.log(await state)
}

main()
