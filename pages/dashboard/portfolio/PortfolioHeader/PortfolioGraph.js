import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import LineGraph from 'components/graphs/LineGraph'
import { Legends, Legend } from 'components/graphs/Legends/Legends'
import { formatPrice } from 'common/helpers'
import theme from 'common/theme'
import { GraphContainer } from './styles'

const createChartData = (portfolioYields, marketPrices) => {
    const startValue = portfolioYields[0].balance
    const marketStartValue = Number(marketPrices[0].price) || 0

    return portfolioYields.map((point, i) => {
        const balance = (((portfolioYields[i].balance - startValue) / startValue) * 100).toFixed(2)
        const marketBalance = (((Number(marketPrices[i].price) - marketStartValue) / marketStartValue) * 100).toFixed(2)

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

const PortfolioGraph = ({ portfolioYields, marketPrices, planName }) => {
    if (!portfolioYields || !portfolioYields.length) {
        return (
            <div id="result-chart" className="loading">
                <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
            </div>
        )
    }
    const chartData = createChartData(portfolioYields, marketPrices)

    const fsMin = _.minBy(chartData, point => point.fs).fs
    const marMin = chartData[0].market ? _.minBy(chartData, point => point.market).market : 0

    const minimum = Math.floor(_.min([fsMin, marMin]) / 10) * 10
    const maximum = Math.ceil(_.maxBy(chartData, point => point.fs).fs / 20) * 20

    const graphs = [
        {
            id: 'launch',
            lineColor: '#27A5F9',
            fillAlphas: 0.75,
            bullet: 'square',
            bulletBorderAlpha: 1,
            bulletColor: '#FFFFFF',
            bulletSize: 5,
            hideBulletsCount: 10,
            lineThickness: 2,
            useLineColorForBulletBorder: true,
            valueField: 'fs',
            balloonText: `
                <div class="chart-balloon">
                    <span class="plan-name">${planName}</span>
                    <span class="balloon-value">[[fsBalloon]]</span>
                </div>`,
        },
    ]
    if (marketPrices.length) {
        graphs.push({
            id: 'market',
            lineColor: '#49494A',
            fillAlphas: 0.75,
            bullet: 'square',
            bulletBorderAlpha: 1,
            bulletColor: '#FFFFFF',
            bulletSize: 5,
            hideBulletsCount: 10,
            lineThickness: 2,
            useLineColorForBulletBorder: true,
            valueField: 'market',
            balloonText: `
                <div class="chart-balloon">
                    <span class="plan-name market-name">DJIA</span>
                    <span class="balloon-value">[[marketBalloon]]</span>
                </div>`,
        })
    }

    return (
        <GraphContainer theme={theme}>
            <Legends>
                <Legend color={theme.colors.primary}><p>{planName}</p></Legend>
                <Legend color={theme.colors.black}><p>DJIA</p></Legend>
            </Legends>
            <LineGraph
                id="portfolio-graph"
                graphs={graphs}
                data={chartData}
                unit="%"
                unitPosition="right"
                axisAlpha={0.5}
                maximum={maximum}
                minimum={minimum}
                baseValue={minimum}
            />
        </GraphContainer>
    )
}

PortfolioGraph.defaultProps = {
    portfolioYields: [],
    DJIA: [],
    planName: '',
}

PortfolioGraph.propTypes = {
    portfolioYields: PropTypes.array,
    marketPrices: PropTypes.array,
    planName: PropTypes.string,
}

export default PortfolioGraph
