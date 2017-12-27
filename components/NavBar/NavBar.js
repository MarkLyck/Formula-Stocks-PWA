import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import { hasStorage } from 'common/featureTests'
import AppBar from 'material-ui/AppBar'
import Router from 'next/router'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import Logo from './logo_horizontal.svg'

import { NavLinks } from './styles'

class NavBar extends Component {
    state = { loggedIn: (hasStorage && localStorage.getItem('graphcoolToken')) }

    logout = () => {
        if (hasStorage) localStorage.removeItem('graphcoolToken')
        this.setState({ loggedIn: false })
    }

    renderLoggedOutLinks = actions => (
        <NavLinks>
            <Button color="primary" onClick={actions.toggleLoginModal}>Login</Button>
            <Button raised color="primary" onClick={actions.toggleSignupModal}>Sign up</Button>
        </NavLinks>
    )

    renderLoggedInLinks = () => (
        <NavLinks>
            <Button raised color="primary" onClick={() => Router.push('/dashboard/portfolio')}>Dashboard</Button>
            <Button color="primary" onClick={() => this.logout()}>Log out</Button>
        </NavLinks>
    )

    render() {
        const { loggedIn } = this.state
        const { actions } = this.props
        return (
            <AppBar position="fixed" color="default">
                <Toolbar>
                    <Logo />
                    {(loggedIn) ? this.renderLoggedInLinks(actions) : this.renderLoggedOutLinks(actions)}
                </Toolbar>
            </AppBar>
        )
    }
}

NavBar.propTypes = {
    actions: PropTypes.object,
}

const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
    }
  }
`

export default graphql(LOGGED_IN_USER_QUERY, {
    name: 'LoggedInUserQuery',
    options: { fetchPolicy: 'network-only' },
})(NavBar)
