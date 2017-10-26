import { CREATE_ARTICLE } from './constants'

export function newArticle(title, body, createArticle) {
    return (dispatch) => {
        createArticle({
            variables: {
                title,
                body,
            },
        })
        // .then((data) => {
        //     console.log(data)
        // })

        dispatch({ type: CREATE_ARTICLE })
    }
}


export default null
