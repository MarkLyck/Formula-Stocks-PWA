import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import Link from 'next/link'
import { hydrate } from 'emotion'
import { planIds } from 'common/constants'

import NavBar from 'components/NavBar'
import Hero from './Hero'

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
    hydrate(window.__NEXT_DATA__.ids)
    console.log('HYDRATE')
}

class Retail extends React.PureComponent {
    render() {
        const { data: { Plan } } = this.props
        console.log(Plan)
        return (
            <div>
                <NavBar />
                <Hero portfolioReturn={Plan.portfolioReturn} statistics={Plan.statistics} />
                <Link href="/dashboard">
                    <a>Dashboard</a>
                </Link>
            </div>
        )
    }
}

const entryPlan = gql`
  query {
    Plan(id: "${planIds.ENTRY}") {
      name
      backtestedData
      price
      portfolioReturn
      portfolioYields
      statistics
    },
  }
`

Retail.defaultProps = {
    data: {
        Plan: {},
    },
}

Retail.propTypes = {
    data: PropTypes.object,
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (entryPlan)
export default graphql(entryPlan, {
    props: ({ data }) => ({
        data,
    }),
})(Retail)
