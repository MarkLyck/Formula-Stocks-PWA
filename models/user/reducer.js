import { SELECT_PLAN } from './constants'

const initialState = { selectedPlan: 'entry' }

export default (state, action) => {
    switch (action.type) {
    case SELECT_PLAN:
        return Object.assign({}, state, { selectedPlan: action.plan })
    default:
        return state || initialState
    }
}
