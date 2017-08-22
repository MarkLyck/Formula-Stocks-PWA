import { TOGGLE_SIGNUP_MODAL } from './constants'

const initialState = {
    signupIsVisible: false,
}

export default (state, action) => {
    switch (action.type) {
    case TOGGLE_SIGNUP_MODAL:
        return Object.assign({}, state, { signupIsVisible: !state.signupIsVisible })
    default:
        return state || initialState
    }
}
