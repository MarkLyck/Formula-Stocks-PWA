import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import { hydrate } from 'emotion'
import withData from 'lib/withData'
import FileUploader from './FileUploader'

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
    hydrate(window.__NEXT_DATA__.ids)
}

const Dashboard = ({ Plans }) => (
    <div>
        <p>Dashboard</p>
        <FileUploader Plans={Plans} />
    </div>
)

const Plans = gql`
  query {
    allPlans {
      id
      backtestedData
      latestSells
      name
      portfolio
      portfolioYields
      price
      statistics
      suggestions
      updatedAt
    },
  }
`

Dashboard.defaultProps = {
    Plans: [],
}

Dashboard.propTypes = {
    Plans: PropTypes.array,
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (entryPlan)
export default withData(graphql(Plans, {
    props: ({ data }) => ({
        Plans: data.allPlans,
    }),
})(Dashboard))
