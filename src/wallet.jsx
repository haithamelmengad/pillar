import React, { Component } from 'react'
import { Card, Form, Button, Divider, Loader } from 'semantic-ui-react'

class Wallet extends Component {
  constructor () {
    super()

    this.state = {
      address: '',
      amount: 0,
      pending: false
    }
  }
  sendTransaction () {
    this.setState({pending: true})
    this.props.sendTransaction(this.state.address, this.state.amount)
      .then(() => {
        this.setState({pending: false, address: '', amount: 0})
      })
  }

  handleAddressChanged (event) {
    this.setState({address: event.target.value})
  }

  handleAmountChanged (event) {
    this.setState({amount: event.target.value})
  }

  render () {
    return (
      <div>
      <Card fluid style={{backgroundColor: '#0580BC', color: '#F8F8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card.Content>

          <h3> Address: {this.props.address} </h3> 
          <Divider />
          <h3> Balance:  {this.props.balance} IMR </h3>

        </Card.Content>
      </Card>
      <Card fluid style={{backgroundColor: '#0580BC', color: '#F8F8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card.Content>

          <h3>Send</h3>
          <Divider />

          {this.state.pending ? <Loader active inline='centered' /> : <Form onSubmit={this.sendTransaction.bind(this)}>
            <Form.Field>
              <label style={{color: '#F8F8FF', fontSize: '15px'}}>To</label>
              <input name='address' value={this.state.address} onChange={this.handleAddressChanged.bind(this)} placeholder='address' />
            </Form.Field>
            <Form.Field>
              <label style={{color: '#F8F8FF', fontSize: '15px'}}>Amount</label>
              <input name='amount' value={this.state.amount} onChange={this.handleAmountChanged.bind(this)} placeholder='amout' />
            </Form.Field>
            <Button type='submit' style={{color: '#F8F8FF', backgroundColor:'rgba(72,77,83,1)'}}>Submit</Button>          </Form>}
        </Card.Content>
      </Card>
    </div>
    )
  }
}

export default Wallet
