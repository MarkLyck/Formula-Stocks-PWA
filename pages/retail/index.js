import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
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
        const { Plan } = this.props
        console.log(Plan)
        const portfolioReturn = _.get(Plan, 'launchStatistics.total_return')
        const winRatio = _.get(Plan, 'statistics.winRatio')
        return (
            <div>
                <NavBar />
                <Hero portfolioReturn={portfolioReturn} winRatio={winRatio} />
                <Introduction portfolioReturn={portfolioReturn} winRatio={winRatio} planName={Plan.name} />
                <WhatIsIt />
                <Performance portfolioYields={Plan.portfolioYields} DJIA={[]} planName={Plan.name} />
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
      portfolioYields
      launchStatistics
      statistics
    },
  }
`

Retail.defaultProps = {
    Plan: {},
}

Retail.propTypes = {
    Plan: PropTypes.object,
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (entryPlan)
export default graphql(entryPlan, {
    props: ({ data }) => ({
        Plan: data.Plan,
    }),
})(Retail)
