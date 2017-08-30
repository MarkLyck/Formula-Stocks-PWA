import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion/react/theming'
import Paper from 'material-ui/Paper'
import theme from 'common/theme'
import PortfolioGraph from './PortfolioGraph'
import Allocation from './Allocation'

const getIncrease = (startSum, endSum) => (((endSum - startSum) / startSum) * 100).toFixed(2)

const PortfolioHeader = ({ portfolioYields, marketPrices, planName, portfolio }) => {
    console.log(portfolio)
    return (
        <ThemeProvider theme={theme}>
            <Paper>
                <PortfolioGraph portfolioYields={portfolioYields} marketPrices={marketPrices} planName={planName} />
                <div>
                    <h3>{planName} Formula</h3>
                    <p>
                        <span>+{getIncrease(portfolioYields[0].balance, portfolioYields[portfolioYields.length - 1].balance)}%</span>
                        since 2009
                    </p>
                </div>
                <div>
                    <h3>DJIA</h3>
                    <p>
                        <span>+{getIncrease(marketPrices[0].price, marketPrices[marketPrices.length - 1].price)}%</span>
                        since 2009
                    </p>
                </div>
                <Allocation portfolio={portfolio} id="allocation-chart" />
            </Paper>
        </ThemeProvider>
    )
}

PortfolioHeader.propTypes = {
    portfolioYields: PropTypes.array,
    marketPrices: PropTypes.array,
    planName: PropTypes.string,
    portfolio: PropTypes.array,
}

export default PortfolioHeader
