import styled from 'emotion/react'

export const Button = styled('button')`
    position: relative;
    margin-bottom: 32px;
    width: 56px;
    height: 56px;
    padding: 12px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: none;
    border: none;
    color: ${props => props.theme.colors.lightGray};
    background: ${props => (props['data-isActive'] ? props.theme.colors.primary : 'none')};
    color: ${props => (props['data-isActive'] ? props.theme.colors.white : props.theme.colors.lightGray)};
    outline: none;
    svg {
        font-size: 24px;
        margin-bottom: 6px;
    }
    &:hover {
        cursor: pointer;
        color: ${props => (props['data-isActive'] ? props.theme.colors.white : props.theme.colors.primary)};
    }
`

export default null
