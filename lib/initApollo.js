import { ApolloClient, createNetworkInterface } from 'react-apollo'
import { hasStorage } from 'common/featureTests'
import fetch from 'isomorphic-fetch'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    global.fetch = fetch
}

function create() {
    return new ApolloClient({
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        // link: middlewareLink.concat(httpLink),
        networkInterface: createNetworkInterface({
            uri: 'https://api.graph.cool/simple/v1/cj5p24f2bblwp0122hin6ek1u', // Server URL (must be absolute)
            opts: { // Additional fetch() options like `credentials` or `headers`
                credentials: 'same-origin',
                headers: {
                    authorization: `Bearer ${hasStorage && localStorage.getItem('graphcoolToken')}`,
                },
            },
        }),
    })
}

export default function initApollo() {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!process.browser) {
        return create()
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create()
    }

    return apolloClient
}
