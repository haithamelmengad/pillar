import lotion from 'lotion'
import coins from 'coins'


class Imara {
  constructor () {
    this.app = lotion({ initialState: {} })

    this.app.use(coins({
      name: 'Imara',
      initialBalances: {
        // map addresses to balances
        '04oDVBPIYP8h5V1eC1PSc/JU6Vo': 10,
        'OGccsuLV2xuoDau1XRc6hc7uO24': 20
      }
    }))

    this.app.listen(3000)
  }
}

export default Imara
