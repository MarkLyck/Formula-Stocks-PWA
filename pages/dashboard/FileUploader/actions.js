import { UPDATING_PLAN } from './constants'

const updatingPlan = planName => ({ type: UPDATING_PLAN, plan: planName })

const mutatePlanData = () => {

}

export function updatePlan(fileArr, planName) {
    console.log('updating plan!')
    return (dispatch) => {
        dispatch(updatingPlan(planName))
    }
}

export default null
