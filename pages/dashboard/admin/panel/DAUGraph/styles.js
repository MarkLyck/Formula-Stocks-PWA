import styled from 'emotion/react'

export const GraphContainer = styled('div')`
    position: relative;
    .chart-balloon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .plan-name {
            color: ${props => props.theme.colors.primary};
            font-size: 1rem;
        }
        .balloon-value {
            font-size: 1.25rem;
            text-align: center;
        }
    }
`

export default null
