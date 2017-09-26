import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import platform from 'platform'
import fetchJsonP from 'fetch-jsonp'
import _ from 'lodash'
import { hasStorage } from 'common/featureTests'

import Signup from 'components/Dialogs/Signup'
import Login from 'components/Dialogs/Login'
import NavBar from 'components/NavBar'

import Hero from './Hero'
import Introduction from './Introduction'
import WhatIsIt from './WhatIsIt'
import Performance from './Performance'
import PerformanceMatters from './PerformanceMatters'
import FirstMonthOnus from './FirstMonthOnUs'
import WhatToExpect from './WhatToExpect'
import PilotProgram from './PilotProgram'
import BacktestedPerformance from './BacktestedPerformance'
import Statistics from './Statistics'
import HowWeBeatTheMarket from './HowWeBeatTheMarket'
import RiskManagement from './RiskManagement'
import CorporateProfile from './CorporateProfile'
import IntendedAudience from './IntendedAudience'
import ScrolledToBottom from './ScrolledToBottom'
import Footer from './Footer'

class Retail extends React.PureComponent {
    state = {
        showSignup: false,
        showLogin: false,
        showTerms: false,
    }

    componentDidMount() {
        if (hasStorage && !localStorage.getItem('visitorID')) this.newVisit()
    }

    newVisit = () => {
        const { createVisitor } = this.props

        fetchJsonP('https://freegeoip.net/json')
            .then(response => response.json())
            .then((location) => {
                createVisitor({
                    variables: {
                        url: document.referrer,
                        device: {
                            os: platform.os.family,
                            product: platform.product,
                            browser: platform.name,
                        },
                        location,
                    },
                }).then((data) => {
                    if (hasStorage) localStorage.setItem('visitorID', data.data.createVisitor.id)
                })
            })
    }

    render() {
        const { Plan, SP500, DJIA, ui, actions } = this.props
        const portfolioReturn = _.get(Plan, 'launchStatistics.total_return')
        const winRatio = _.get(Plan, 'statistics.winRatio')
        const avgGain = _.get(Plan, 'info.avgGainPerPosition')
        const avgLoss = _.get(Plan, 'info.avgLossPerPosition')

        return (
            <div>
                <NavBar />
                <Hero portfolioReturn={portfolioReturn} winRatio={winRatio} />
                <Introduction portfolioReturn={portfolioReturn} winRatio={winRatio} planName={Plan.name} />
                <WhatIsIt />
                <Performance portfolioYields={Plan.portfolioYields} marketPrices={DJIA.pricesSince2009} planName={Plan.name} />
                <PerformanceMatters />
                <FirstMonthOnus />
                <WhatToExpect latestSells={Plan.latestSells} />
                <PilotProgram />
                <BacktestedPerformance backtestedData={Plan.backtestedData} marketPrices={SP500.longtermPrices} planName={Plan.name} />
                <Statistics winRatio={winRatio} planName={Plan.name} avgGain={avgGain} avgLoss={avgLoss} />
                <HowWeBeatTheMarket />
                <RiskManagement />
                <CorporateProfile />
                <IntendedAudience />
                <ScrolledToBottom />
                <Footer />

                {ui.signupIsVisible && <Signup onRequestClose={actions.toggleSignupModal} open />}
                {ui.loginIsVisible && <Login onRequestClose={actions.toggleLoginModal} open />}
            </div>
        )
    }
}

Retail.defaultProps = {
    Plan: {},
    SP500: {},
    DJIA: {},
    ui: {},
    actions: {},
}

Retail.propTypes = {
    Plan: PropTypes.object,
    SP500: PropTypes.object,
    DJIA: PropTypes.object,
    actions: PropTypes.object,
    ui: PropTypes.object,
    createVisitor: PropTypes.func,
}

const createVisitor = gql`
  mutation ($url: String, $device: Json, $location: Json) {
    createVisitor(
    url: $url,
    device: $device,
    location: $location,
    ) { id }
  }
`
export default graphql(createVisitor, { name: 'createVisitor' })(Retail)
