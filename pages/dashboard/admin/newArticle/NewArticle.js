import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import Button from 'material-ui/Button'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
// import htmlToDraft from 'html-to-draftjs'
import Admin from '../'
import { EditorContainer } from './styles'

class NewArticle extends Component {
    state = {
        rerender: false,
        editorState: EditorState.createEmpty(),
    }

    onEditorStateChange = (editorState) => {
        this.setState({ editorState })
    }

    onSubmit = () => {
        const { createArticle, actions } = this.props
        const { editorState } = this.state
        const title = this._titleInput.value

        actions.newArticle(
            title,
            draftToHtml(convertToRaw(editorState.getCurrentContent())),
            createArticle,
        )

        this.setState({ editorState: EditorState.createEmpty() })
        this._titleInput.value = ''
    }

    render() {
        const { editorState } = this.state

        return (
            <Admin>
                <link rel="stylesheet" href="/static/react-draft-wysiwyg.css" />
                <EditorContainer>
                    <input
                        className="title"
                        ref={titleInput => this._titleInput = titleInput}
                        placeholder="Title"
                    />
                    <Editor
                        editorState={editorState}
                        wrapperClassName="wrapper"
                        editorClassName="editor"
                        onEditorStateChange={this.onEditorStateChange}
                    />
                    <div
                        className="preview"
                        dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState.getCurrentContent())) }}
                    />
                    <Button onClick={this.onSubmit} fab color="primary" aria-label="add" className="submit">
                        <i className="fa fa-save fa-2x" />
                    </Button>
                </EditorContainer>
            </Admin>
        )
    }
}

NewArticle.propTypes = {
    createArticle: PropTypes.func,
    actions: PropTypes.object,
}

const createArticle = gql`
  mutation ($title: String, $body: String) {
    createArticle(
    title: $title,
    body: $body,
    ) { id }
  }
`

export default graphql(createArticle, { name: 'createArticle' })(NewArticle)
