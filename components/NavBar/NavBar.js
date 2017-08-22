import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import Logo from './logo_horizontal.svg'

import { NavLinks } from './styles'

const NavBar = ({ actions }) => (
    <AppBar position="fixed" color="default">
        <Toolbar>
            <Logo />
            <NavLinks>
                <Button color="primary" onClick={actions.toggleLoginModal}>Login</Button>
                <Button raised color="primary" onClick={actions.toggleSignupModal}>Sign up</Button>
            </NavLinks>
        </Toolbar>
    </AppBar>
)

NavBar.propTypes = {
    actions: PropTypes.object,
}

export default NavBar
