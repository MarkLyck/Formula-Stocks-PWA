import styled from 'emotion/react'
import Dropzone from 'react-dropzone'

export const containerStyles = {
    padding: '16px',
    margin: '16px',
}

export const FileDrop = styled(Dropzone)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 350px;
    border: 2px dashed ${props => props.theme.colors.primary};
`

export default null
