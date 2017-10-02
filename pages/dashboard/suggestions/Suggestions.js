import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import apolloClient from 'lib/initApollo'
import { hasStorage } from 'common/featureTests'
import { planIds } from 'common/constants'

import StatisticsContainer from 'components/statisticsContainer'
import StatisticsBox from 'components/statisticsContainer/StatisticsBox'
import Dashboard from '../'
import Suggestion from './Suggestion'

import { SuggestionsList } from './styles'

class Suggestions extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedPlan !== this.props.selectedPlan) {
            this.props.refetch({ id: planIds[nextProps.selectedPlan.toUpperCase()] })
        }
    }

    shouldComponentUpdate(nextProps) {
        // Only update if the selectedPlan and plan are the same.
        // if (nextProps.Plan) {
        //     return nextProps.selectedPlan === nextProps.Plan.name
        // }
        return true
    }

    render() {
        const { Plan, trades } = this.props
        // TODO return loader instead.
        if (!Plan || !Plan.suggestions) { return null }
        const suggestions = trades || Plan.suggestions.filter(sugg => !sugg.model || sugg.action === 'SELL')
        return (
            <Dashboard>
                <StatisticsContainer>
                    <StatisticsBox title="Annual growth" value={`${Plan.statistics.CAGR}%`} icon="chart-line" />
                    <StatisticsBox title="Sold with profit" value={`${Plan.statistics.winRatio.toFixed(2)}%`} icon="chart-pie" />
                    <StatisticsBox title="Suggestions" value={suggestions.length} icon="list-ul" />
                    <StatisticsBox title="Percent in cash" value={`${Plan.launchStatistics.percentInCash.toFixed(2)}%`} icon="dollar-sign" />
                </StatisticsContainer>
                <SuggestionsList>
                    {suggestions.map(sugg => <Suggestion suggestion={sugg} key={sugg.ticker} />)}
                </SuggestionsList>
            </Dashboard>
        )
    }
}

const SuggestionsQuery = gql`
  query SuggestionsQuery($id: ID!) {
    Plan(id: $id) {
        name
        suggestions
        launchStatistics
        statistics
    }
  }
`

Suggestions.propTypes = {
    Plan: PropTypes.object,
    trades: PropTypes.array,
    selectedPlan: PropTypes.string,
    refetch: PropTypes.func,
}

let selectedPlan = hasStorage && localStorage.getItem('selectedPlan') ? localStorage.getItem('selectedPlan') : 'entry'
if (apolloClient().store && apolloClient().store.getState().user.selectedPlan) {
    selectedPlan = apolloClient().store.getState().user.selectedPlan
}

export default graphql(SuggestionsQuery, {
    options: {
        variables: {
            id: planIds[selectedPlan.toUpperCase()],
        },
    },
    props: ({ data }) => ({ ...data }),
})(Suggestions)
