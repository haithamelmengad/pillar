let lotion = require('lotion')
let { handler, client } = require('./imara.js')

let opts = {
      port: 3000,
      initialState: {
              balances: {
                        },
              nonces: {}
            }
}
let app = lotion(opts)
app.use(handler)
app.listen(3000)
