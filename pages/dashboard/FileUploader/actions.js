import { planIds } from 'common/constants'
import { UPDATING_PLAN } from './constants'

const updatingPlan = planName => ({ type: UPDATING_PLAN, plan: planName })

const mutatePlanData = (file, mutatePlan) => {
    let planId
    if (file.name.indexOf('basic') > -1 || file.name.indexOf('entry') > -1) { planId = planIds.ENTRY }
    else if (file.name.indexOf('premium') > -1) { planId = planIds.PREMIUM }
    else if (file.name.indexOf('business') > -1) { planId = planIds.BUSINESS }
    else if (file.name.indexOf('fund') > -1) { planId = planIds.FUND }
    console.log(planId)
    // mutatePlan({ variables: { id: Plans[0].id, name: 'test3' } })
}

const extractJSONFromFiles = fileArr => (
    new Promise((resolve) => {
        const receivedJSON = (i, fileName, e) => {
            const lines = e.target.result
            const data = JSON.parse(lines)
            resolve({ data, name: fileName })
        }

        fileArr.forEach((file, i) => {
            const fr = new FileReader()
            fr.onload = receivedJSON.bind(null, i, file.name)
            fr.readAsText(file)
        })
    })
)

export function updatePlan(fileArr, mutatePlan) {
    // console.log('updating plan!', mutatePlan)
    return (dispatch) => {
        dispatch(updatingPlan('planName'))
        extractJSONFromFiles(fileArr)
            .then(file => mutatePlanData(file, mutatePlan))
    }
}

export default null
