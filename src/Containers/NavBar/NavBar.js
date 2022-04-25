import React from 'react'
import {
  Nav,
  NavLink,
  Bars,
  NavMenu
} from './NavbarElements'

const NavBar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/">DashBoard</NavLink>
          <NavLink to="/vehicles">VehiclesList</NavLink>
        </NavMenu>
      </Nav>
    </>
  )
}

export default NavBar
