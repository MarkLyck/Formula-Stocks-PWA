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
        console.log(' on drop ', files)
        const { actions } = this.props

        const badFiles = files.filter(file => acceptedFilenames.indexOf(file.name) === -1)
        if (badFiles.length) {
            return null
        }

        actions.updatePlan(files)

        // actions.showNotification(`uploading ${files.length} file(s)`)
        // const entryFiles = files.filter(file => (file.name.indexOf('basic') > -1 || file.name.indexOf('entry') > -1))
        // const premiumFiles = files.filter(file => file.name.indexOf('premium') > -1)
        // const businessFiles = files.filter(file => file.name.indexOf('business') > -1)
        // const fundFiles = files.filter(file => file.name.indexOf('fund') > -1)
        //
        // if (entryFiles.length > 0) { actions.updatePlan(entryFiles, 'entry') }
        // if (premiumFiles.length > 0) { actions.updatePlan(premiumFiles, 'premium') }
        // if (businessFiles.length > 0) { actions.updatePlan(businessFiles, 'business') }
        // if (fundFiles.length > 0) { actions.updatePlan(fundFiles, 'fund') }

        return null
    }

    render() {
        console.log(this.props)
        const { Plans } = this.props

        if (!Plans.length) { return null }
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
    // updatePlan: PropTypes.func.isRequired,
    Plans: PropTypes.array,
}

const updatePlan = gql`
  mutation updatePlan($id: ID!, $plan: Object!) {
    updatePlan(id: $id, plan: $plan) {
      id
      name
      price
    }
  }
`

export default graphql(updatePlan, {
    props: ({ mutate }) => ({
        update: ({ id, plan }) => mutate({
            variables: { id, plan },

            optimisticResponse: {
                __typename: 'Mutation',
                updatePlan: {
                    __typename: 'Plan',
                },
            },
        }),
    }),
})(FileUploader)

// export default FileUploader
