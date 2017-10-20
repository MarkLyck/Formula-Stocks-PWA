import React from 'react'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper'
import Table, { TableCell, TableHead, TableRow } from 'material-ui/Table'
import { ThemeProvider } from 'emotion/react/theming'
import theme from 'common/theme'
import PortfolioItem from './PortfolioItem'
import { TableContainer, HeaderContainer } from './styles'

const TableCellPadding = { padding: '0 16px' }

const Holdings = ({ portfolio }) => (
    <ThemeProvider theme={theme}>
        <Paper>
            <HeaderContainer>
                <h4>Holdings</h4>
                <h4 className="stocks-number">{portfolio.length - 1} stocks</h4>
            </HeaderContainer>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={TableCellPadding}>Stock</TableCell>
                            <TableCell numeric style={TableCellPadding} className="allocation">Allocation</TableCell>
                            <TableCell numeric style={TableCellPadding} className="return">Return</TableCell>
                            <TableCell numeric style={TableCellPadding} className="cost-basis">Cost basis</TableCell>
                            <TableCell numeric style={TableCellPadding} className="last-price">Last price</TableCell>
                            <TableCell numeric style={TableCellPadding} className="days-owned">Days owned</TableCell>
                        </TableRow>
                    </TableHead>
                    {portfolio.map(stock => <PortfolioItem stock={stock} key={stock.ticker} />)}
                </Table>
            </TableContainer>
        </Paper>
    </ThemeProvider>
)

Holdings.propTypes = {
    portfolio: PropTypes.array,
}

export default Holdings
