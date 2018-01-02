import React from 'react'
import Section from 'components/Section'
import SectionTitle from 'components/Section/SectionTitle'
import Subtitle from 'components/Section/Subtitle'
import Button from 'material-ui/Button'
import { ThemeProvider } from 'emotion/react/theming'
import theme from 'common/theme'

const FirstMonthOnus = () => (
    <ThemeProvider theme={theme}>
        <Section theme={theme}>
            <SectionTitle>First month is on us</SectionTitle>
            <Subtitle>If you decide Formula Stocks isn't for you - simply cancel online at any time without obligations.</Subtitle>
            <Button raised color="primary">Join free for a month</Button>
        </Section>
    </ThemeProvider>
)

export default FirstMonthOnus
