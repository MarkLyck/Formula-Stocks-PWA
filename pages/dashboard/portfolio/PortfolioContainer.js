import { connect } from 'react-redux'
import Portfolio from './Portfolio'

const mapStateToProps = state => ({ selectedPlan: state.user.selectedPlan })

export default connect(mapStateToProps, null)(Portfolio)
