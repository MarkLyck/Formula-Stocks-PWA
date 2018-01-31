const https = require('https')
const { request } = require('graphql-request')
const { graphCoolEndpoint } = require('../constants')
const { marketIds } = require('../constants')

const marketFragment = `
    id
    name
    longtermPrices
    pricesSince2009
`

const mutateMarket = (id, data) => {
    const longtermPrices = data.map(point => ({ date: point[0], price: point[1] })).reverse()
    const pricesSince2009 = longtermPrices.filter(point => Number(point.date.split('-')[0]) >= 2009)
    const query = `mutation jsons($longtermPrices: [Json!]!, $pricesSince2009: [Json!]!) {
      updateMarket(
          id: "${id}"
          longtermPrices: $longtermPrices
          pricesSince2009: $pricesSince2009
      ) {
        ${marketFragment}
      }
    }`

    request(graphCoolEndpoint, query, { longtermPrices, pricesSince2009 })
        .then(({ updateMarket }) => console.log(`updated market: ${updateMarket.name}`))
        .catch(e => console.log(`ERROR: ${e}`))
}

const isJson = (str) => {
    try {
        JSON.parse(str)
    } catch (e) {
        return false
    }
    return true
}

exports.updateMarket = (path, market) => {
    const options = { host: 'www.quandl.com', path }

    https.get(options, (res) => {
        let str = ''
        let json = {}

        res.on('data', (chunk) => { str += chunk })

        res.on('end', () => {
            if (isJson(str)) {
                console.log('running')
                json = JSON.parse(str)
                mutateMarket(marketIds[market], json.dataset.data)
            }
        })
    })
}
