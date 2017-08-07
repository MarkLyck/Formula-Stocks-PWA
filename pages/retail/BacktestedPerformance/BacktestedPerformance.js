import React from 'react'
import PropTypes from 'prop-types'
import Section from 'components/Section'
import SectionTitle from 'components/Section/SectionTitle'
import Subtitle from 'components/Section/Subtitle'
import Disclaimer from 'components/Disclaimer'
import { ThemeProvider } from 'emotion/react/theming'
import theme from 'common/theme'
import LongTermGraph from './LongTermGraph'

const Performance = ({ backtestedData, planName }) => (
    <ThemeProvider theme={theme}>
        <Section data-offWhite theme={theme}>
            <SectionTitle>Long-term performance</SectionTitle>
            <Subtitle>Log scale graph 1970 - 2017</Subtitle>
            <LongTermGraph planData={backtestedData} planName={planName} />
            <Disclaimer>
                Historical numbers are based on backtested data. Since our 2009 launch we have observed similar results in real time.
                See our ToS for details.
            </Disclaimer>
        </Section>
    </ThemeProvider>
)

Performance.propTypes = {
    backtestedData: PropTypes.array,
    planName: PropTypes.string,
}

export default Performance
