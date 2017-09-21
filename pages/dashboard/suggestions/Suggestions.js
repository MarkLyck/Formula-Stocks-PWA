import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import apolloClient from 'lib/initApollo'
import { hasStorage } from 'common/featureTests'

import { planIds } from 'common/constants'
import Dashboard from '../'
import Suggestion from './Suggestion'
import { SuggestionsList } from './styles'

class Suggestions extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedPlan !== this.props.selectedPlan) {
            this.props.refetch({ id: planIds[nextProps.selectedPlan.toUpperCase()] })
        }
    }

    render() {
        const { Plan, trades } = this.props
        // TODO return loader instead.
        if (!Plan || !Plan.suggestions) { return null }
        const suggestions = trades || Plan.suggestions.filter(sugg => !sugg.model || sugg.action === 'SELL')
        return (
            <Dashboard>
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
        suggestions
        info
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

let selectedPlan = hasStorage ? localStorage.getItem('selectedPlan') : 'entry'
if (apolloClient().store) selectedPlan = apolloClient().store.getState().user.selectedPlan

export default graphql(SuggestionsQuery, {
    options: {
        variables: {
            id: planIds[selectedPlan.toUpperCase()],
        },
    },
    props: ({ data }) => ({ ...data }),
})(Suggestions)
