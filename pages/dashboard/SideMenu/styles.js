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
    width: 100px;
    height: 100%;
    box-sizing: border-box;
    > button:last-child {
        position: absolute;
        bottom: 0;
    }
    .is-active {
        color: ${props => props.theme.colors.white};
        position: relative;
        width: 100%;
        background: ${props => props.theme.colors.gray};
        border-radius: 0;
        box-shadow: 0 2px 4px rgba(0,0,0,.08);
        &::after {
            content: '';
            background: ${props => props.theme.colors.primary};
            width: 8px;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }
        &:hover {
            color: ${props => props.theme.colors.white};
        }
    }
    @media (min-width: 1440px) {
        box-sizing: content-box;
        width: 210px;
        button {
            position: relative;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            padding-left: 20px;
            width: 100%;
            height: 72px;
            svg {
                font-size: 1.4rem;
            }
            h4 {
                position: absolute;
                left: calc(50px + 8px);
                top: 50%;
                transform: translateY(-50%);
                text-align: left;
                margin: 0;
                font-size: 1rem;
                font-weight: 400;
            }
        }
        > button:last-child {
            bottom: 0;
        }
    }
`

export default null
