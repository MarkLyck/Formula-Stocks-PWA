import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Slide from 'material-ui/transitions/Slide'
import ListItem from './ListItem'
import Details from './Details'
import { SuggStyles, SuggHeader } from './styles'

class Suggestion extends Component {
    state = { detailsIsVisible: false }

    toggleDetails = () => this.setState({ detailsIsVisible: !this.state.detailsIsVisible })
    render() {
        const { suggestion } = this.props
        const { detailsIsVisible } = this.state
        console.log(suggestion)
        const suggestedPriceText = suggestion.action === 'BUY' ? 'Buy at' : 'Sell at'
        const allocationText = suggestion.percentage_weight ? 'Cash allocation' : 'Portfolio allocation'
        const allocation = suggestion.percentage_weight ? suggestion.percentage_weight : suggestion.portfolio_weight

        return (
            <Card style={SuggStyles}>
                <CardContent>
                    <SuggHeader>
                        <h3>{suggestion.name}</h3>
                        <h3>{suggestion.action}</h3>
                    </SuggHeader>
                    <ul>
                        <ListItem name="Ticker" value={suggestion.ticker} />
                        <ListItem name={suggestedPriceText} value={`$${suggestion.suggested_price.toFixed(2)}`} />
                        <ListItem name="Last price" value={`$${suggestion.suggested_price.toFixed(2)}`} />
                        { suggestion.action === 'BUY' && <ListItem name={allocationText} value={`${allocation.toFixed(2)}%`} />}
                        { suggestion.action === 'SELL' && <ListItem name="Purchase price" value={`$${suggestion.original_purchase.toFixed(2)}`} />}
                    </ul>
                </CardContent>
                {suggestion.advanced_data && (
                    <CardActions>
                        <Button dense onClick={this.toggleDetails}>Details</Button>
                    </CardActions>
                )}
                <Details
                    suggestion={suggestion}
                    open={detailsIsVisible}
                    transition={Slide}
                    onRequestClose={this.toggleDetails}
                />
            </Card>
        )
    }
}

Suggestion.propTypes = {
    suggestion: PropTypes.object,
}

export default Suggestion
