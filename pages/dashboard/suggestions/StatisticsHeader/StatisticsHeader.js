import React from 'react'
import PropTypes from 'prop-types'
import styled from 'emotion/react'
import theme from 'common/theme'

export const StatisticsHeaderContainer = styled('div')`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    div:first-child {
        background: ${props => props.theme.colors.primary}
        color: ${props => props.theme.colors.white}
    }
    div:nth-child(2) {
        background: ${props => props.theme.colors.white}
        color: ${props => props.theme.colors.primary}
    }
    div:nth-child(3) {
        background: ${props => props.theme.colors.secondary}
        color: ${props => props.theme.colors.white}
    }
    div:last-child {
        background: ${props => props.theme.colors.white}
        color: ${props => props.theme.colors.secondary}
    }
`

const StatisticsHeader = ({ children }) => (
    <StatisticsHeaderContainer theme={theme}>
        {children}
    </StatisticsHeaderContainer>
)

StatisticsHeader.propTypes = {
    children: PropTypes.node,
}

export default StatisticsHeader
