import React from 'react'
import PropTypes from 'prop-types'
import { TableCell, TableRow } from 'material-ui/Table'
import { PercentChange, NameCellWrapper } from './styles'

const PortfolioItem = ({ stock }) => {
    const costBasisPrice = stock.purchase_price - stock.dividends
    const percentIncrease = (((stock.latest_price - costBasisPrice) * 100) / costBasisPrice).toFixed(2)
    const isPositive = percentIncrease > 0
    const isCash = stock.ticker === 'CASH'
    const TableCellPadding = { padding: '0 16px' }

    return (
        <TableRow key={stock.ticker} style={{ fontWeight: '500' }} className={isCash ? 'cash-row' : ''}>
            <TableCell style={TableCellPadding}>
                <NameCellWrapper isCash={isCash}>
                    <i className={`fa fa-fw fa-${isCash ? 'dollar-sign' : 'flask'}`} />
                    <div>
                        {!isCash && <p className="stock-name">{stock.name}</p>}
                        <p className="stock-ticker">{stock.ticker}</p>
                    </div>
                </NameCellWrapper>
            </TableCell>
            <TableCell numeric style={TableCellPadding} className="allocation">
                <p>{stock.percentage_weight}%</p>
            </TableCell>
            <TableCell numeric style={TableCellPadding}>
                {!isNaN(percentIncrease)
                    ? <PercentChange data-isPositive={isPositive}>{isPositive && '+'}{percentIncrease}%</PercentChange>
                    : ''
                }
            </TableCell>
            <TableCell numeric style={TableCellPadding} className="cost-basis">
                {!isNaN(costBasisPrice) ? <p>${costBasisPrice.toFixed(2)}</p> : ''}
            </TableCell>
            <TableCell numeric style={TableCellPadding} className="last-price">
                {!isNaN(stock.latest_price) ? <p>${stock.latest_price && stock.latest_price.toFixed(2)}</p> : ''}
            </TableCell>
            <TableCell numeric style={TableCellPadding} className="days-owned">
                <p>{stock.days_owned}</p>
            </TableCell>
        </TableRow>
    )
}

PortfolioItem.propTypes = {
    stock: PropTypes.object,
}

export default PortfolioItem
