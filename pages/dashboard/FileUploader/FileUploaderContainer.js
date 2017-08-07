import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FileUploader from './FileUploader'
import { updatePlan } from './actions'

function mapDispatchToProps(dispatch) {
    const actions = { updatePlan }
    return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(null, mapDispatchToProps)(FileUploader)
