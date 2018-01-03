import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { hydrate } from 'emotion'
import { ThemeProvider } from 'emotion/react/theming'
import { gql, graphql } from 'react-apollo'
import Router from 'next/router'
import theme from 'common/theme'
import SideMenu from './sideMenu'
import NavBar from './navBar'
import { DashboardLayout, DashboardContent } from './styles'

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
    hydrate(window.__NEXT_DATA__.ids)
}

class Dashboard extends Component {
    componentWillMount() {
        if (Router.router && Router.route === '/dashboard') {
            Router.push('/dashboard/portfolio')
        }
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <DashboardLayout>
                    <SideMenu />
                    <DashboardContent>
                        <NavBar />
                        {this.props.children}
                    </DashboardContent>
                </DashboardLayout>
            </ThemeProvider>
        )
    }
}

Dashboard.propTypes = {
    children: PropTypes.node,
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
})(Dashboard)

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (entryPlan)
// export default Dashboard
