let { connect } = require('lotion')

async function main() {
    let { state, send } = await connect('b4b9eee555c0d7be1c1a656579999e73d20bf755fdfedbd33ac83a312a215933')
    console.log(await state)
}

main()
