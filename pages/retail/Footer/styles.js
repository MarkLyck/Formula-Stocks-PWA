import styled from 'emotion/react'

export const FooterContainer = styled('footer')`
    background: ${props => props.theme.colors.gray};
    p {
        color: ${props => props.theme.colors.white};
    }
`

export const CopyRightContainer = styled('footer')`
    background: ${props => props.theme.colors.darkGray};
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        margin-right: 32px;
        margin-left: 32px;
        height: 100%;
        width: auto;
    }
`

export default null
