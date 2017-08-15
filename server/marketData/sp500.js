// const https = require('https')
const Lokka = require('lokka').Lokka
const Transport = require('lokka-transport-http').Transport

process.env.TZ = 'UTC'

const client = new Lokka({
    transport: new Transport('https://api.graph.cool/simple/v1/cj5p24f2bblwp0122hin6ek1u'),
})

client.query(`
    {
      allMarkets {
          name
      }
    }
`).then((result) => {
    console.log(result)
})

client.mutate(`{
    newMarket: createMarket(
        name: "TEST",
    ) {
        name
    }
}`).then((response) => {
    console.log(`RESPONSE: ${response}`)
})

// client.mutate(`{
//     newMarket: createMarket(
//         name: "TEST",
//     ) {
//         name
//     }
// }`).then((response) => {
//     console.log(`RESPONSE: ${response}`)
// })

//
// const options = {
//     host: 'www.quandl.com',
//     path: '/api/v3/datasets/MULTPL/SP500_REAL_PRICE_MONTH.json?api_key=zP2W-4snDLyygfZVpw2v&start_date=1970-01-01',
// }
//
// https.get(options, (res) => {
//     let str = ''
//     let data = {}
//
//     res.on('data', (chunk) => { str += chunk })
//
//     res.on('end', () => {
//         console.log('FINISHED REQUEST')
//         data = JSON.parse(str)
//         console.log(data)
//     })
// })


// https://github.com/kadirahq/lokka
// https://www.graph.cool/docs/faq/node-delete-all-nodes-iet3phoum8/
