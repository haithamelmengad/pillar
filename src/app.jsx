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
    connect(this.props.gci)
      .then((state, send) => {
        var client = {state, send}
        setTimeout(() => {this.setState({connected: true, client: client, wallet: coins.wallet(randomBytes(32), client)})}, 2000)
      })
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
