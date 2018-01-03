import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql, compose } from 'react-apollo'
import withMaterial from 'lib/withMaterial'
import withData from 'lib/withData'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Paper from 'material-ui/Paper'
import Dashboard from 'components/Dashboard'
import { FileDrop, containerStyles } from 'components/Dashboard/admin/api/styles'
import { updatePlan } from 'components/Dashboard/admin/api/actions'
import JSONIcon from '../../../static/icons/json_icon.svg'


class API extends Component {
    acceptedFilenames = [
        'annual_basic.json',
        'annual_entry.json',
        'annual_premium.json',
        'annual_business.json',
        'annual_fund.json',
        'monthly_basic.json',
        'monthly_entry.json',
        'monthly_premium.json',
        'monthly_business.json',
        'monthly_fund.json',
        'weekly_basic.json',
        'weekly_entry.json',
        'weekly_premium.json',
        'weekly_business.json',
        'weekly_fund.json',
    ]

    onDrop = (files) => {
        const { actions, mutatePlan, allPlans } = this.props

        const badFiles = files.filter(file => this.acceptedFilenames.indexOf(file.name) === -1)
        if (!badFiles.length) { actions.updatePlan(files, mutatePlan, allPlans) }
        return null
    }

    render() {
        return (
            <Dashboard>
                <Paper style={containerStyles}>
                    <h2>Upload JSON files</h2>
                    <FileDrop onDrop={this.onDrop} accept="application/json">
                        <h3>Drag and drop JSON files here</h3>
                        <JSONIcon />
                    </FileDrop>
                </Paper>
            </Dashboard>
        )
    }
}

API.defaultProps = {
    allPlans: [],
}

API.propTypes = {
    actions: PropTypes.object.isRequired,
    mutatePlan: PropTypes.func.isRequired,
    allPlans: PropTypes.array,
}

const PlansQuery = gql`
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

const updatePlanQuery = gql`
  mutation updatePlan(
      $id: ID!,
      $backtestedData: Json,
      $latestSells: Json,
      $portfolio: Json,
      $portfolioYields: Json,
      $statistics: Json,,
      $launchStatistics: Json,,
      $suggestions: Json,
  ) {
    updatePlan(
        id: $id,
        backtestedData: $backtestedData,
        latestSells: $latestSells,
        portfolio: $portfolio,
        portfolioYields: $portfolioYields,
        statistics: $statistics,
        launchStatistics: $launchStatistics,
        suggestions: $suggestions,
    ) {
      id
      name
      backtestedData
      latestSells
      portfolio
      portfolioYields
      statistics
      launchStatistics
      suggestions
    }
  }
`

function mapDispatchToProps(dispatch) {
    const actions = { updatePlan }
    return { actions: bindActionCreators(actions, dispatch) }
}

const APIWithRedux = connect(null, mapDispatchToProps)(API)

const APIWithGraphQLAndRedux = compose(
    graphql(PlansQuery, {
        props: ({ data }) => ({ ...data }),
    }),
    graphql(updatePlanQuery, { name: 'mutatePlan' }),
)(APIWithRedux)

export default withData(withMaterial(APIWithGraphQLAndRedux))
