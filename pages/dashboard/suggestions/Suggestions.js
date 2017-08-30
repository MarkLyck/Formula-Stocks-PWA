import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import { planIds } from 'common/constants'
import Dashboard from '../'
import Suggestion from './Suggestion'
import { SuggestionsList } from './styles'

const Suggestions = ({ Plan, trades }) => {
    // TODO return loader instead.
    if (!Plan || !Plan.suggestions) { return null }
    const suggestions = trades || Plan.suggestions
    return (
        <Dashboard>
            <SuggestionsList>
                {suggestions.map(sugg => <Suggestion suggestion={sugg} key={sugg.name} />)}
            </SuggestionsList>
        </Dashboard>
    )
}

const Plan = gql`
  query {
    Plan(id: "${planIds.ENTRY}") {
      suggestions
      info
      launchStatistics
      statistics
    },
  }
`

Suggestions.propTypes = {
    Plan: PropTypes.object,
    trades: PropTypes.array,
}

export default graphql(Plan, {
    props: ({ data }) => ({ Plan: data.Plan }),
})(Suggestions)
