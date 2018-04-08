import React from 'react'
import { Line } from 'react-chartjs-2'
import { Card, Form, Button, Divider, Loader } from 'semantic-ui-react'

const Vote = (props) => {
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

  return (
    <div>
    <Card fluid>
      <Card.Content>
      <Line data={data} />
      </Card.Content>
    </Card>
    <Card fluid>
      <Card.Content>
        <Form>
        <Form style={{fontSize: '20px'}}>
          <Form.Field>
            <label>Stake</label>
            <input name='stake' placeholder='stake' />
          </Form.Field>
          <Form.Field>
            <label>Price</label>
            <input name='price' placeholder='price' />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
        </Form>
      </Card.Content>
    </Card>

  </div>  )
}

export default Vote
