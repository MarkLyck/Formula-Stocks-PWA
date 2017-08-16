import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { gql, graphql } from 'react-apollo'
import { hydrate } from 'emotion'
import { planIds, marketIds } from 'common/constants'
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
        const { Plan, SP500, DJIA } = this.props
        console.log(SP500)
        const portfolioReturn = _.get(Plan, 'launchStatistics.total_return')
        const winRatio = _.get(Plan, 'statistics.winRatio')
        const avgGain = _.get(Plan, 'info.avgGainPerPosition')
        const avgLoss = _.get(Plan, 'info.avgLossPerPosition')

        return (
            <div>
                <NavBar />
                <Hero portfolioReturn={portfolioReturn} winRatio={winRatio} />
                <Introduction portfolioReturn={portfolioReturn} winRatio={winRatio} planName={Plan.name} />
                <WhatIsIt />
                <Performance portfolioYields={Plan.portfolioYields} marketPrices={DJIA.pricesSince2009} planName={Plan.name} />
                <PerformanceMatters />
                <FirstMonthOnus />
                <WhatToExpect latestSells={Plan.latestSells} />
                <PilotProgram />
                <BacktestedPerformance backtestedData={Plan.backtestedData} marketPrices={SP500.longtermPrices} planName={Plan.name} />
                <Statistics winRatio={winRatio} planName={Plan.name} avgGain={avgGain} avgLoss={avgLoss} />
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
      info
      price
      portfolioYields
      launchStatistics
      latestSells
      statistics
    },
    SP500: Market(id: "${marketIds.SP500}") {
        name
        pricesSince2009
        longtermPrices
    }
    DJIA: Market(id: "${marketIds.DJIA}") {
        name
        pricesSince2009
    }
  }
`

Retail.defaultProps = {
    Plan: {},
    SP500: {},
    DJIA: {},
}

Retail.propTypes = {
    Plan: PropTypes.object,
    SP500: PropTypes.object,
    DJIA: PropTypes.object,
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (entryPlan)
export default graphql(entryPlan, {
    props: ({ data }) => ({ Plan: data.Plan, SP500: data.SP500, DJIA: data.DJIA }),
})(withMaterial(Retail))

// export default Retail
