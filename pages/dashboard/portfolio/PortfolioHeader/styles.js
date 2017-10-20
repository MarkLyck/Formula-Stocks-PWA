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
    width: 240px;
    padding: 16px;
    .results {
        margin-bottom: 16px;
        h3 {
            font-weight: 500;
        }
        p {
            font-size: 0.9rem;
            span {
                font-weight: 500;
            }
        }
    }
    .plan-results {
        h3 {
            color: ${props => props.theme.colors.primary};
        }
        span {
            color: ${props => props.theme.colors.primary};
        }
    }
    .stock-allocation {
        position: relative;
        margin-top: auto;
        width: 100%;
        height: 160px;
        &::after {
            content: 'allocation';
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
`

export const LeftSide = styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-right: 1px solid ${props => props.theme.colors.lightGray};
    h4 {
        font-weight: 400;
        font-size: 1.2rem;
        margin: 16px;
    }
`

export default null
