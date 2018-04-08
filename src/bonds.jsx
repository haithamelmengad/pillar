import React, { Component } from 'react'
import { Card, Form, Button, Divider, Loader, Statistic } from 'semantic-ui-react'

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
        <Statistic horizontal size='large' label='Bonds' value={this.props.bonds} />

      <Card fluid>
        <Card.Content>

          <h1>Buy bonds</h1>
          <Divider />

          {this.state.pending
            ? <Loader active inline='centered' />
            : <Form style={{fontSize: '20px'}} onSubmit={this.buyBond.bind(this)}>
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
