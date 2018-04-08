import React from 'react'
import { Menu } from 'semantic-ui-react'

const MenuBar = (props) => {
  return (
    <Menu pointing vertical style={{fontSize: '24px', height: '90vh', width: '13rem'}}>
      <Menu.Item name='wallet' active={props.activeItem === 'wallet'} onClick={props.handleItemClick} />
      <Menu.Item name='bonds' active={props.activeItem === 'bonds'} onClick={props.handleItemClick} />
      <Menu.Item name='vote' active={props.activeItem === 'vote'} onClick={props.handleItemClick} />
      {/*<p style={{position: 'absolute', bottom: '55px', left: '40px'}}>
        Price: {props.finalPrice}
      </p>*/}
    </Menu>
  )
}

export default MenuBar
