import React from 'react'
import PropTypes from 'prop-types'
import theme from 'common/theme'
import { Statistics } from './styles'

const StatisticsContainer = ({ children }) => (
    <Statistics theme={theme}>
        {children}
    </Statistics>
)

StatisticsContainer.propTypes = {
    children: PropTypes.node,
}

export default StatisticsContainer
