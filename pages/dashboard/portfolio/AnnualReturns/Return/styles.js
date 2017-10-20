import styled from 'emotion/react'

export const TextContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 8px 0;
    width: calc(100% / 4);
    h3 {
        font-weight: 300;
    }
    h4 {
        color: ${props => props.theme.colors.secondary};
        font-weight: 600;
    }
    @media(max-width: 600px) {
        width: calc(100% / 3);
        &:first-child {
            display: none;
        }
    }
    @media(max-width: 500px) {
        width: calc(100% / 2);
        &:nth-child(3) {
            display: none;
        }
    }
`

export default null
