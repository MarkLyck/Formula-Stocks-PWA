import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectPlan } from 'models/user/actions'

import NavBar from './NavBar'

const mapStateToProps = state => ({ selectedPlan: state.user.selectedPlan })

const mapDispatchToProps = (dispatch) => {
    const actions = { selectPlan }
    return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
