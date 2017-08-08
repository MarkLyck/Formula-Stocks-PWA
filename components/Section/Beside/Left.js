import styled from 'emotion/react'

const Left = styled('div')`
    width: calc(50% - 16px);
    max-width: inherit;
    margin-right: 32px;
    display: flex;
    flex-direction: column;
    align-items: ${props => (props['data-center'] ? 'center' : 'flex-start')};
`

export default Left
