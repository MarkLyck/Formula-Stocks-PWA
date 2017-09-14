// eslint-disable-next-line
export const hasStorage = (function () {
    try {
        localStorage.setItem('mod', 'mod')
        localStorage.removeItem('mod')
        return true
    }
    catch (exception) {
        return false
    }
}())

export default null
