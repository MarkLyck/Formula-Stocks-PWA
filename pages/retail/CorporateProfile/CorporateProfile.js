import React from 'react'
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Section from 'components/Section'
import SectionTitle from 'components/Section/SectionTitle'
import Beside from 'components/Section/Beside'
import Left from 'components/Section/Beside/Left'
import Right from 'components/Section/Beside/Right'
import { ThemeProvider } from 'emotion/react/theming'
import theme from 'common/theme'

const CorporateProfile = () => (
    <ThemeProvider theme={theme}>
        <Section data-offWhite theme={theme}>
            <SectionTitle>Corporate profile</SectionTitle>
            <Beside>
                <Left>
                    <h3>About us</h3>
                    <p>
                        Formula Stocks develops cognitive computing technologies since 2003 designed to achieve above-average performance
                        in equity markets. Technology includes learning, business analytics, decisionmaking, probability estimation,
                        and prediction technologies. Products suites can be used as a standalone tool to assist investors,
                        or operate as autonomous decisionmakers, artificial intelligence capable of portfolio construction,
                        active portfolio management, risk/reward management.<br /><br />

                        Address: Formula Stocks ApS | Ribe Landevej 39, DK-6100 Haderslev. Denmark<br /><br />

                        Contact us at: <a href="mailto:info@formulastocks.com">info@formulastocks.com</a>
                    </p>
                </Left>
                <Right>
                    <h3>Executive team</h3>
                    <Card><img src="static/images/photos/Thomas.jpg" alt="" /><div><h5>Thomas Lyck</h5><p>CEO</p></div></Card>
                    <Card><img src="static/images/photos/Mark.jpg" alt="" /><div><h5>Mark Lyck</h5><p>COO</p></div></Card>
                    <Card><img src="static/images/photos/Marie.jpg" alt="" /><div><h5>Marie Lauritzen</h5><p>CHRO</p></div></Card>
                </Right>
            </Beside>
        </Section>
    </ThemeProvider>
)

export default CorporateProfile
