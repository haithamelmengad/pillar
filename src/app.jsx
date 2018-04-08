import React, { Component } from 'react'
import { connect } from 'lotion'
import coins from 'coins'
import { randomBytes } from 'crypto'
import { Dimmer, Loader } from 'semantic-ui-react'
import MenuBar from './menu'
import Wallet from './wallet'
import Vote from './vote'
import Bonds from './bonds'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activeItem: 'wallet',
      address: '1234567890',
      balance: 3,
      bonds: 4,
      wallet: null,
      client: null,
      connected: false
    }
  }

  componentDidMount () {
    this.getState()
      /*.then((client) => {
        console.log(client)
        //var buffer = Buffer.from('419f0dfdb617865ad6e64b381a6552aff3a2c6aa7e363f43b0186a8d5b9d1ac5', 'hex')
        //var wallet = coins.wallet(buffer, client)
        var address = '123'
        var balance = 13
        setTimeout(() => {this.setState({connected: true, client: client, address: address, balance: balance })}, 2000)
      })*/
  }

  async getState () {
    console.log(this.props.gci)
    let { state, send } = await connect(this.props.gci)
    console.log(await state)
  }

  handleItemClick (event, { name }) {
    this.setState({ activeItem: name })
  }

  sendTransaction (address, amount) {
    console.log('SEND MONEY !')
    console.log('To :', address)
    console.log('Amount :', amount)
    return new Promise (function (resolve, reject) {
      setTimeout(function (){ resolve() }, 3000)
    })
  }

  buyBond (amount) {
    console.log('BUY BOND !')
    console.log('Amount :', amount)
    return new Promise (function (resolve, reject) {
      setTimeout(function (){ resolve() }, 3000)
    })
  }

  getView () {
    switch (this.state.activeItem) {
      case 'wallet':
        return <Wallet sendTransaction={this.sendTransaction.bind(this)} address={this.state.address} balance={this.state.balance} />
      case 'vote':
        return <Vote />
      case 'bonds':
        return <Bonds bonds={this.state.bonds} buyBond={this.buyBond.bind(this)} />
      default:
        throw new Error('Unknown view')
    }
  }

  render() {
    return (
    <div style={{ padding: '15px' }}>
      <MenuBar handleItemClick={this.handleItemClick.bind(this)} activeItem={this.state.activeItem} />
      { this.state.connected ? this.getView() : <Dimmer active><Loader indeterminate>Connecting</Loader></Dimmer> }
    </div>)
  }
}

export default App
