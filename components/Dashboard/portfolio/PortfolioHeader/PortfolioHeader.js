import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion/react/theming'
import Paper from 'material-ui/Paper'
import theme from 'common/theme'
import PortfolioGraph from './PortfolioGraph'
import Allocation from './Allocation'
import { headerStyle, RightSide, LeftSide } from './styles'

const getIncrease = (startSum, endSum) => (((endSum - startSum) / startSum) * 100).toFixed(2)

const PortfolioHeader = ({ portfolioYields, marketPrices, planName, portfolio }) => (
    <ThemeProvider theme={theme}>
        <Paper style={headerStyle}>
            <LeftSide>
                <h4>Portfolio yields</h4>
                <PortfolioGraph portfolioYields={portfolioYields} marketPrices={marketPrices} planName={planName} />
            </LeftSide>
            <RightSide>
                <div className="plan-results results">
                    <h3 className="plan-name">{planName} Formula</h3>
                    <p>
                        <span>+{getIncrease(portfolioYields[0].balance, portfolioYields[portfolioYields.length - 1].balance)}% </span>
                        since 2009
                    </p>
                </div>
                <div className="market-results results">
                    <h3>DJIA</h3>
                    <p>
                        <span>+{getIncrease(marketPrices[0].price, marketPrices[marketPrices.length - 1].price)}% </span>
                        since 2009
                    </p>
                </div>
                <Allocation portfolio={portfolio} id="allocation-chart" />
            </RightSide>
        </Paper>
    </ThemeProvider>
)

PortfolioHeader.propTypes = {
    portfolioYields: PropTypes.array,
    marketPrices: PropTypes.array,
    planName: PropTypes.string,
    portfolio: PropTypes.array,
}

export default PortfolioHeader
