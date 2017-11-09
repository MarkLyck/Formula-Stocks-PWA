import styled from 'emotion/react'

export const AutoCompleteContainer = styled('div')`
    margin-bottom: 8px;
    width: 100%;
    overflow: visible;
    .suggestionsContainerOpen {
        position: absolute;
        left: 0;
        right: 0;
        margin-top: 8px;
        margin-bottom: 24px;
        z-index: 1000;
    }
`

export const dialogStyles = {
    display: 'flex',
    flexDirection: 'column',
}

export const nextBtnStyles = {
    marginTop: '8px',
    width: 'calc(100% - 30px)',
    maxWidth: '320px',
}

export default null
