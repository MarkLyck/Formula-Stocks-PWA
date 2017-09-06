import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import { hydrate } from 'emotion'
import withMaterial from 'lib/withMaterial'
import { ThemeProvider } from 'emotion/react/theming'
import theme from 'common/theme'
import SideMenu from './SideMenu'
import NavBar from './NavBar'
import { DashboardLayout, DashboardContent } from './styles'

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
    hydrate(window.__NEXT_DATA__.ids)
}

const Dashboard = ({ children }) => (
    <ThemeProvider theme={theme}>
        <DashboardLayout>
            <SideMenu />
            <DashboardContent>
                <NavBar />
                {children}
            </DashboardContent>
        </DashboardLayout>
    </ThemeProvider>
)

const Plans = gql`
  query {
    allPlans {
      id
      backtestedData
      latestSells
      name
      portfolio
      portfolioYields
      price
      statistics
      suggestions
      updatedAt
    },
  }
`

Dashboard.propTypes = {
    children: PropTypes.node,
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (entryPlan)
export default withMaterial(graphql(Plans, {
    props: ({ data }) => ({
        Plans: data.allPlans,
    }),
})(Dashboard))
