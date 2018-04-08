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
  ]
  }
  return (
    <div>
    <Card fluid style={{backgroundColor: '#F8F8FF'}}>
      <Card.Content>
      <Line data={data} />
      </Card.Content>
    </Card>
    <Card fluid style={{backgroundColor: '#0580BC', color: '#F8F8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card.Content>
        <Form>
        <h3>Vote</h3>
        <Divider/>
        <Form style={{fontSize: '15px'}}>
          <Form.Field>
            <label style={{color: 'Ghostwhite'}}>Stake</label>
            <input name='stake' placeholder='stake' />
          </Form.Field>
          <Form.Field>
            <label style={{color: 'Ghostwhite'}}>Price</label>
            <input name='price' placeholder='price' />
          </Form.Field>
          <Button type='submit' style={{color: '#F8F8FF', backgroundColor:'rgba(72,77,83,1)'}}>Submit</Button>
        </Form>
        </Form>
      </Card.Content>
    </Card>

  </div>  )
}

export default Vote
