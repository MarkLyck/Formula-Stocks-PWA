import React from 'react'
import PropTypes from 'prop-types'
import Section from 'components/Section'
import SectionTitle from 'components/Section/SectionTitle'
import Beside from 'components/Section/Beside'
import Disclaimer from 'components/Disclaimer'
import { ThemeProvider } from 'emotion/react/theming'
import theme from 'common/theme'
import WinRateChart from './WinRateChart'

const Introduction = ({ winRatio, portfolioReturn, planName }) => (
    <ThemeProvider theme={theme}>
        <Section>
            <SectionTitle>Invest intelligently</SectionTitle>
            <Beside>
                <div>
                    <p>
                        Formula Stocks offers a better way to invest. It estimates which stocks will go up, before they go up.
                        {Math.floor(winRatio)}% of the times we made such an estimate, it proved to be successful in the long run. You simply buy
                        these stocks in your own account.<br /><br />

                        Investing using these estimates, our Entry portfolio returned 59.39% in 2016. Cumulative returns since
                        2009 are {portfolioReturn}%* vs. the S&P500's 176%. It is based on groundbreaking technology, which really makes a
                        difference for our members. Typically, when you invest in stocks, your basic expectation is to receive
                        6-7% p.a. on average. Usually a fund product will provide you a risk adjusted, long-term return in
                        this neighborhood. Or, if it is a better performing fund, demand very high fees.<br /><br />
                    </p>
                    <p>
                        Join to better your returns, save on fees, and moderate your risk. Sign up for a 30-day free trial
                        without any obligations.
                    </p>
                    <Disclaimer theme={theme}><sup>*</sup>Past performance is not neccesarily indicative of future results.</Disclaimer>
                </div>
                <WinRateChart fsWinRate={winRatio} marketWinRate={59} planName={planName} />
            </Beside>
        </Section>
    </ThemeProvider>
)

Introduction.defaultProps = {
    winRatio: 90,
    portfolioReturn: 500,
    planName: 'entry',
}

Introduction.propTypes = {
    winRatio: PropTypes.number,
    portfolioReturn: PropTypes.number,
    planName: PropTypes.string,
}

export default Introduction
