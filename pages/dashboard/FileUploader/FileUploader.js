import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import { ThemeProvider } from 'emotion/react/theming'
import theme from 'common/theme'
import { FileDrop } from './styles'
import JSONIcon from './json_icon.svg'

const acceptedFilenames = [
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

class FileUploader extends Component {
    onDrop = (files) => {
        const { actions, mutatePlan, Plans } = this.props

        const badFiles = files.filter(file => acceptedFilenames.indexOf(file.name) === -1)
        if (!badFiles.length) { actions.updatePlan(files, mutatePlan, Plans) }
        return null
    }

    render() {
        const { Plans } = this.props
        if (!Plans.length) { return null }
        console.log(this.props)

        // this.props.updatePlan({ variables: { id: Plans[0].id, name: 'test3' } })
        //     .then(res => console.log('plan updated', res))
        // updatePlan({ variables: { id: Plans[0].id } })

        return (
            <ThemeProvider theme={theme}>
                <div className="wrapper white">
                    <h2>Upload JSON files</h2>
                    <FileDrop onDrop={this.onDrop} accept="application/json">
                        <h3>Drag and drop JSON files here</h3>
                        <JSONIcon />
                    </FileDrop>
                </div>
            </ThemeProvider>
        )
    }
}

FileUploader.defaultProps = {
    Plans: [],
}
FileUploader.propTypes = {
    actions: PropTypes.object.isRequired,
    mutatePlan: PropTypes.func.isRequired,
    Plans: PropTypes.array,
}

const updatePlan = gql`
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

export default graphql(updatePlan, { name: 'mutatePlan' })(FileUploader)

// export default FileUploader
