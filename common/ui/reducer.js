import { TOGGLE_SIGNUP_MODAL, TOGGLE_LOGIN_MODAL } from './constants'

const initialState = {
    signupIsVisible: false,
    loginIsVisible: false,
}

export default (state, action) => {
    switch (action.type) {
    case TOGGLE_SIGNUP_MODAL:
        return Object.assign({}, state, { signupIsVisible: !state.signupIsVisible })
    case TOGGLE_LOGIN_MODAL:
        return Object.assign({}, state, { loginIsVisible: !state.loginIsVisible })
    default:
        return state || initialState
    }
}
