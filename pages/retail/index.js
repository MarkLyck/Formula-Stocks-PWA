import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { gql, graphql } from 'react-apollo'
import { hydrate } from 'emotion'
import { planIds } from 'common/constants'
import withMaterial from 'lib/withMaterial'

import NavBar from 'components/NavBar'
import Hero from './Hero'
import Introduction from './Introduction'
import WhatIsIt from './WhatIsIt'
import Performance from './Performance'
import PerformanceMatters from './PerformanceMatters'
import FirstMonthOnus from './FirstMonthOnUs'
import WhatToExpect from './WhatToExpect'
import PilotProgram from './PilotProgram'
import BacktestedPerformance from './BacktestedPerformance'
import Statistics from './Statistics'
import HowWeBeatTheMarket from './HowWeBeatTheMarket'
import RiskManagement from './RiskManagement'
import CorporateProfile from './CorporateProfile'
import IntendedAudience from './IntendedAudience'
import ScrolledToBottom from './ScrolledToBottom'
import Footer from './Footer'

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
                <WhatToExpect latestSells={Plan.latestSells} />
                <PilotProgram />
                <BacktestedPerformance backtestedData={Plan.backtestedData} SP500={[]} planName={Plan.name} />
                <Statistics />
                <HowWeBeatTheMarket />
                <RiskManagement />
                <CorporateProfile />
                <IntendedAudience />
                <ScrolledToBottom />
                <Footer />
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
      latestSells
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
})(withMaterial(Retail))

// export default Retail
