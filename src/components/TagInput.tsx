import React from 'react';
import './TagInput.scss';

const TagInput = (props : any) => {
    const [tags, setTags] = React.useState<string[]>([]);

    const handleKeyDown = async (e : any) => {
        if(e.key !== 'Enter') return
        const value = e.target.value
        if(!value.trim()) return;
        await setTags([...tags, value])
        console.log('tags',tags)
        props.onInputChange(tags);   
        e.target.value = '';         
    }

    const removeTag = async(index : number) => {
        await setTags(tags.filter((el, i) => i !== index));
        props.onInputChange(tags);            
    }

    return (
        <div className="tags-input-container">
        { tags.map((tag, index) => (
            <div className="tag-item" key={index}>
                <span className="text">{tag}</span>
                <span className="close" onClick={() => removeTag(index)}>&times;</span>
            </div>
        )) }
        <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="Type somthing" />
    </div>
    );
}

export default TagInput;