import React, { Component } from 'react'
import { connect } from 'lotion'
import coins from 'coins'
import { randomBytes } from 'crypto'
import axios from 'axios'
import { Dimmer, Loader, Container, Grid } from 'semantic-ui-react'
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
      finalPrice: 0,
      connected: false
    }
  }

  componentDidMount () {
      this.getMyState()
        .then(async (client) => {
          var wallets = await client.state.wallets
          console.log(await client.state)
          var walletsMap = new Map()
          var address = 'ting'
          var balance = wallets.ting.balance
          var bonds = wallets.ting.bonds || 0
          var finalPrice = await client.state.finalPrice
          this.setState({connected: true, client: client, address: address, balance: balance, bonds: bonds, finalPrice: finalPrice})
        })
  }

  async getMyState () {
    console.log(this.props.gci)
    let { state, send } = await connect(this.props.gci)
    return {state, send}
  }

  handleItemClick (event, { name }) {
    this.setState({ activeItem: name })
  }

  sendTransaction (address, amount) {
    return new Promise ((resolve, reject) => {
      this.state.client.send({
        from: [
            // tx inputs. each must include an amount:
            {amount: Number(amount), type: 'coin', senderAddress: 'ting'}
        ],
        to: [
            // tx outputs. sum of amounts must equal sum of amounts of inputs.
            {amount: Number(amount), type: 'coin', receiverAddress: address}
        ]
      })
      .then(async (result) => {
        await this.getMyState()
          .then(async (client) => {
            var wallets = await client.state.wallets
            var walletsMap = new Map()
            var address = 'ting'
            var balance = wallets.ting.balance
            var bonds = wallets.ting.bonds || 0
            var finalPrice = await client.state.finalPrice
            this.setState({connected: true, client: client, address: address, balance: balance, bonds: bonds,finalPrice: finalPrice })
            resolve()
          })
      })
    })
  }

  buyBond (amount) {
    console.log('BUY BOND !')
    console.log('Amount :', amount)
    return new Promise ((resolve, reject) => {
      this.state.client.send({
        from: [
            // tx inputs. each must include an amount:
            {amount: Number(amount), type: 'bonds', senderAddress: 'ting'}
        ],
        to: [
            // tx outputs. sum of amounts must equal sum of amounts of inputs.
            {amount: Number(amount), type: 'bonds', receiverAddress: ''}
        ]
      })
      .then(async (result) => {
        await this.getMyState()
          .then(async (client) => {
            var wallets = await client.state.wallets
            var walletsMap = new Map()
            var address = 'ting'
            var balance = wallets.ting.balance
            var bonds = wallets.ting.bonds || 0
            console.log(await client.state)
            var finalPrice = await client.state.finalPrice
            this.setState({connected: true, client: client, address: address, balance: balance, bonds: bonds, finalPrice: finalPrice })
            resolve()
          })
      })    })
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

  render () {
    return (
    this.state.connected ? <Grid style={{ padding: '15px', fontSize: '18px' }}>
      <Grid.Column width={4}>
        <MenuBar handleItemClick={this.handleItemClick.bind(this)} activeItem={this.state.activeItem} finalPrice={this.state.finalPrice} />
      </Grid.Column>
      <Grid.Column  width={12}>
         {this.getView()}
      </Grid.Column>
    </Grid> : <Dimmer active><Loader indeterminate>Connecting</Loader></Dimmer> )
  }
}

export default App
