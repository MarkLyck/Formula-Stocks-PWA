import React from 'react'
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table'
import Section from 'components/Section'
import SectionTitle from 'components/Section/SectionTitle'
import Beside from 'components/Section/Beside'
import Left from 'components/Section/Beside/Left'
import Right from 'components/Section/Beside/Right'
import Disclaimer from 'components/Disclaimer'
import { ThemeProvider } from 'emotion/react/theming'
import theme from 'common/theme'

const PilotProgram = () => (
    <ThemeProvider theme={theme}>
        <Section theme={theme}>
            <SectionTitle>What is it?</SectionTitle>
            <Beside>
                <Left>
                    <p>
                        Formula Stocks has undertaken a 3-year pilot program. Performance data was recorded
                        under normal real-time market conditions with capital, and financial results
                        reviewed by a state-licensed auditor. We recorded an average return on equity
                        employed to sustain securities trading of +78.94% in 2009,
                        +44.64% in 2010 and +17.51% in 2011.<sup>*</sup><br /><br />
                    </p>
                    <Disclaimer><sup>*</sup>Past performance is not neccesarily indicative of future results.</Disclaimer>
                </Left>
                <Right>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell><p>Year 1</p></TableCell>
                                <TableCell><p>+78.94%</p></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><p>Year 2</p></TableCell>
                                <TableCell><p>+44.64%</p></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><p>Year 3</p></TableCell>
                                <TableCell><p>+17.51%</p></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Right>
            </Beside>
        </Section>
    </ThemeProvider>
)

export default PilotProgram
