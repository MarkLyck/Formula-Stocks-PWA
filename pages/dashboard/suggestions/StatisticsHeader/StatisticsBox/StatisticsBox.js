import React from 'react'
import PropTypes from 'prop-types'
import styled from 'emotion/react'

export const Box = styled('div')`
    display: flex;
    align-items: center;
    padding: 8px;
    height: 64px;
    width: 100%;
    margin: 0 8px;
`

const StatisticsBox = ({ title, icon }) => (
    <Box>
        <h5>{title}</h5>
        <i className={icon} />
    </Box>
)

StatisticsBox.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
}

export default StatisticsBox
