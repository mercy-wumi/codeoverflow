import React from 'react'

const TagsInput = ({ tags, setTags }) => {
    function handleKeyDown(e) {

        // If user did not press enter key, return
        if (e.key !== 'Enter') return
        // Get the value of the input
        const value = e.target.value
        // If the value is empty, return
        if (!value.trim()) return
        // Add the value to the tags array
        setTags([...tags, value])
        // Clear the input
        e.target.value = ''
        e.preventDefault();

    }

    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index))
    }
    return (
        <div className="tags-input-container">
            {tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                </div>
            ))}
            <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="enter atleast one tag and press enter to add tag" />
        </div>
    )
}

export default TagsInput