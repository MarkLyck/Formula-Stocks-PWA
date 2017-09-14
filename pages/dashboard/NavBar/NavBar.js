import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import { hasStorage } from 'common/featureTests'
import Logo from './logo_horizontal.svg'
import { Bar } from './styles'


const setPlan = (plan) => {
    if (hasStorage) localStorage.setItem('selectedPlan', plan)
}

const isSelected = (plan) => {
    let selectedPlan
    if (hasStorage) {
        selectedPlan = localStorage.getItem('selectedPlan')
    }
    return selectedPlan === plan
}

const NavBar = ({ selectedPlan, actions }) => (
    <Bar>
        <div>
            <Button
                color="primary"
                raised={isSelected(selectedPlan, 'entry')}
                onClick={() => setPlan('entry', actions.selectPlan)}
            >
                Entry
            </Button>
            <Button
                color="primary"
                raised={isSelected(selectedPlan, 'premium')}
                onClick={() => setPlan('premium', actions.selectPlan)}
            >
                Premium
            </Button>
            <Button
                color="primary"
                raised={isSelected(selectedPlan, 'business')}
                onClick={() => setPlan('business', actions.selectPlan)}
            >
                Business
            </Button>
            <Button
                color="primary"
                raised={isSelected(selectedPlan, 'fund')}
                onClick={() => setPlan('fund', actions.selectPlan)}
            >
                Fund
            </Button>
        </div>
        <Logo />
    </Bar>
)

NavBar.propTypes = {
    selectedPlan: PropTypes.string,
    actions: PropTypes.object,
}

export default NavBar
