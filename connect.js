let { connect } = require('lotion')
const GCI = require(YOUR_CGI)

async function main() {
    let { state, send } = await connect(GCI)
    console.log(await state)
}

main()
