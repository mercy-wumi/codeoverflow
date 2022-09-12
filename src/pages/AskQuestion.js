import { useState } from 'react'
import { useQuestionsContext } from '../hooks/useQuestionsContext';
import { useAuthContext } from '../hooks/useAuthContext'
import FileBase from 'react-file-base64'
import TagsInput from '../components/TagsInput';

const AskQuestion = () => {
    const { dispatch } = useQuestionsContext()
    const { user } = useAuthContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedImage, setSelectedImage] = useState('')
    const [tags, setTags] = useState([])
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged In')
            return
        }
        const question = { title, description, tags, selectedImage }
        const resp = await fetch('https://codeoverflow-app.herokuapp.com/api/questions', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const questionJson = await resp.json()
        if (!resp.ok) {
            setError(questionJson.error)
            setEmptyFields(questionJson.emptyFields)
        }
        if (resp.ok) {
            setTitle('')
            setDescription('')
            setSelectedImage('')
            setTags([])
            setError(null)
            setEmptyFields([])
            console.log('new question added', questionJson)
            dispatch({ type: 'ASK_QUESTION', payload: questionJson })
        }
    }

    return (
        <div className='askquestionContainer'>
            <h3>Ask a public question</h3>
            <div className='askquestion'>
                <div className='question'>
                    <form onSubmit={handleSubmit}>
                        <div className='fillquestion'>
                            <label>Title</label>
                            <p>Be specific and imagine you're asking a question to another person</p>
                            <input
                                type='text'
                                placeholder='e.g. is there an R function for finding the index of an element in a vector?'
                                onChange={e => setTitle(e.target.value)}
                                value={title}
                                className={emptyFields.includes('title') ? 'error' : ''}
                            />
                            <label>Body</label>
                            <p>include all the information someone would need to answer your question</p>
                            <textarea
                                rows='12'
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                                className={emptyFields.includes('description') ? 'error' : ''}
                            >
                            </textarea>
                            <FileBase
                                type='file'
                                multiple={false}
                                onDone={({ base64 }) => setSelectedImage(base64)}
                            />
                            <label>Tags</label>
                            <p>Add up to 5 tags to describe what your question is about</p>
                            <TagsInput tags={tags} setTags={setTags} />
                        </div>
                        <button className='button'>Review your question</button>
                        {error && <div className='error'>{error}</div>}
                    </form>
                </div>
                <div className='accordion'>
                    <p>Step 1: Draft your question</p>
                    <div className='accordion-text'>
                        <p>The community is here to help you with specific coding algorithm, or language problems.</p>
                        <p>Avoid asking opinion-based questions.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AskQuestion