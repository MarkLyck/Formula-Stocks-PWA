import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import { planIds, marketIds } from 'common/constants'

import Dashboard from '../Dashboard'
import PortfolioHeader from './PortfolioHeader'
import AnnualReturns from './AnnualReturns'
import Holdings from './Holdings'

const Portfolio = ({ Plan, DJIA }) => {
    if (!Plan) { return null }
    return (
        <Dashboard>
            <div>
                <PortfolioHeader
                    portfolioYields={Plan.portfolioYields}
                    marketPrices={DJIA.pricesSince2009}
                    portfolio={Plan.portfolio}
                    planName={Plan.name}
                />
                <AnnualReturns portfolioYields={Plan.portfolioYields} />
                <Holdings portfolio={Plan.portfolio} />
            </div>
        </Dashboard>
    )
}

const Plan = gql`
  query {
    Plan(id: "${planIds.BUSINESS}") {
      name
      portfolio
      info
      launchStatistics
      statistics
      portfolioYields
    },
    DJIA: Market(id: "${marketIds.DJIA}") {
        name
        pricesSince2009
    }
  }
`

Portfolio.propTypes = {
    Plan: PropTypes.object,
    DJIA: PropTypes.object,
}

export default graphql(Plan, {
    props: ({ data }) => ({ Plan: data.Plan, DJIA: data.DJIA }),
})(Portfolio)
