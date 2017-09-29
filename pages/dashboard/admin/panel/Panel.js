import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import _ from 'lodash'
import StatisticsContainer from 'components/statisticsContainer'
import StatisticsBox from 'components/statisticsContainer/StatisticsBox'
import Admin from '../'
import VisitorList from './visitorList'

const uniqueVisitsFromOldSite = 6600

const getPayingSubscribers = allUsers => allUsers.filter(user => user.type === 'subscriber').length
const getActiveTrials = allUsers => allUsers.filter(user => user.type === 'trial').length
const getTrialConversionRate = (allUsers, activeTrials) => {
    const stayedThroughTrial = allUsers.filter((user) => {
        // if user cancelled AFTER the trial ended.
        // or if the user is currently a paying subscriber
        if ((_.get(user, 'stripe.subscriptions.data[0].trial_end')
                && user.stripe.subscriptions.data[0].canceled_at > user.stripe.subscriptions.data[0].trial_end)
                || (!_.get(user, 'stripe.subscriptions.data[0].canceled_at') && user.type === 'subscriber')) {
            return true
        }
        return false
    })
    // subtract active trials from the allUsers length as we don't know if they'll stay or not.
    const conversionRate = ((stayedThroughTrial.length) / (allUsers.length - activeTrials)) * 100
    return conversionRate
}

const Panel = ({ visitorCount, allUsers, allVisitors }) => {
    const uniqueVisitors = visitorCount.count + uniqueVisitsFromOldSite
    const activeTrials = getActiveTrials(allUsers)
    return (
        <Admin>
            <StatisticsContainer>
                <StatisticsBox title="Unique visitors" value={uniqueVisitors} icon="users" />
                <StatisticsBox title="Subscribers" value={getPayingSubscribers(allUsers)} icon="flask" />
                <StatisticsBox title="Trials" value={activeTrials} icon="hourglass-half" />
                <StatisticsBox title="Trial conversion rate" value={`${getTrialConversionRate(allUsers, activeTrials)}%`} icon="hourglass-end" />
            </StatisticsContainer>
            <VisitorList visitors={allVisitors} />
        </Admin>
    )
}

Panel.propTypes = {
    visitorCount: PropTypes.object,
    allUsers: PropTypes.array,
    allVisitors: PropTypes.array,
}

const VisitorsQuery = gql`
  query {
      visitorCount: _allVisitorsMeta {
        count
      }
      allVisitors(first: 20) {
          id
          createdAt
          location
          device
          url
      }
      allUsers {
        id
        name
        email
      },
  }
`

export default graphql(VisitorsQuery, {
    props: ({ data }) => ({ ...data }),
})(Panel)
