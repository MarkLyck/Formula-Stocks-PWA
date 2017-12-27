import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
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

const NavBar = ({ actions, loggedInUser }) => (
    <AppBar position="fixed" color="default">
        <Toolbar>
            <Logo />
            {(loggedInUser.loggedInUser && loggedInUser.loggedInUser.id !== null)
                ? renderLoggedInLinks(actions)
                : renderLoggedOutLinks(actions)
            }
        </Toolbar>
    </AppBar>
)

NavBar.propTypes = {
    actions: PropTypes.object,
    loggedInUser: PropTypes.object,
}

const LOGGED_IN_USER = gql`
  query LoggedInUser {
    loggedInUser {
      id
    }
  }
`

export default graphql(LOGGED_IN_USER, {
    name: 'loggedInUser',
    options: { fetchPolicy: 'network-only' },
})(NavBar)
