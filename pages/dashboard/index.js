import React from 'react'
import withData from '../../lib/withData'
import FileUploader from './FileUploader'

const Dashboard = () => (
    <div>
        <p>Dashboard</p>
        <FileUploader />
    </div>
)

export default withData(Dashboard)
