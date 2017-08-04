import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import LineGraph from 'components/graphs/LineGraph'
import { formatPrice } from 'common/helpers'

const createChartData = (portfolioYields, DJIA) => {
    const startValue = portfolioYields[0].balance
    const marketStartValue = Number(DJIA[0]) || 0

    return portfolioYields.map((point, i) => {
        const balance = (((portfolioYields[i].balance - startValue) / startValue) * 100).toFixed(2)
        const marketBalance = (((Number(DJIA[i]) - marketStartValue) / marketStartValue) * 100).toFixed(2)

        const month = Number(point.date.month) > 9 ? point.date.month : `0${point.date.month}`

        return {
            market: Number(marketBalance) || 0,
            fs: Number(balance),
            fsBalloon: formatPrice(balance, true, true),
            marketBalloon: formatPrice(marketBalance, true, true),
            date: `${point.date.year}-${month}-${point.date.day}`,
        }
    })
}

const LaunchPerformance = ({ portfolioYields, DJIA, planName }) => {
    if (!portfolioYields || !portfolioYields.length) {
        return (
            <div id="result-chart" className="loading">
                <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
            </div>
        )
    }
    const chartData = createChartData(portfolioYields, DJIA)

    const fsMin = _.minBy(chartData, point => point.fs).fs
    const marMin = chartData[0].market ? _.minBy(chartData, point => point.market).market : 0

    const minimum = Math.floor(_.min([fsMin, marMin]) / 10) * 10
    const maximum = Math.ceil(_.maxBy(chartData, point => point.fs).fs / 20) * 20

    console.log(chartData)

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
    if (DJIA.length) {
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
        <div>
            <div>
                <div>Business</div>
                <div>Fund</div>
                <div>Premium</div>
                <div>DJIA</div>
            </div>
            <LineGraph
                graphs={graphs}
                data={chartData}
                unit="%"
                unitPosition="right"
                axisAlpha={0.5}
                maximum={maximum}
                minimum={minimum}
            />
        </div>
    )
}

LaunchPerformance.defaultProps = {
    portfolioYields: [],
    DJIA: [],
    planName: '',
}

LaunchPerformance.propTypes = {
    portfolioYields: PropTypes.array,
    DJIA: PropTypes.array,
    planName: PropTypes.string,
}

export default LaunchPerformance
