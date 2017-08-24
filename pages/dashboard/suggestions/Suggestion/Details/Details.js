import React from 'react'
import PropTypes from 'prop-types'
import Dialog, { DialogTitle } from 'material-ui/Dialog'
import List, { ListItem } from 'material-ui/List'
import { ListItemStyles } from './styles'

const unitValues = {
    percent: '%',
}

const Details = ({ suggestion, ...otherProps }) => (
    <Dialog {...otherProps}>
        <DialogTitle>{suggestion.name}</DialogTitle>
        <List>
            {suggestion.advanced_data && suggestion.advanced_data.map(item => (
                <ListItem style={ListItemStyles} key={item.name}>
                    <h3>{item.display_name}:</h3>
                    <h3>{item.value}{unitValues[item.unit]}</h3>
                </ListItem>
            ))}
        </List>
    </Dialog>
)

Details.propTypes = {
    suggestion: PropTypes.object,
}

export default Details
