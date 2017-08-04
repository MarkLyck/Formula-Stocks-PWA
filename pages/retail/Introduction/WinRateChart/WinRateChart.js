import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'emotion/react/theming'
import { Chart, ChartBeside, WinRate, ChartName, Winners } from './styles'

const WinRateChart = ({ fsWinRate, marketWinRate, planName, theme }) => (
    <div>
        <ChartBeside>
            <Chart color={theme.colors.primary} height={Math.floor(fsWinRate)}>
                <WinRate>{Math.floor(fsWinRate)}%</WinRate>
                <ChartName>{planName}</ChartName>
            </Chart>
            <Chart color={theme.colors.black} height={marketWinRate}>
                <WinRate>{marketWinRate}%</WinRate>
                <ChartName>Market</ChartName>
            </Chart>
        </ChartBeside>
        <Winners>Winners in %</Winners>
    </div>
)

WinRateChart.propTypes = {
    fsWinRate: PropTypes.number.isRequired,
    marketWinRate: PropTypes.number.isRequired,
    planName: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
}

export default withTheme(WinRateChart)
