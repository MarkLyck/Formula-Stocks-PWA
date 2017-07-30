import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import JSONIcon from './json_icon.svg'

class FileUploader extends Component {
    onDrop = (files) => {
        const { actions } = this.props

        const filenames = [
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
        const badFiles = files.filter(file => filenames.indexOf(file.name) === -1)
        if (badFiles.length > 0) {
            return null
        }
        // actions.showNotification(`uploading ${files.length} file(s)`)
        const entryFiles = files.filter(file => (file.name.indexOf('basic') > -1 || file.name.indexOf('entry') > -1))
        const premiumFiles = files.filter(file => file.name.indexOf('premium') > -1)
        const businessFiles = files.filter(file => file.name.indexOf('business') > -1)
        const fundFiles = files.filter(file => file.name.indexOf('fund') > -1)

        if (entryFiles.length > 0) { actions.updatePlan(entryFiles, 'entry') }
        if (premiumFiles.length > 0) { actions.updatePlan(premiumFiles, 'premium') }
        if (businessFiles.length > 0) { actions.updatePlan(businessFiles, 'business') }
        if (fundFiles.length > 0) { actions.updatePlan(fundFiles, 'fund') }

        return null
    }

    render() {
        return (
            <div className="admin-api">
                <div className="wrapper white">
                    <h2>Upload JSON files</h2>
                    <Dropzone className="dropzone" onDrop={this.onDrop}>
                        <div>
                            <h3>Drag and drop JSON files here</h3>
                            <img src={JSONIcon} alt="json" />
                        </div>
                    </Dropzone>
                </div>
            </div>
        )
    }
}

FileUploader.propTypes = {
    actions: PropTypes.object.isRequired,
}

export default FileUploader
