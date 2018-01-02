import withMaterial from 'lib/withMaterial'
import withData from 'lib/withData'
import Dashboard from 'components/Dashboard'
import Suggestions from 'components/Dashboard/suggestions'

const container = () => (
    <Dashboard>
        <Suggestions />
    </Dashboard>
)

export default withData(withMaterial(container))
