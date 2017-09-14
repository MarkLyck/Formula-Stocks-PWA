import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleSignupModal, toggleLoginModal } from 'models/ui/actions'
import { gql, graphql } from 'react-apollo'
import { hydrate } from 'emotion'
import withMaterial from 'lib/withMaterial'
import { planIds, marketIds } from 'common/constants'

import Retail from './Retail'

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
    hydrate(window.__NEXT_DATA__.ids)
}

const entryPlan = gql`
  query {
    Plan(id: "${planIds.ENTRY}") {
      name
      backtestedData
      info
      price
      portfolioYields
      launchStatistics
      latestSells
      statistics
    },
    SP500: Market(id: "${marketIds.SP500}") {
        name
        pricesSince2009
        longtermPrices
    }
    DJIA: Market(id: "${marketIds.DJIA}") {
        name
        pricesSince2009
    }
  }
`

const mapStateToProps = state => state
const mapDispatchToProps = (dispatch) => {
    const actions = { toggleSignupModal, toggleLoginModal }
    return { actions: bindActionCreators(actions, dispatch) }
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (entryPlan)
export default graphql(entryPlan, {
    props: ({ data }) => ({ Plan: data.Plan, SP500: data.SP500, DJIA: data.DJIA }),
})(withMaterial(connect(mapStateToProps, mapDispatchToProps)(Retail)))
