import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { newArticle } from './actions'
import NewArticle from './NewArticle'

const mapDispatchToProps = (dispatch) => {
    const actions = { newArticle }
    return { actions: bindActionCreators(actions, dispatch) }
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (entryPlan)
export default connect(null, mapDispatchToProps)(NewArticle)
