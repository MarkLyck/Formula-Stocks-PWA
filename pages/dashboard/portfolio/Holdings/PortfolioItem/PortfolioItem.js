import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import theme from 'common/theme'
import { TableBody, TableRow, TableCell } from 'material-ui/Table'
import PortfolioitemGraph from './PortfolioItemGraph'
import { PercentChange, NameCellWrapper } from './styles'

<<<<<<< HEAD
const PortfolioItem = ({ stock }) => {
    const costBasisPrice = stock.purchase_price - stock.dividends
    const percentIncrease = (((stock.latest_price - costBasisPrice) * 100) / costBasisPrice).toFixed(2)
    const isPositive = percentIncrease > 0
    const isCash = stock.ticker === 'CASH'
    const TableCellPadding = { padding: '0 16px' }

    return (
        <TableRow key={stock.ticker} style={{ fontWeight: '500' }} className={isCash ? 'cash-row' : ''}>
            <TableCell style={TableCellPadding}>
                <NameCellWrapper data-isCash={isCash}>
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
=======
class PortfolioItem extends Component {
    state = {
        isExpanded: false,
        stockFetchFailed: false,
    }

    checkFetchStatus() {
        if (!this.props.allStocks.length) {
            this.setState({ stockFetchFailed: true })
        }
    }

    toggleExpandStock = () => {
        if (this.props.stock.ticker === 'CASH') return
        this.setState({ isExpanded: !this.state.isExpanded })
        if (!this.props.allStocks.length) {
            this.props.refetch({ ticker: this.props.stock.ticker })
            window.setTimeout(() => this.checkFetchStatus(), 10000)
        }
    }

    render() {
        const { stock, allStocks } = this.props
        const { isExpanded, stockFetchFailed } = this.state

        const costBasisPrice = stock.purchase_price - stock.dividends
        const percentIncrease = (((stock.latest_price - costBasisPrice) * 100) / costBasisPrice).toFixed(2)
        const isPositive = percentIncrease > 0
        const isCash = stock.ticker === 'CASH'
        const TableCellPadding = { padding: '0 16px' }

        return (
            <TableBody style={{ color: theme.colors.text }}>
                <TableRow
                    key={stock.ticker}
                    style={{ fontWeight: '500' }}
                    className={isCash ? 'cash-row' : 'stock-row'}
                    onClick={this.toggleExpandStock}
                >
                    <TableCell style={TableCellPadding}>
                        <NameCellWrapper data-isCash={isCash}>
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
                {
                    isExpanded && (
                        <TableRow>
                            <TableCell colSpan={6} style={{ padding: 0, maxWidth: 'calc(100vw - 124px)' }}>
                                <PortfolioitemGraph
                                    historicPrices={allStocks[0] && allStocks[0].historicPrices}
                                    ticker={stock.ticker}
                                    costBasis={costBasisPrice}
                                    stockFetchFailed={stockFetchFailed}
                                />
                            </TableCell>
                        </TableRow>
                    )
>>>>>>> bc8c91287822d99b85025d4aa8b6fd8054ae103c
                }
            </TableBody>
        )
    }
}

const PortfolioStockQuery = gql`
  query PortfolioStockQuery($ticker: String) {
    allStocks(filter: {
        ticker: $ticker
    }) {
        historicPrices
    }
  }
`

PortfolioItem.propTypes = {
    stock: PropTypes.object,
    allStocks: PropTypes.array,
    refetch: PropTypes.func,
}

export default graphql(PortfolioStockQuery, {
    options: {
        variables: { ticker: '' },
    },
    props: ({ data }) => ({ ...data }),
})(PortfolioItem)
