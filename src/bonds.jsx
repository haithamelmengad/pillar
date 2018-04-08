import React, { Component } from 'react'
import { Card, Form, Button, Divider, Loader } from 'semantic-ui-react'

class Bonds extends Component {
  constructor () {
    super()

    this.state = {
      amount: 0,
      pending: false
    }
  }

  handleAmountChanged (event) {
    this.setState({amount: event.target.value})
  }

  buyBond () {
    this.setState({pending: true})
    this.props.buyBond(this.state.amount)
      .then(() => {
        this.setState({pending: false, amount: 0})
      })
  }

  render () {
    return (
      <div>
        <h1>Bonds</h1>
      <Card fluid>
        <Card.Content>
          <b>Number of bonds :</b> {this.props.bonds} bonds
        </Card.Content>
      </Card>
      <Card fluid>
        <Card.Content>

          <h3>Buy bonds</h3>
          <Divider />

          {this.state.pending
            ? <Loader active inline='centered' />
            : <Form onSubmit={this.buyBond.bind(this)}>
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

export default Bonds
