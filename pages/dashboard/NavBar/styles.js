import styled from 'emotion/react'

export const Bar = styled('div')`
    height: 64px;
    padding: 0 24px;
    width: 100%;
    margin-bottom: 16px;
    box-shadow: 0 2px 4px rgba(0,0,0,.08);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${props => props.theme.colors.white};
    button {
        margin-right: 8px;
    }
`

export default null
