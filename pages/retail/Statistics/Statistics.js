import React from 'react'
import PropTypes from 'prop-types'
import Section from 'components/Section'
import SectionTitle from 'components/Section/SectionTitle'
import Beside from 'components/Section/Beside'
import Left from 'components/Section/Beside/Left'
import Right from 'components/Section/Beside/Right'
import DualBarChart from 'components/graphs/DualBarChart'
import DualUpDownChart from 'components/graphs/DualUpDownChart'
import { ThemeProvider } from 'emotion/react/theming'
import theme from 'common/theme'

const Statistics = ({ winRatio, planName, avgGain, avgLoss }) => (
    <ThemeProvider theme={theme}>
        <Section theme={theme}>
            <SectionTitle>Statistics</SectionTitle>
            <Beside>
                <Left data-center>
                    <DualBarChart
                        primaryStatistic={Math.floor(winRatio)}
                        secondaryStatistic={59}
                        primaryName={planName}
                        secondaryName="Market"
                        primaryHeight={Math.floor(winRatio)}
                        secondaryHeight={59}
                        description="Winners in %"
                        unit="%"
                    />
                    <p>
                        Historically, 89-92% of our recommendations have been successful. If you had bought random high-quality stocks,
                        only approx. 59% of these would have earned a positive return. A staggering difference.
                    </p>
                </Left>
                <Right data-center>
                    <DualBarChart
                        primaryStatistic={36}
                        secondaryStatistic={12}
                        primaryName={planName}
                        secondaryName="Market"
                        primaryHeight={90}
                        secondaryHeight={30}
                        description="Outperforming years"
                    />
                    <p>
                        Recommendations and model portfolio are based on timeless and proven investment principles,
                        mathematical probabilities, and sound logic. The model portfolio has outperformed the S&P 500
                        in 75% of all years.
                    </p>
                </Right>
            </Beside>
            <Beside>
                <Left data-center>
                    <DualUpDownChart
                        primaryStatistic={Math.floor(avgGain)}
                        secondaryStatistic={Math.floor(avgLoss)}
                        primaryName="Win"
                        secondaryName="Loss"
                        primaryHeight={Math.floor(avgGain)}
                        secondaryHeight={Math.floor(avgLoss)}
                        unit="%"
                        description="Avg. win/loss per stock"
                    />
                </Left>
                <Right data-center>
                    <DualBarChart
                        primaryStatistic={Math.floor(winRatio)}
                        secondaryStatistic={100 - Math.floor(winRatio)}
                        primaryName="Wins"
                        secondaryName="Losses"
                        primaryHeight={Math.floor(winRatio)}
                        secondaryHeight={100 - Math.floor(winRatio)}
                        unit="%"
                        description="Win/loss ratio"
                    />
                </Right>
            </Beside>
            <p>
                We specialize in high-probability investments – a high probability of long-term gain combined with a low probability of
                loss. We prefer to buy good businesses at fair prices with a margin of safety, shielding us from some downside,
                while enjoying the upside of owning businesses that earn a meaningful return on capital.
            </p>
        </Section>
    </ThemeProvider>
)

Statistics.defaultProps = {
    avgGain: 0,
    avgLoss: 0,
}

Statistics.propTypes = {
    winRatio: PropTypes.number,
    avgGain: PropTypes.number,
    avgLoss: PropTypes.number,
    planName: PropTypes.string,
}

export default Statistics
