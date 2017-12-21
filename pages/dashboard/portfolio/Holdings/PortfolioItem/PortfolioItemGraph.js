import React from 'react'
import PropTypes from 'prop-types'
import LineGraph from 'components/graphs/LineGraph'
import theme from 'common/theme'
import { GraphContainer, LoadingContainer, FailedContainer } from './styles'

const createChartData = historicPrices => historicPrices.map(point => ({
    price: point[1],
    date: point[0],
}))

const StockChart = ({ historicPrices, ticker, costBasis, stockFetchFailed }) => {
    if (!stockFetchFailed && (!historicPrices || !historicPrices.length || !ticker)) {
        return (
            <LoadingContainer theme={theme}>
                <i className="fa fa-spinner-third fa-spin fa-3x fa-fw" />
                <h4>Loading</h4>
            </LoadingContainer>
        )
    } else if (stockFetchFailed) {
        return (
            <FailedContainer theme={theme}>
                <i className="fa fa-exclamation-circle fa-2x" />
                {/* <i className="fa fa-info fa-spin fa-3x fa-fw" /> */}
                <h4>No graph data available</h4>
            </FailedContainer>
        )
    }
    const chartData = createChartData(historicPrices)

    const guideColor = theme.colors.primary
    const color = { positive: theme.colors.primary, negative: theme.colors.black }
    const cursorColor = theme.colors.black

    const graphs = [
        {
            id: ticker,
            lineColor: color.negative,
            negativeLineColor: color.positive,
            negativeBase: costBasis + 0.001,
            fillAlphas: 0,
            bullet: 'square',
            bulletBorderAlpha: 1,
            bulletColor: '#FFFFFF',
            bulletSize: 5,
            hideBulletsCount: 10,
            lineThickness: 2,
            useLineColorForBulletBorder: true,
            valueField: 'price',
            balloonText: `
                <div class="chart-balloon">
                    <span class="ticker-name ticker-name">${ticker}</span>
                    <span class="balloon-value">$[[price]]</span>
                </div>`,
        },
    ]

    const guides = [{
        value: costBasis + 0.001,
        lineColor: guideColor,
        lineAlpha: 0.4,
        lineThickness: 1,
        position: 'right',
    }]

    return (
        <GraphContainer theme={theme}>
            <LineGraph
                id={`${ticker.toLowerCase()}-portfoliograph`}
                className="stock-portfolio-graph"
                graphs={graphs}
                data={chartData}
                unit="$"
                insideY
                axisAlpha={0}
                cursorColor={cursorColor}
                guides={guides}
            />
        </GraphContainer>
    )
}

StockChart.propTypes = {
    historicPrices: PropTypes.array,
    ticker: PropTypes.string,
    costBasis: PropTypes.number,
    stockFetchFailed: PropTypes.bool,
}

export default StockChart
