import fetchJsonP from 'fetch-jsonp'
import platform from 'platform'
import { hasStorage } from 'common/featureTests'
import { getDeviceType } from 'common/helpers'
import { CREATE_VISIT } from './constants'

const createVisit = createVisitor => fetchJsonP('https://freegeoip.net/json')
    .then(response => response.json())
    .then((location) => {
        createVisitor({
            variables: {
                url: document.referrer,
                device: {
                    os: platform.os.family,
                    product: platform.product,
                    browser: platform.name,
                    type: getDeviceType(),
                },
                location,
            },
        }).then((data) => {
            if (hasStorage) {
                localStorage.setItem('location', JSON.stringify(location))
                localStorage.setItem('visitorID', data.data.createVisitor.id)
            }
        })
    })


export function newVisit(createVisitor) {
    return (dispatch) => {
        createVisit(createVisitor)
        dispatch({ type: CREATE_VISIT })
    }
}

export default null
