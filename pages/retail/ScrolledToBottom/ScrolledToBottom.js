import React from 'react'
import Section from 'components/Section'
import Subtitle from 'components/Section/Subtitle'
import Button from 'material-ui/Button'
import { ThemeProvider } from 'emotion/react/theming'
import theme from 'common/theme'

const ScrolledToBottom = () => (
    <ThemeProvider theme={theme}>
        <Section theme={theme}>
            <h2>Now that you have scrolled all the way to the bottom...</h2>
            <Subtitle>It can be just the right moment to stop reading and do some clicking instead.</Subtitle>
            <Button raised color="primary">I'm ready to try</Button>
            <a href="mailto:i194mpvo@incoming.intercom.io">Want more information? - Let's talk!</a>
        </Section>
    </ThemeProvider>
)

export default ScrolledToBottom
