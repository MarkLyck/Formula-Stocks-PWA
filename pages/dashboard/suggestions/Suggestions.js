import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import { planIds } from 'common/constants'
import withMaterial from 'lib/withMaterial'
import Suggestion from './Suggestion'

const Suggestions = ({ Plan }) => {
    console.log(Plan)
    return (
        <div>
            <p>suggestions</p>
            <ul>
                {Plan.suggestions.map(sugg => (
                    <Suggestion suggestion={sugg} />
                ))}
            </ul>
        </div>
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
})(withMaterial(Suggestions))

// export default Suggestions
