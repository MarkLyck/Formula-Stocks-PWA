import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import { hydrate } from 'emotion'
import { planIds } from 'common/constants'
import withData from 'lib/withData'
import FileUploader from './FileUploader'


// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
    hydrate(window.__NEXT_DATA__.ids)
}

const Dashboard = (props) => {
    console.log(props)
    return (
        <div>
            <p>Dashboard</p>
            <FileUploader />
        </div>
    )
}

const entryPlan = gql`
  query {
    Plan(id: "${planIds.ENTRY}") {
      name
      backtestedData
      price
      portfolioReturn
      portfolioYields
      statistics
    },
  }
`

Dashboard.defaultProps = {
    data: {
        Plan: {},
    },
}

Dashboard.propTypes = {
    data: PropTypes.object,
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (entryPlan)
export default withData(graphql(entryPlan, {
    props: ({ data }) => ({
        data,
    }),
})(Dashboard))
