import React from 'react'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import Logo from './logo_horizontal.svg'

import { NavLinks } from './styles'

const NavBar = () => (
    <AppBar position="fixed" color="default">
        <Toolbar>
            <Logo />
            <NavLinks>
                <Button color="primary">Login</Button>
                <Button raised color="primary">Sign up</Button>
            </NavLinks>
        </Toolbar>
    </AppBar>
)

export default NavBar
