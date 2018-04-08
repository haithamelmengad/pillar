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
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [0, 59, 80, 81, 56, 55, 40]
    }
  ]
}

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
        <Statistic horizontal size='large' label='Price' value={this.props.price} />
      <Card fluid>
        <Card.Content>
        <Line data={data} />
        </Card.Content>
      </Card>
      <Card fluid>
        <Card.Content>
          {this.state.pending ? <Loader active inline='centered' /> : <Form style={{fontSize: '20px'}} onSubmit={this.submitVote.bind(this)}>
            <Form.Field>
              <label>Stake</label>
              <input name='stake' value={this.state.stake} onChange={this.handleStakeChanged.bind(this)} placeholder='stake' />
            </Form.Field>
            <Form.Field>
              <label>Price</label>
              <input name='price' value={this.state.price} onChange={this.handlePriceChanged.bind(this)}  placeholder='price' />
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>}
        </Card.Content>
      </Card>
    </div> )
  }
}

export default Vote
