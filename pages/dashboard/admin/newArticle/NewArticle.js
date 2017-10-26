import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import Button from 'material-ui/Button'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
// import htmlToDraft from 'html-to-draftjs'
import Admin from '../'
import { EditorContainer, FileDrop } from './styles'

class NewArticle extends Component {
    state = {
        rerender: false,
        headerImageUrl: '',
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

    onDrop = (files) => {
        const data = new FormData()
        data.append('data', files[0])

        fetch('https://api.graph.cool/file/v1/cj5p24f2bblwp0122hin6ek1u', {
            method: 'POST',
            body: data,
        })
            .then(response => response.json())
            .then(file => this.setState({ headerImageUrl: file.url }))
    }

    render() {
        const { editorState, headerImageUrl } = this.state

        return (
            <Admin>
                <link rel="stylesheet" href="/static/react-draft-wysiwyg.css" />
                <EditorContainer>
                    <FileDrop onDrop={this.onDrop} data-headerImageUrl={headerImageUrl}>
                        <h3>Drag and drop Header image here</h3>
                        <i className="fa fa-image fa-5x" />
                    </FileDrop>
                    <input
                        className="title"
                        // eslint-disable-next-line
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
                        // eslint-disable-next-line
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
