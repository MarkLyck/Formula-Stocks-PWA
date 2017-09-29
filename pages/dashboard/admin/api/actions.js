import _ from 'lodash'
import { planIds } from 'common/constants'
import { UPDATING_PLAN } from './constants'

const updatingPlan = planName => ({ type: UPDATING_PLAN, plan: planName })

const mutatePlanData = (file, mutatePlan, Plans) => {
    let planId
    if (file.name.indexOf('basic') > -1 || file.name.indexOf('entry') > -1) planId = planIds.ENTRY
    else if (file.name.indexOf('premium') > -1) planId = planIds.PREMIUM
    else if (file.name.indexOf('business') > -1) planId = planIds.BUSINESS
    else if (file.name.indexOf('fund') > -1) planId = planIds.FUND

    const oldPlan = Plans.filter(plan => plan.id === planId)[0]

    let backtestedData = oldPlan.backtestedData
    let latestSells = oldPlan.latestSells
    let portfolioYields = oldPlan.portfolioYields
    let launchStatistics = oldPlan.launchStatistics
    let statistics = oldPlan.statistics
    let suggestions = oldPlan.suggestions

    if (file.name.indexOf('weekly') > -1) {
        const modelSuggestions = suggestions.filter(sugg => sugg.model)
        suggestions = file.data.actionable.concat(modelSuggestions)
    } else if (file.name.indexOf('monthly') > -1) {
        portfolioYields = file.data.logs
        file.data.actionable.forEach((sugg) => {
            if (sugg.action === 'SELL') {
                const newSell = {
                    originalPrice: sugg.original_purchase,
                    sellPrice: sugg.suggested_price,
                    ticker: sugg.ticker,
                    name: sugg.name || sugg.systemname,
                    return: Number((((sugg.suggested_price - sugg.original_purchase) * 100) / sugg.original_purchase).toFixed(2)),
                }
                latestSells = [newSell].concat(latestSells)
                if (latestSells && latestSells.length > 10) { latestSells.pop() }
            }
        })
        const weeklySuggestions = suggestions.filter(sugg => !sugg.model)
        let modelSuggestions = []
        if (file.data.actionable) {
            modelSuggestions = file.data.actionable.map((sugg) => {
                sugg.model = true
                return sugg
            })
        }
        suggestions = weeklySuggestions.concat(modelSuggestions)
        file.data.statistics.percentInCash = file.data.portfolio[file.data.portfolio.length - 1].percentage_weight
        launchStatistics = _.merge(launchStatistics, file.data.statistics)
    } else if (file.name.indexOf('annual') > -1) {
        statistics = _.clone(statistics)
        statistics.winRatio = (100 - ((statistics.negatives / (statistics.positives + statistics.negatives)) * 100))
        statistics = _.merge(statistics, file.data.statistics)
        backtestedData = file.data.logs
    }

    mutatePlan({ variables: {
        id: planId,
        backtestedData,
        latestSells,
        portfolio: file.data.portfolio || oldPlan.portfolio,
        portfolioYields,
        statistics,
        launchStatistics,
        suggestions,
    } })
        .then(data => console.log('done', data))
}

const extractJSONFromFile = file => (
    new Promise((resolve) => {
        const receivedJSON = (fileName, e) => {
            const lines = e.target.result
            const data = JSON.parse(lines)
            resolve({ data, name: fileName })
        }

        const fr = new FileReader()
        fr.onload = receivedJSON.bind(null, file.name)
        fr.readAsText(file)
    })
)

export function updatePlan(fileArr, mutatePlan, Plans) {
    return (dispatch) => {
        dispatch(updatingPlan('planName'))
        fileArr.forEach((file) => {
            extractJSONFromFile(file)
                .then(json => mutatePlanData(json, mutatePlan, Plans))
        })
    }
}

export default null
