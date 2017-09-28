import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import apolloClient from 'lib/initApollo'
import { planIds, marketIds } from 'common/constants'
import { hasStorage } from 'common/featureTests'

import StatisticsContainer from 'components/statisticsContainer'
import StatisticsBox from 'components/statisticsContainer/StatisticsBox'
import Dashboard from '../'
import PortfolioHeader from './PortfolioHeader'
import AnnualReturns from './AnnualReturns'
import Holdings from './Holdings'

class Portfolio extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedPlan && nextProps.selectedPlan !== this.props.selectedPlan) {
            this.props.refetch({ id: planIds[nextProps.selectedPlan.toUpperCase()] })
        }
    }

    shouldComponentUpdate(nextProps) {
        // Only update if the selectedPlan and plan are the same.
        return nextProps.selectedPlan === nextProps.Plan.name
    }

    render() {
        const { Plan, DJIA } = this.props
        // TODO return spinner here
        if (!Plan) return ''
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
                    <StatisticsContainer>
                        <StatisticsBox title="Annual growth" value={`${Plan.statistics.CAGR}%`} icon="chart-line" />
                        <StatisticsBox title="Sold with profit" value={`${Plan.statistics.winRatio.toFixed(2)}%`} icon="chart-pie" />
                        <StatisticsBox title="Portfolio" value={Plan.portfolio.length} icon="list-ul" />
                        <StatisticsBox title="Percent in cash" value={`${Plan.launchStatistics.percentInCash.toFixed(2)}%`} icon="dollar-sign" />
                    </StatisticsContainer>
                </div>
            </Dashboard>
        )
    }
}

const PortfolioQuery = gql`
  query PortfolioQuery($id: ID!) {
    Plan(id: $id) {
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
    selectedPlan: PropTypes.string,
    refetch: PropTypes.func,
}

let selectedPlan = (hasStorage && localStorage.getItem('selectedPlan')) ? localStorage.getItem('selectedPlan') : 'entry'
if (hasStorage) {
    console.log(hasStorage, localStorage.getItem('selectedPlan'))
}

if (apolloClient().store) selectedPlan = apolloClient().store.getState().user.selectedPlan
console.log(selectedPlan)
console.log('apollo')


export default graphql(PortfolioQuery, {
    options: {
        variables: { id: planIds[selectedPlan.toUpperCase()] },
    },
    props: ({ data }) => ({ ...data }),
})(Portfolio)
