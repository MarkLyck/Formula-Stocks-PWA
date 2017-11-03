import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import Slide from 'material-ui/transitions/Slide'

function Transition(props) {
    return <Slide direction="up" {...props} />
}

const TermsOfService = ({ open, hideTerms }) => (
    <Dialog
        fullScreen
        open={open}
        onRequestClose={hideTerms}
        transition={Transition}
    >
        <AppBar>
            <Toolbar>
                <IconButton color="contrast" onClick={hideTerms} aria-label="Close">
                    <CloseIcon />
                </IconButton>
                <h3>Terms of Service</h3>
            </Toolbar>
        </AppBar>
        terms
    </Dialog>
)

TermsOfService.propTypes = {
    open: PropTypes.bool,
    hideTerms: PropTypes.func,
}

export default TermsOfService
