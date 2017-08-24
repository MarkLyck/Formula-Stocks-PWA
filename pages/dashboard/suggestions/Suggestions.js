import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import { planIds } from 'common/constants'
import Dashboard from '../'
import Suggestion from './Suggestion'
import { SuggestionsList } from './styles'

const Suggestions = ({ Plan }) => {
    // TODO return loader instead.
    if (!Plan) { return null }
    console.log(Plan)
    return (
        <Dashboard>
            <SuggestionsList>
                {Plan.suggestions.map(sugg => <Suggestion suggestion={sugg} key={sugg.name} />)}
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
}

export default graphql(Plan, {
    props: ({ data }) => ({ Plan: data.Plan }),
})(Suggestions)
