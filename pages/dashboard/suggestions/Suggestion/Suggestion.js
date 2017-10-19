import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import Card, { CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Slide from 'material-ui/transitions/Slide'
import theme from 'common/theme'
import ListItem from './ListItem'
import Details from './Details'
import StockChart from './StockChart'
import { SuggContainer, CardContentStyles, SuggHeader, ContentContainer, StockInfoList, Placeholder } from './styles'

class Suggestion extends Component {
    state = { detailsIsVisible: false, stockFetchFailed: false }

    componentDidMount() {
        this.props.refetch({ ticker: this.props.suggestion.ticker })
        window.setTimeout(() => this.checkFetchStatus(), 10000)
    }

    checkFetchStatus() {
        if (!this.props.allStocks.length) {
            this.setState({ stockFetchFailed: true })
        }
    }

    toggleDetails = () => this.setState({ detailsIsVisible: !this.state.detailsIsVisible })
    render() {
        const { suggestion, allStocks } = this.props
        const { detailsIsVisible, stockFetchFailed } = this.state

        const stock = allStocks ? allStocks[0] : {}

        const suggestedPriceText = suggestion.action === 'BUY' ? 'Buy at' : 'Sell at'
        const allocationText = suggestion.percentage_weight ? 'Cash allocation' : 'Portfolio allocation'
        const allocation = suggestion.percentage_weight ? suggestion.percentage_weight : suggestion.portfolio_weight
        const latestPrice = stock ? stock.latestPrice : suggestion.suggested_price.toFixed(2)

        return (
            <SuggContainer>
                <SuggHeader theme={theme}>
                    <h3>{suggestion.name}</h3>
                    <h3 className={`${suggestion.action}-action action`}>{suggestion.action}</h3>
                </SuggHeader>
                <Card>
                    <CardContent style={CardContentStyles}>
                        <ContentContainer>
                            <StockInfoList theme={theme}>
                                <ListItem name="Ticker" value={suggestion.ticker} />
                                <ListItem name={suggestedPriceText} value={`$${suggestion.suggested_price.toFixed(2)}`} />
                                <ListItem name="Last price" value={`$${latestPrice}`} />
                                { suggestion.action === 'BUY'
                                    && <ListItem name={allocationText} value={`${allocation.toFixed(2)}%`} />}
                                { suggestion.action === 'SELL'
                                    && <ListItem name="Purchase price" value={`$${suggestion.original_purchase.toFixed(2)}`} />}
                                {suggestion.advanced_data
                                    ? <Button color="primary" dense onClick={this.toggleDetails}>Details</Button>
                                    : <Placeholder />
                                }
                            </StockInfoList>
                            <StockChart
                                sixMonthsPrices={stock ? stock.sixMonthsPrices : []}
                                ticker={suggestion.ticker}
                                suggestedPrice={suggestion.suggested_price}
                                action={suggestion.action}
                                stockFetchFailed={stockFetchFailed}
                            />
                        </ContentContainer>
                    </CardContent>
                    <Details
                        suggestion={suggestion}
                        open={detailsIsVisible}
                        transition={Slide}
                        onRequestClose={this.toggleDetails}
                    />
                </Card>
            </SuggContainer>
        )
    }
}

const SuggestionQuery = gql`
  query SuggestionQuery($ticker: String) {
    allStocks(filter: {
        ticker: $ticker
    }) {
        ticker
        latestPrice
        sixMonthsPrices
    }
  }
`

Suggestion.propTypes = {
    suggestion: PropTypes.object,
    allStocks: PropTypes.array,
    refetch: PropTypes.func,
}

export default graphql(SuggestionQuery, {
    options: {
        variables: { ticker: '' },
    },
    props: ({ data }) => ({ ...data }),
})(Suggestion)
