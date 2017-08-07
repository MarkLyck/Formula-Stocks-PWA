import styled from 'emotion/react'

export const PerformanceContainer = styled('div')`
    position: relative;
    & a[href="http://www.amcharts.com/javascript-charts/"] {
        display: none !important;
    }
`

export const Legend = styled('div')`
    text-transform: capitalize;
    position: relative;
    margin: 0;
    padding: 0;
    margin-bottom: 8px;
    font-size: 0.75rem;
    &:before {
        content: '';
        position: absolute;
        left: -28px;
        top: 0;
        background: ${props => props.color};
        height: 20px;
        width: 20px;
    }
`

export const Legends = styled('div')`
    position: absolute;
    left: 100px;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
`

export default null
