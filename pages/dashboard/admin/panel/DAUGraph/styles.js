import styled from 'emotion/react'

export const GraphContainer = styled('div')`
    position: relative;
    width: calc(100% - 24px);
    margin: 0 auto;
    .chart-balloon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .balloon-value {
            font-size: 1.25rem;
            text-align: center;
        }
    }
`

export default null
