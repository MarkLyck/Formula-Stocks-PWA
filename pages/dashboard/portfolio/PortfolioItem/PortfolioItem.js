import React from 'react'
import PropTypes from 'prop-types'
import { TableCell, TableRow } from 'material-ui/Table'
import { PercentChange } from './styles'

const PortfolioItem = ({ stock }) => {
    const costBasisPrice = stock.purchase_price - stock.dividends
    const percentIncrease = (((stock.latest_price - costBasisPrice) * 100) / costBasisPrice).toFixed(2)
    const isPositive = percentIncrease > 0
    return (
        <TableRow key={stock.ticker}>
            <TableCell>
                <div>
                    <p>{stock.name}</p>
                    <p>{stock.ticker}</p>
                </div>
            </TableCell>
            <TableCell numeric>
                <p>{stock.percentage_weight}%</p>
            </TableCell>
            <TableCell numeric>
                <PercentChange data-isPositive={isPositive}>{isPositive && '+'}{percentIncrease}%</PercentChange>
            </TableCell>
            <TableCell numeric>
                <p>${costBasisPrice.toFixed(2)}</p>
            </TableCell>
            <TableCell numeric>
                <p>${stock.latest_price && stock.latest_price.toFixed(2)}</p>
            </TableCell>
            <TableCell numeric>
                <p>{stock.days_owned}</p>
            </TableCell>
        </TableRow>
    )
}

PortfolioItem.propTypes = {
    stock: PropTypes.object,
}

export default PortfolioItem
