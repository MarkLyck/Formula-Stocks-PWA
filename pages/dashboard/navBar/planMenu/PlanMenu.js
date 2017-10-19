import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu'
import { hasStorage } from 'common/featureTests'
import { MenuContainer, SelectedPlanName } from './styles'

class PlanButtons extends Component {
    state = { open: false, anchorEl: null }

    setPlan = (plan) => {
        const { actions } = this.props
        if (hasStorage) localStorage.setItem('selectedPlan', plan)
        actions.selectPlan(plan)
        this.setState({ open: false })
    }

    toggleMenu = event => this.setState({ open: !this.state.open, anchorEl: event.currentTarget })

    render() {
        const { selectedPlan } = this.props
        return (
            <MenuContainer>
                <Button
                    color="primary"
                    raised
                    aria-owns={this.state.open ? 'plan-menu' : null}
                    aria-haspopup="true"
                    onClick={this.toggleMenu}
                >
                    <SelectedPlanName>{selectedPlan}</SelectedPlanName>
                    <i className="fa fa-angle-down" />
                </Button>
                <Menu
                    id="plan-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.toggleMenu}
                >
                    <MenuItem raised={selectedPlan === 'entry'} onClick={() => this.setPlan('entry')}>Entry</MenuItem>
                    <MenuItem raised={selectedPlan === 'premium'} onClick={() => this.setPlan('premium')}>Premium</MenuItem>
                    <MenuItem raised={selectedPlan === 'business'} onClick={() => this.setPlan('business')}>Business</MenuItem>
                    <MenuItem raised={selectedPlan === 'fund'} onClick={() => this.setPlan('fund')}>Fund</MenuItem>
                </Menu>
            </MenuContainer>
        )
    }
}

PlanButtons.propTypes = {
    selectedPlan: PropTypes.string,
    actions: PropTypes.object,
}

export default PlanButtons
