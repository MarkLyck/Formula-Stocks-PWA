import styled from 'emotion/react'

export const Button = styled('button')`
    position: relative;
    margin-bottom: 32px;
    width: 56px;
    padding: 12px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: none;
    border: none;
    background: none;
    color: ${props => props.theme.colors.lightGray};
    outline: none;
    svg {
        font-size: 24px;
        margin-bottom: 6px;
    }
    h4 {
        min-width: 50px;
        display: block;
        text-align: center;
        font-weight: 600;
        font-size: 11px;
        margin: 0;
        margin-top: 8px;
      }
    &:hover {
        cursor: pointer;
        color: ${props => props.theme.colors.primary};
    }
`

export default null
