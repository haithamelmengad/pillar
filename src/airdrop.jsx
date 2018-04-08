import React, { Component } from 'react'
import { Card, Form, Button, Divider, Loader } from 'semantic-ui-react'

class Airdrop extends Component {
  constructor () {
    super()

    this.state = {
      pending: false
    }
  }

  submit () {

  }

  render () {
    return (
      <div>
      <Card fluid>
        <Card.Content>

          <b>Your address :</b> {this.props.marketcap}

        </Card.Content>
      </Card>
      <Card fluid>
        <Card.Content>

          <h3>Send</h3>
          <Divider />

          {this.state.pending ? <Loader active inline='centered' /> : <Form onSubmit={this.sendTransaction.bind(this)}>
            <Form.Field>
              <label>To</label>
              <input name='address' value={this.state.address} onChange={this.handleAddressChanged.bind(this)} placeholder='address' />
            </Form.Field>
            <Form.Field>
              <label>Amount</label>
              <input name='amount' value={this.state.amount} onChange={this.handleAmountChanged.bind(this)} placeholder='amout' />
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>}
        </Card.Content>
      </Card>
    </div>
    )
  }
}

export default Wallet
