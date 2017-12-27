import React from 'react'
import PropTypes from 'prop-types'
import { hasStorage } from 'common/featureTests'
import AppBar from 'material-ui/AppBar'
import Router from 'next/router'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import Logo from './logo_horizontal.svg'

import { NavLinks } from './styles'

const renderLoggedOutLinks = actions => (
    <NavLinks>
        <Button color="primary" onClick={actions.toggleLoginModal}>Login</Button>
        <Button raised color="primary" onClick={actions.toggleSignupModal}>Sign up</Button>
    </NavLinks>
)

const renderLoggedInLinks = actions => (
    <NavLinks>
        <Button raised color="primary" onClick={() => Router.push('/dashboard/portfolio')}>Dashboard</Button>
        <Button color="primary" onClick={actions.logOut}>Log out</Button>
    </NavLinks>
)

const NavBar = ({ actions }) => (
    <AppBar position="fixed" color="default">
        <Toolbar>
            <Logo />
            {(hasStorage && localStorage.graphcoolToken)
                ? renderLoggedInLinks(actions)
                : renderLoggedOutLinks(actions)
            }
        </Toolbar>
    </AppBar>
)

NavBar.propTypes = {
    actions: PropTypes.object,
}

export default NavBar
