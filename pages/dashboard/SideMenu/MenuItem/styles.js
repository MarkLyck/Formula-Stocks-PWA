import styled from 'emotion/react'

export const Button = styled('button')`
    position: relative;
    margin-top: 40px;
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
    &:hover {
        cursor: pointer;
    }
`

export default null
