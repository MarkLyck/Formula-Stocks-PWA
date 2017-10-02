import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { gql, graphql } from 'react-apollo'
import _ from 'lodash'
import StatisticsContainer from 'components/statisticsContainer'
import StatisticsBox from 'components/statisticsContainer/StatisticsBox'
import Admin from '../'
import DAUGraph from './DAUGraph'
import VisitorList from './visitorList'

const uniqueVisitsFromOldSite = 6600

const getPayingSubscribers = allUsers => allUsers && allUsers.filter(user => user.type === 'subscriber').length
const getActiveTrials = allUsers => allUsers && allUsers.filter(user => user.type === 'trial').length
const getTrialConversionRate = (allUsers, activeTrials) => {
    if (!allUsers) return 0
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
    const uniqueVisitors = visitorCount ? (visitorCount.count + uniqueVisitsFromOldSite) : ''
    const activeTrials = getActiveTrials(allUsers)
    return (
        <Admin>
            <StatisticsContainer>
                <StatisticsBox title="Unique visitors" value={uniqueVisitors} icon="users" />
                <StatisticsBox title="Subscribers" value={getPayingSubscribers(allUsers)} icon="flask" />
                <StatisticsBox title="Trials" value={activeTrials} icon="hourglass-half" />
                <StatisticsBox title="Trial conversion rate" value={`${getTrialConversionRate(allUsers, activeTrials)}%`} icon="hourglass-end" />
            </StatisticsContainer>
            <DAUGraph visitors={allVisitors} users={allUsers} />
            <VisitorList visitors={allVisitors} />
        </Admin>
    )
}

Panel.propTypes = {
    visitorCount: PropTypes.object,
    allUsers: PropTypes.array,
    allVisitors: PropTypes.array,
}

const date30DaysAgo = moment().subtract(30, 'days').format('YYYY-MM-DD')

const VisitorsQuery = gql`
  query {
      visitorCount: _allVisitorsMeta {
        count
      }
      allVisitors(filter: {
        createdAt_gte: "${date30DaysAgo}",
      }) {
          id
          createdAt
          location
          device
          url
      }
      allUsers {
        id
        createdAt
        name
        email
      },
  }
`

export default graphql(VisitorsQuery, {
    props: ({ data }) => ({ ...data }),
})(Panel)
