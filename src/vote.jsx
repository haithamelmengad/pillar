import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import { Card, Form, Button, Divider, Loader, Statistic } from 'semantic-ui-react'


const data = {
  labels: [0.7,0.8,0.9,1,1.1,1.2,1.3],
    datasets: [
      {
        label: 'Price',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(5, 128, 188, 0.7)',
        borderColor: 'rgba(5, 169, 188, 0.9))',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(5, 169, 188, 0.6)',
        pointHoverBorderColor: 'rgba(5, 169, 188, 0.6)',
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
        data: [0, 59, 80, 81, 56, 55, 40]
    }
  ]}

class Vote extends Component {
  constructor () {
    super()

    this.state = {
      stake: 0,
      price: 0,
      pending: false
    }
  }

  handleStakeChanged (event) {
    this.setState({stake: event.target.value})
  }

  handlePriceChanged (event) {
    this.setState({price: event.target.value})
  }

  submitVote () {
    this.setState({pending: true})
    this.props.vote(this.state.stake, this.state.price)
      .then(() => {
        this.setState({pending: false, stake:0, price:0 })
      })
  }

  render () {
    return (
      <div>
        <Statistic horizontal inverted size='large' label='Price' value={this.props.price} />
      <Card fluid style={{backgroundColor: '#F8F8FF'}}>
        <Card.Content>
        <Line data={data} />
        </Card.Content>
      </Card>
      <Card fluid style={{backgroundColor: '#0580BC', color: '#F8F8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card.Content>
          {this.state.pending ? <Loader active inline='centered' /> : <Form style={{fontSize: '15px'}} onSubmit={this.submitVote.bind(this)}>
            <Form.Field>
              <label style={{color: 'Ghostwhite'}}>Stake</label>
              <input name='stake' value={this.state.stake} onChange={this.handleStakeChanged.bind(this)} placeholder='stake' />
            </Form.Field>
            <Form.Field>
              <label style={{color: 'Ghostwhite'}}>Price</label>
              <input name='price' value={this.state.price} onChange={this.handlePriceChanged.bind(this)}  placeholder='price' />
            </Form.Field>
            <Button type='submit' style={{color: '#F8F8FF', backgroundColor:'rgba(72,77,83,1)'}}>Submit</Button>
          </Form>}
        </Card.Content>
      </Card>
    </div> )
  }
}

export default Vote
