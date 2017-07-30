import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import { hydrate } from 'emotion'
import { planIds } from 'common/constants'

import NavBar from 'components/NavBar'
import Hero from './Hero'
import Introduction from './Introduction'
import WhatIsIt from './WhatIsIt'
import Performance from './Performance'
import PerformanceMatters from './PerformanceMatters'
import FirstMonthOnus from './FirstMonthOnUs'

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
    hydrate(window.__NEXT_DATA__.ids)
}

class Retail extends React.PureComponent {
    render() {
        const { data: { Plan } } = this.props
        return (
            <div>
                <NavBar />
                <Hero portfolioReturn={Plan.portfolioReturn} statistics={Plan.statistics} />
                <Introduction winRate={Plan.statistics.winRate} />
                <WhatIsIt />
                <Performance />
                <PerformanceMatters />
                <FirstMonthOnus />
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
