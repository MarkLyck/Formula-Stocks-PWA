import React from 'react'
import PropTypes from 'prop-types'
import PieChart from 'components/graphs/PieChart'
import { adjustBrightness } from 'common/helpers'

const Allocation = ({ portfolio, id }) => {
    const colors = []
    const allocation = portfolio.map((stock) => {
        if (stock.latest_price > (stock.purchase_price - stock.dividends)) {
            const amount = Math.round((Math.random() * 80) - 40)
            colors.push(adjustBrightness('#27A5F9', amount))
        } else if (stock.ticker === 'CASH') {
            colors.push('#12D99E')
        } else {
            colors.push('#49494A')
        }
        return {
            title: stock.ticker,
            value: Number(stock.percentage_weight.toFixed(2)),
        }
    })

    console.log(allocation)
    console.log(colors)

    return (
        <PieChart
            className="stock-allocation"
            title="Allocation"
            colors={colors}
            data={allocation}
            id={id}
            unit="%"
        />
    )
}

Allocation.propTypes = {
    portfolio: PropTypes.array,
    id: PropTypes.string,
}

export default Allocation
