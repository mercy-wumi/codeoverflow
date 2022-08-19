import { useState } from 'react'
import { useQuestionsContext } from '../hooks/useQuestionsContext';
import { useAuthContext } from '../hooks/useAuthContext'
import { suggestions } from '../suggestions';
import { WithContext as ReactTags } from 'react-tag-input';
// import {
//     AccordionWithHeader,
//     AccordionNode,
//     AccordionHeader,
//     AccordionPanel
// } from 'react-accordion-with-header';

const suggestionTag = suggestions.map(country => {
    return {
        id: country,
        text: country
    };
});

const KeyCodes = {
    comma: 188,
    enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];


const AskQuestion = () => {
    const { dispatch } = useQuestionsContext()
    const { user } = useAuthContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState([])
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        setTags([...tags, tag]);
        console.log(tags)
    };

    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged In')
            return
        }
        const question = { title, description, tags }
        const resp = await fetch('/api/questions', {
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
            setTags([])
            setError(null)
            setEmptyFields([])
            console.log('new question added', questionJson)
            // console.log(dispatch({ type: 'ASK_QUESTION', payload: questionJson }))
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
                            <span>Be specific and imagine you're asking a question to another person</span>
                            <input
                                type='text'
                                placeholder='e.g. is there an R function for finding the index of an element in a vector?'
                                onChange={e => setTitle(e.target.value)}
                                value={title}
                                className={emptyFields.includes('title') ? 'error' : ''}
                            />
                            <label>Body</label>
                            <span>include all the information someone would need to answer your question</span>
                            <textarea
                                rows='12'
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                                className={emptyFields.includes('description') ? 'error' : ''}
                            >
                            </textarea>
                            <label>Tags</label>
                            <span>Add up to 5 tags to describe what your question is about</span>
                            <ReactTags
                                tags={tags}
                                suggestions={suggestionTag}
                                delimiters={delimiters}
                                handleDelete={handleDelete}
                                handleAddition={handleAddition}
                                handleTagClick={handleTagClick}
                                inputFieldPosition="top"
                                autocomplete
                                className={emptyFields.includes('tags') ? 'error' : ''}
                            />
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
                        {/* <AccordionWithHeader
                        // active={[0]}
                        >
                            <AccordionNode>
                                <AccordionHeader className='accordionHeader'>
                                    <span>Summarize the problem</span>
                                </AccordionHeader>
                                <AccordionPanel>
                                    <ul>
                                        <li>include details about your goal</li>
                                    </ul>
                                </AccordionPanel>
                            </AccordionNode>
                        </AccordionWithHeader> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AskQuestion