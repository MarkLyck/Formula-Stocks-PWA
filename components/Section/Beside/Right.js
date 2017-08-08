import styled from 'emotion/react'

const Right = styled('div')`
    max-width: calc(50% - 16px);
    margin-left: 32px;
    display: flex;
    flex-direction: column;
    align-items: ${props => (props['data-center'] ? 'center' : 'flex-start')};
`

export default Right
