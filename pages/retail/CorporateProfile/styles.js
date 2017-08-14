import styled from 'emotion/react'

export const cardStyle = {
    height: '73px',
    display: 'flex',
    marginBottom: '12px',
    width: '100%',
}

export const ProfileImg = styled('img')`
    height: 100%;
    width: auto;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    margin-right: 12px;
`

export const ProfileTextContainer = styled('div')`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h5 {
        margin: 0;
    }
    p {
        margin: 0;
    }
`

export default null
