import { CREATE_ARTICLE } from './constants'

export function newArticle(title, body, headerImageUrl, createArticle) {
    return (dispatch) => {
        createArticle({
            variables: {
                title,
                body,
                headerImageUrl,
            },
        })
        // .then((data) => {
        //     console.log(data)
        // })

        dispatch({ type: CREATE_ARTICLE })
    }
}


export default null
