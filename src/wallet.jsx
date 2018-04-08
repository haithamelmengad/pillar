import React from 'react'
import { Card, Form, Button, Divider } from 'semantic-ui-react'

const Wallet = (props) => {
  return (
    <div>
      <h1>Wallet</h1>
    <Card fluid>
      <Card.Content>

        <b>Your address :</b> {props.address}
        <br />
        <b>Your balance :</b> {props.balance} IMR

      </Card.Content>
    </Card>
    <Card fluid>
      <Card.Content>

        <h3>Send</h3>
        <Divider />

        <Form>
          <Form.Field>
            <label>To</label>
            <input placeholder='address' />
          </Form.Field>
          <Form.Field>
            <label>Amount</label>
            <input placeholder='amout' />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </Card.Content>
    </Card>
  </div>
  )
}

export default Wallet
