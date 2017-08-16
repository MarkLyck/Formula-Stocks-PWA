const { request } = require('graphql-request')
const { graphCoolEndpoint } = require('../constants')

const marketFragment = `
    id
    name
    longtermPrices
    pricesSince2009
`

exports.mutateMarket = (id, data) => {
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
