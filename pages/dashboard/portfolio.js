import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import apolloClient from 'lib/initApollo'
import withMaterial from 'lib/withMaterial'
import withData from 'lib/withData'
import { planIds, marketIds } from 'common/constants'
import { hasStorage } from 'common/featureTests'

import Dashboard from 'components/Dashboard'
import StatisticsContainer from 'components/statisticsContainer'
import StatisticsBox from 'components/statisticsContainer/StatisticsBox'
import PortfolioHeader from 'components/Dashboard/portfolio/PortfolioHeader'
import AnnualReturns from 'components/Dashboard/portfolio/AnnualReturns'
import Holdings from 'components/Dashboard/portfolio/Holdings'
import { PortfolioContainer } from 'components/Dashboard/portfolio/styles'

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
                <PortfolioContainer>
                    <PortfolioHeader
                        portfolioYields={Plan.portfolioYields}
                        marketPrices={DJIA.pricesSince2009}
                        portfolio={Plan.portfolio}
                        planName={Plan.name}
                    />
                    <AnnualReturns portfolioYields={Plan.portfolioYields} />
                    <Holdings portfolio={Plan.portfolio} />
                </PortfolioContainer>
                <StatisticsContainer>
                    <StatisticsBox title="Annual growth" value={`${Plan.statistics.CAGR}%`} icon="chart-line" />
                    <StatisticsBox title="Sold with profit" value={`${Plan.statistics.winRatio.toFixed(2)}%`} icon="chart-pie" />
                    <StatisticsBox title="Portfolio" value={Plan.portfolio.length} icon="list-ul" />
                    <StatisticsBox title="Percent in cash" value={`${Plan.launchStatistics.percentInCash.toFixed(2)}%`} icon="dollar-sign" />
                </StatisticsContainer>
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

let selectedPlan = hasStorage && localStorage.getItem('selectedPlan') ? localStorage.getItem('selectedPlan') : 'entry'
if (apolloClient().store && apolloClient().store.getState().user.selectedPlan) {
    selectedPlan = apolloClient().store.getState().user.selectedPlan
}

const mapStateToProps = state => ({ selectedPlan: state.user.selectedPlan })

const connectedPortfolio = connect(mapStateToProps, null)(Portfolio)

export default withData(withMaterial(graphql(PortfolioQuery, {
    options: {
        variables: { id: planIds[selectedPlan.toUpperCase()] },
    },
    props: ({ data }) => ({ ...data }),
})(connectedPortfolio)))
