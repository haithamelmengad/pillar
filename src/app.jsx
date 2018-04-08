import React, { Component } from 'react'
import MenuBar from './menu'
import Wallet from './wallet'
import Vote from './vote'

class App extends Component {
  constructor () {
    super()

    this.state = {
      activeItem: 'wallet',
      address: '1234567890',
      balance: 3
    }
  }

  handleItemClick (event, { name }) {
    this.setState({ activeItem: name })
  }

  sendTransaction (address, amount) {
    console.log('SEND MONEY !')
  }

  render() {
    return (
    <div style={{ padding: '15px' }}>
      <MenuBar handleItemClick={this.handleItemClick.bind(this)} activeItem={this.state.activeItem} />
      {this.state.activeItem === 'wallet'
        ? <Wallet sendTransaction={this.sendTransaction.bind(this)} address={this.state.address} balance={this.state.balance} />
        : <Vote />}
    </div>)
  }
}

export default App
