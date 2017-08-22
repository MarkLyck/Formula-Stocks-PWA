import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleSignupModal } from 'common/ui/actions'
import NavBar from './NavBar'

const mapStateToProps = state => state
const mapDispatchToProps = (dispatch) => {
    const actions = { toggleSignupModal }
    return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
