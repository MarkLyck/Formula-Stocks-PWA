import styled from 'emotion/react'

export const MenuList = styled('ul')`
    position: relative;
    background: ${props => props.theme.colors.darkGray};
    border-right: 1px solid ${props => props.theme.colors.gray};
    box-shadow: 2px 0 4px rgba(0,0,0,0.25);
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 2px;
    padding-top: 16px;
    width: 84px;
    height: 100%;
    > button:last-child {
        position: absolute;
        bottom: 8px;
        margin-bottom: 0;
    }
`

export default null
