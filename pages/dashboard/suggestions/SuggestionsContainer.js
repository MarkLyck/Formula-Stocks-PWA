import { connect } from 'react-redux'
import Suggestions from './Suggestions'

const mapStateToProps = state => ({ selectedPlan: state.user.selectedPlan })

export default connect(mapStateToProps, null)(Suggestions)
