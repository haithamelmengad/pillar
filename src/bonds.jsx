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
        <Statistic horizontal className='inverted' size='large' label='Bonds owned' value={this.props.bonds} />

      <Card fluid style={{backgroundColor: '#0580BC', color: '#F8F8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card.Content>

          <h3>Buy bonds</h3>
          <Divider />

          {this.state.pending
            ? <Loader active inline='centered' />
            : <Form style={{fontSize: '20px'}} onSubmit={this.buyBond.bind(this)}>
              <Form.Field>
                <label style = {{color: '#F8F8FF', fontSize: '15px' }}>Amount</label>
                <input name='amount' value={this.state.amount} onChange={this.handleAmountChanged.bind(this)} placeholder='amout' />
              </Form.Field>
              <Button type='submit' style={{color: '#F8F8FF', backgroundColor:'rgba(72,77,83,1)'}}>Submit</Button>
          </Form>}

        </Card.Content>
      </Card>
    </div>
    )
  }

}

export default Bonds
