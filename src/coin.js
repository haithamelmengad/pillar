import lotion from 'lotion'
import coins from 'coins'

const url = 'http://localhost:3000'

class Imara {
  constructor () {
    this.app = lotion({
      devMode: true,
      initialState: {},
      peers: [],
      createEmptyBlocks: false,
      logTendermint: true,
      p2pPort: 46658, // port to use for tendermint peer connections
      tendermintPort: 46657 // port to use for tendermint rpc
     })


    this.cgi = this.app.listen(3000)
  }

}

export default Imara
