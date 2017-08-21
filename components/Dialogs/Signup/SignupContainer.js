import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Signup from './Signup'
// import { updatePlan } from './actions'

// function mapStateToProps(state) {
//     return { todos: state.todos }
// }

function mapDispatchToProps(dispatch) {
    const actions = { }
    return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(null, mapDispatchToProps)(Signup)
