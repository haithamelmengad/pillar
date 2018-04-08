import React, { Component } from 'react'
import MenuBar from './menu'
import Wallet from './wallet'
import Vote from './vote'
import Bonds from './bonds'

class App extends Component {
  constructor () {
    super()

    this.state = {
      activeItem: 'wallet',
      address: '1234567890',
      balance: 3,
      bonds: 4
    }
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
      { this.getView() }
    </div>)
  }
}

export default App
