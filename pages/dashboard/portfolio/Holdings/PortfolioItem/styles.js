import styled from 'emotion/react'

export const PercentChange = styled('p')`
    position: relative;
    color: ${props => (props['data-isPositive'] ? props.theme.colors.secondary : props.theme.colors.error)};
    font-weight: 500;
`

export const NameCellWrapper = styled('div')`
    display: flex;
    align-items: center;
    padding: 8px;
    svg {
        margin-right: 16px;
        color: ${props => (props.isCash ? props.theme.colors.secondary : props.theme.colors.primary)};
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

export default null
