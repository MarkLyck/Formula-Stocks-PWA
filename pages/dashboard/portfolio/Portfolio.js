import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import { planIds, marketIds } from 'common/constants'

import Paper from 'material-ui/Paper'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'

import Dashboard from '../Dashboard'
import PortfolioHeader from './PortfolioHeader'
import AnnualReturns from './AnnualReturns'
import PortfolioItem from './PortfolioItem'

const Portfolio = ({ Plan, DJIA }) => {
    console.log(Plan)
    if (!Plan) { return null }
    return (
        <Dashboard>
            <div>
                <PortfolioHeader
                    portfolioYields={Plan.portfolioYields}
                    marketPrices={DJIA.pricesSince2009}
                    portfolio={Plan.portfolio}
                    planName={Plan.name}
                />
                <AnnualReturns portfolioYields={Plan.portfolioYields} />
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
      name
      portfolio
      info
      launchStatistics
      statistics
      portfolioYields
    },
    DJIA: Market(id: "${marketIds.DJIA}") {
        name
        pricesSince2009
    }
  }
`

Portfolio.propTypes = {
    Plan: PropTypes.object,
    DJIA: PropTypes.object,
}

export default graphql(Plan, {
    props: ({ data }) => ({ Plan: data.Plan, DJIA: data.DJIA }),
})(Portfolio)
