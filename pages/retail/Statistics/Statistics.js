import React from 'react'
import Section from 'components/Section'
import SectionTitle from 'components/Section/SectionTitle'
import Beside from 'components/Section/Beside'
import Left from 'components/Section/Beside/Left'
import Right from 'components/Section/Beside/Right'
import { ThemeProvider } from 'emotion/react/theming'
import theme from 'common/theme'

const Statistics = () => (
    <ThemeProvider theme={theme}>
        <Section theme={theme}>
            <SectionTitle>Statistics</SectionTitle>
            <Beside>
                <Left>
                    <p>
                        Historically, 89-92% of our recommendations have been successful. If you had bought random high-quality stocks,
                        only approx. 59% of these would have earned a positive return. A staggering difference.
                    </p>
                </Left>
                <Right>
                    <p>
                        Recommendations and model portfolio are based on timeless and proven investment principles,
                        mathematical probabilities, and sound logic. The model portfolio has outperformed the S&P 500
                        in 75% of all years.
                    </p>
                </Right>
            </Beside>
            <Beside>
                <Left>

                </Left>
                <Right>

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

export default Statistics
