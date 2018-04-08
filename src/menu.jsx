import React from 'react'
import { Menu } from 'semantic-ui-react'

const MenuBar = (props) => {
  return (
    <Menu pointing vertical style={{fontSize: '24px', height: '100vh', width: '13rem', backgroundColor:'rgba(72,77,83,0.7)' }}>
      <Menu.Item style={{backgroundColor: 'rgba(72,77,83,1)',  paddingBottom: '3vh', color: '#F8F8FF' }} name='wallet' active={props.activeItem === 'wallet'} onClick={props.handleItemClick} />
      <Menu.Item style={{backgroundColor: 'rgba(72,77,83,1)', color: '#F8F8FF' }} name='vote' active={props.activeItem === 'vote'} onClick={props.handleItemClick} />
      <Menu.Item style={{backgroundColor: 'rgba(72,77,83,1)', color: '#F8F8FF' }} name='bonds' active={props.activeItem === 'bonds'} onClick={props.handleItemClick} />
      <Menu.Item style={{backgroundColor: 'rgba(72,77,83,1)', color: '#F8F8FF' }} name='airdrop' active={props.activeItem === 'airdrop'} onClick={props.handleItemClick} />
      {/*<p style={{position: 'absolute', bottom: '55px', left: '40px'}}>
        Price: {props.finalPrice}
      </p>*/}
      <img  src='./img/Pillar.png' alt="fireSpot" style={{height:'30vh',position: 'absolute', bottom: '55px', left: '55px'}} />

    </Menu>
  )
}

export default MenuBar
