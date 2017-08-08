import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import LineGraph from 'components/graphs/LineGraph'
import { formatPrice } from 'common/helpers'
import { Legends, Legend } from 'components/graphs/Legends/Legends'
import theme from 'common/theme'
import { GraphContainer } from './styles'

const createChartData = (planData, marketData) => planData.map((point, i) => {
    let balance = 25000
    let marketBalance = 25000

    if (planData[i] && i !== 0) { balance = planData[i].balance }
    if (marketData[i]) { marketBalance = marketData[i] }
    else if (i !== 0 && planData[i - 1] !== 25000) { marketBalance = planData[i - 1] }

    const month = Number(point.date.month) > 9 ? point.date.month : `0${point.date.month}`

    return {
        market: Number(marketBalance) || 0,
        fs: Number(balance),
        fsBalloon: formatPrice(balance, true, false),
        marketBalloon: formatPrice(marketBalance, true, false),
        date: `${point.date.year}-${month}-${point.date.day}`,
    }
})

const LaunchPerformance = ({ planData, marketData, planName }) => {
    if (!planData || !planData.length) {
        return (
            <div id="result-chart" className="loading">
                <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
            </div>
        )
    }
    const chartData = createChartData(planData, marketData)

    // const fsMin = _.minBy(chartData, point => point.fs).fs
    // const marMin = chartData[0].market ? _.minBy(chartData, point => point.market).market : 0

    // const minimum = Math.floor(_.min([fsMin, marMin]) / 10) * 10
    // const maximum = Math.ceil(_.maxBy(chartData, point => point.fs).fs / 20) * 20

    const graphs = [
        {
            id: 'launch',
            lineColor: '#27A5F9',

            bullet: 'square',
            bulletBorderAlpha: 1,
            bulletColor: '#27A5F9',
            bulletSize: 5,
            hideBulletsCount: 10,
            lineThickness: 2,
            useLineColorForBulletBorder: true,
            valueField: 'fs',
            balloonText: `<div class="chart-balloon"><span class="plan-name">${planName}</span><span class="balloon-value">[[fsBalloon]]</span></div>`,
        },
    ]
    if (marketData.length) {
        graphs.unshift({
            id: 'market',
            lineColor: '#989898',

            bullet: 'square',
            bulletBorderAlpha: 1,
            bulletColor: '#989898',
            bulletSize: 5,
            hideBulletsCount: 10,
            lineThickness: 2,
            useLineColorForBulletBorder: true,
            valueField: 'market',
            balloonText: '<div class="chart-balloon"><span class="plan-name market-name">DJIA</span><span class="balloon-value">[[marketBalloon]]</span></div>',
        })
    }

    return (
        <GraphContainer>
            <Legends data-left={40}>
                <Legend color={theme.colors.primary}><p>{planName}</p></Legend>
                <Legend color={theme.colors.black}><p>S&P 500</p></Legend>
            </Legends>
            <LineGraph
                id="single-long-term-performance-graph"
                graphs={graphs}
                data={chartData}
                unit="$"
                unitPosition="left"
                axisAlpha={0.5}
                // maximum={maximum}
                // minimum={minimum}
                logarithmic
                minorGridEnabled
                insideY
            />
        </GraphContainer>
    )
}

LaunchPerformance.defaultProps = {
    planData: [],
    marketData: [],
    planName: '',
}

LaunchPerformance.propTypes = {
    planData: PropTypes.array,
    marketData: PropTypes.array,
    planName: PropTypes.string,
}

export default LaunchPerformance
