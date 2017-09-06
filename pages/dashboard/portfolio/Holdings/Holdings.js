import React from 'react'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'

import PortfolioItem from './PortfolioItem'

const Holdings = ({ portfolio }) => (
    <Paper>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell numeric>Allocation</TableCell>
                    <TableCell numeric>Return</TableCell>
                    <TableCell numeric>Cost basis</TableCell>
                    <TableCell numeric>Last price</TableCell>
                    <TableCell numeric>Days owned</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {portfolio.map(stock => <PortfolioItem stock={stock} key={stock.ticker} />)}
            </TableBody>
        </Table>
    </Paper>
)

Holdings.propTypes = {
    portfolio: PropTypes.array,
}

export default Holdings
