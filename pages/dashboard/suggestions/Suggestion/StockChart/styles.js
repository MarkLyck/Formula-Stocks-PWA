import styled from 'emotion/react'

export const GraphContainer = styled('div')`
    position: relative;
    width: 100%;
    .suggestion-graph {
        height: 100%;
    }
    br {
        display: none;
    }
    .chart-balloon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .ticker-name {
            color: ${props => props.theme.colors.primary};
            font-size: 0.8rem;
            margin: 0;
            padding: 0;
        }
        .SELL-ticker-name {
            color: ${props => props.theme.colors.secondary};
        }
        .balloon-value {
            font-size: 1rem;
            text-align: center;
            margin: 0;
            padding: 0;
        }
    }
`

export default null
