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
    box-sizing: border-box;
    button {
        height: 56px;
    }
    > button:last-child {
        position: absolute;
        bottom: 8px;
        margin-bottom: 0;
    }
    .is-active {
        background: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.white};
        &:hover {
            color: ${props => props.theme.colors.white};
        }
    }
    @media (min-width: 1440px) {
        box-sizing: content-box;
        width: 210px;
        padding: 0 16px;
        button {
            position: relative;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            height: 56px;
            margin-top: 16px;
            margin-bottom: 16px;
            svg {
                margin: 0;
                margin-right: 12px;
                font-size: 1.5rem;
            }
            h4 {
                position: absolute;
                left: 50px;
                top: 50%;
                transform: translateY(-50%);
                text-align: left;
                margin: 0;
                font-size: 1rem;
                font-weight: 400;
            }
        }
        > button:first-child {
            margin-top: 16px;
        }
        > button:last-child {
            bottom: 8px;
            left: 16px;
        }
    }
`

export default null
