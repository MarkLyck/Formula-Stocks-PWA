import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import { planIds } from 'common/constants'
import Dashboard from '../'
import Suggestions from '../suggestions'

const Trades = ({ Plan }) => {
    // TODO return loader instead.
    if (!Plan) { return null }
    return (
        <Dashboard>
            <Suggestions trades={Plan.suggestions.filter(sugg => sugg.model)} />
        </Dashboard>
    )
}

const Plan = gql`
  query {
    Plan(id: "${planIds.ENTRY}") {
      suggestions
    },
  }
`

Trades.propTypes = {
    Plan: PropTypes.object,
}

export default graphql(Plan, {
    props: ({ data }) => ({ Plan: data.Plan }),
})(Trades)
