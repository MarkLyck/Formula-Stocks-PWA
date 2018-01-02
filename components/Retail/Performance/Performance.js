import React from 'react'
import PropTypes from 'prop-types'
import Section from 'components/Section'
import SectionTitle from 'components/Section/SectionTitle'
import Subtitle from 'components/Section/Subtitle'
import { ThemeProvider } from 'emotion/react/theming'
import theme from 'common/theme'
import LaunchPerformance from './LaunchPerformance'

const Performance = ({ portfolioYields, marketPrices, planName }) => (
    <ThemeProvider theme={theme}>
        <Section theme={theme}>
            <SectionTitle>Performance</SectionTitle>
            <Subtitle>Unleveraged returns since 2009, compared to the Dow Jones Industrial Average.</Subtitle>
            <LaunchPerformance portfolioYields={portfolioYields} marketPrices={marketPrices} planName={planName} />
        </Section>
    </ThemeProvider>
)

Performance.propTypes = {
    portfolioYields: PropTypes.array,
    marketPrices: PropTypes.array,
    planName: PropTypes.string,
}

export default Performance
