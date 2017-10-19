import styled from 'emotion/react'

export const ContainerStyle = {
    margin: '16px',
}

export const GraphContainer = styled('div')`
    position: relative;
    width: 100%;
    br {
        display: none;
    }
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
