import styled from 'emotion/react'

export const PercentChange = styled('p')`
    position: relative;
    color: ${props => (props['data-ispositive'] ? props.theme.colors.secondary : props.theme.colors.error)};
    font-weight: 500;
`

export const NameCellWrapper = styled('div')`
    display: flex;
    align-items: center;
    padding: 8px;
    svg {
        margin-right: 16px;
        color: ${props => (props['data-iscash'] ? props.theme.colors.secondary : props.theme.colors.primary)};
        font-size: 1.4rem;
    }
    p {
        font-size: 0.9rem;
        font-weight: 300;
    }
    .stock-name {
        margin-bottom: 4px;
    }
    .stock-ticker {
        font-weight: 500;
    }
`

export const GraphContainer = styled('div')`
    position: relative;
    br {
        display: none;
    }
    #stock-graph {
        height: 100%;
    }
    .stock-portfolio-graph {
        height: 300px;
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

export const LoadingContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 300px;
    svg {
        color: ${props => props.theme.colors.primary};
    }
    h4 {
        margin-top: 16px;
    }
`

export const FailedContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 300px;
    margin: 16px;
    border: 2px dashed ${props => props.theme.colors.lightGray};
    svg {
        color: ${props => props.theme.colors.lightGray};
    }
    h4 {
        margin-top: 16px;
        color: ${props => props.theme.colors.lightGray};
    }
`

export default null
