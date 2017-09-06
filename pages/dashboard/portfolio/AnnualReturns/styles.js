import styled from 'emotion/react'

export const ContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '32px',
}

export const Divider = styled('div')`
    background: ${props => props.theme.colors.black};
    width: 2px;
    height: 32px;
`

export default null
