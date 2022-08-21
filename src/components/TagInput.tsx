import React from 'react';
import './TagInput.scss';

const TagInput = (props : any) => {
    const [tags, setTags] = React.useState<string[]>([]);

    const handleKeyDown = async (e : any) => {
        const value = e.target.value;
        if (e.key !== ",") return;
        const values = e.target.value
        console.log(value)
        if(!value.trim()) return;
        await setTags([...tags, values])
        console.log('tags',tags)
        props.onInputChange(tags);   
        e.target.value = '';         
    }
    const removeComma = (e: any) => {
			if(e.target.value === ','){e.target.value=""}
		};
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
        <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="Type somthing" onChange={removeComma} />
    </div>
    );
}

export default TagInput;