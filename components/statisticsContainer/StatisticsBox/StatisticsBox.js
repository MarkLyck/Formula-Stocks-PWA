import React from 'react'
import PropTypes from 'prop-types'
import styled from 'emotion/react'

export const Box = styled('div')`
    display: flex;
    align-items: center;
    padding: 8px;
    height: 125px;
    width: 100%;
    margin: 0 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,.16);
    transition: transform .3s;
    &:hover {
        transform: scale(1.05);
    }
`

export const Content = styled('div')`
    background: none;
    width: 68%;
    border-left: 1px solid hsla(0,0%,100%,.2);
    padding-left: 10%;
`

export const Symbol = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    font-size: 25px;
    i {
        font-size: 25px;
    }
`

const StatisticsBox = ({ title, value, icon }) => (
    <Box>
        <Symbol>
            <i className={`fa fa-${icon}`} />
        </Symbol>
        <Content>
            <h5>{value}</h5>
            <h5>{title}</h5>
        </Content>
    </Box>
)

StatisticsBox.propTypes = {
    title: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    icon: PropTypes.string,
}

export default StatisticsBox
