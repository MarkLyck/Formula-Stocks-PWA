import React from 'react'
import Link from 'next/link'
import Section from 'components/Section'
import SectionTitle from 'components/Section/SectionTitle'
import { ThemeProvider } from 'emotion/react/theming'
import theme from 'common/theme'
import { BrochureLink } from './styles'

const downloadBrochure = () => window.open('static/brochure.pdf')

const IntendedAudience = () => (
    <ThemeProvider theme={theme}>
        <Section theme={theme}>
            <SectionTitle>Intended audience</SectionTitle>
            <p>
                This page is an introduction to Formula Stocks and our Entry membership. No experience or background is required.
                If you are an experienced, technically advanced, or professionel investor, you might prefer to see our pages with
                additional technical, in-depth information, which at the same time requires more background knowledge.<br /><br />

                For deeper technical information <BrochureLink role="link" onClick={downloadBrochure}>click here to download our brochure.</BrochureLink>
                <br /><br />

                For institutional and professional services please <Link href="/pro">click here</Link>.
            </p>
        </Section>
    </ThemeProvider>
)

export default IntendedAudience
