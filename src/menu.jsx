import React from 'react'
import { Menu } from 'semantic-ui-react'

const MenuBar = (props) => {
  return (
    <Menu pointing secondary>
      <Menu.Item name='wallet' active={props.activeItem === 'wallet'} onClick={props.handleItemClick} />
      <Menu.Item name='vote' active={props.activeItem === 'vote'} onClick={props.handleItemClick} />
      <Menu.Item name='bonds' active={props.activeItem === 'bonds'} onClick={props.handleItemClick} />
    </Menu>
  )
}

export default MenuBar
