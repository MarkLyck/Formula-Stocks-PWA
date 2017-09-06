import styled from 'emotion/react'

export const PercentChange = styled('p')`
    position: relative;
    color: ${props => (props['data-isPositive'] ? props.theme.colors.secondary : props.theme.colors.error)};
    font-weight: 600;
`

export default null
