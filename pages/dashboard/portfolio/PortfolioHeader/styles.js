import styled from 'emotion/react'

export const GraphContainer = styled('div')`
    position: relative;
    width: 100%;
    height: 400px;
    br {
        display: none;
    }
    #portfolio-graph {
        height: 100%;
    }
    .chart-balloon {
        display: flex;
        flex-direction: column;
        align-items: center;
        .plan-name {
            color: ${props => props.theme.colors.primary};
            font-size: 0.8rem;
        }
        .balloon-value {
            font-size: 1rem;
            text-align: center;
        }
    }
`

export const headerStyle = {
    display: 'flex',
    marginBottom: '32px',
}


export const RightSide = styled('div')`
    display: flex;
    flex-direction: column;
`

export default null
