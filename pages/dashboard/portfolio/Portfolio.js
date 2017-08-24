import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import { planIds } from 'common/constants'

import Paper from 'material-ui/Paper'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'

import Dashboard from '../Dashboard'
import PortfolioItem from './PortfolioItem'

const Portfolio = ({ Plan }) => {
    console.log(Plan)
    if (!Plan) { return null }
    return (
        <Dashboard>
            <div>
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
                            {Plan.portfolio.map(stock => <PortfolioItem stock={stock} key={stock.ticker} />)}
                        </TableBody>
                    </Table>
                </Paper>
                <p>portfolio</p>
            </div>
        </Dashboard>
    )
}

const Plan = gql`
  query {
    Plan(id: "${planIds.ENTRY}") {
      portfolio
      info
      launchStatistics
      statistics
    },
  }
`

Portfolio.propTypes = {
    Plan: PropTypes.object,
}

export default graphql(Plan, {
    props: ({ data }) => ({ Plan: data.Plan }),
})(Portfolio)
