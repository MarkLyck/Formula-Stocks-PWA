import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import PieChart from 'components/graphs/PieChart'
import { ContainerStyle } from './styles'

const createChartData = data => Object.entries(data).map(obj => ({ title: obj[0], value: obj[1] }))

const Statistics = ({ statistics }) => (
    <Paper style={ContainerStyle}>
        Statistics
        <div>
            <PieChart title="Browsers" id="vst-browsers" data={createChartData(statistics.browsers)} />
            {/* <PieChart title="Devices" id="vst-devices" data={createChartData(statistics.devices)} />
            <PieChart title="OS" id="vst-os" data={createChartData(statistics.os)} />
            <PieChart title="Referrers" id="vst-referrers" data={createChartData(statistics.urls)} /> */}
        </div>
    </Paper>
)

Statistics.propTypes = {
    statistics: PropTypes.object,
}

export default Statistics
