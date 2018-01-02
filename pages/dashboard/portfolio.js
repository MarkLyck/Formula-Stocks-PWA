import withMaterial from 'lib/withMaterial'
import withData from 'lib/withData'
import Dashboard from 'components/Dashboard'
import Portfolio from 'components/Dashboard/portfolio'

const container = () => (
    <Dashboard>
        <Portfolio />
    </Dashboard>
)

export default withData(withMaterial(container))
