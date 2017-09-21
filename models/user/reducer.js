import apolloClient from 'lib/initApollo'
import { hasStorage } from 'common/featureTests'
import { SELECT_PLAN } from './constants'

let initialPlan = hasStorage ? localStorage.getItem('selectedPlan') : 'entry'
if (apolloClient().store) initialPlan = apolloClient().store.getState().user.selectedPlan

const initialState = { selectedPlan: initialPlan }

export default (state, action) => {
    switch (action.type) {
    case SELECT_PLAN:
        return Object.assign({}, state, { selectedPlan: action.plan })
    default:
        return state || initialState
    }
}
