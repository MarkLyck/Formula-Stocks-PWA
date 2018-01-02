import styled from 'emotion/react'

export const ContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '32px',
}

export const Divider = styled('div')`
    background: ${props => props.theme.colors.fadedGray};
    width: 2px;
    height: 32px;
    @media(max-width: 600px) {
        &:nth-child(2) {
            display: none;
        }
    }
    @media(max-width: 500px) {
        &:nth-child(4) {
            display: none;
        }
    }
`

export default null
