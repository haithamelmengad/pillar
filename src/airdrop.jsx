import React, { Component } from 'react'
import { Card, Form, Button, Divider, Loader, Statistic } from 'semantic-ui-react'

class Airdrop extends Component {
  constructor () {
    super()

    this.state = {
      pending: false
    }
  }

  submit () {
    this.props.airdrop()
  }

  render () {
    return (
      <div>

        <Statistic horizontal className='inverted' size='large' label='Circulating supply ' value={this.props.supply} />


      <Card fluid style={{backgroundColor: '#0580BC', color: '#F8F8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card.Content>
          {this.state.pending ? <Loader active inline='centered' /> : <Form onSubmit={this.submit.bind(this)}>
          <Button type='submit' style={{color: '#F8F8FF', backgroundColor:'rgba(72,77,83,1)'}}>Participate</Button>
          </Form>}
        </Card.Content>
      </Card>
    </div>
    )
  }
}

export default Airdrop
