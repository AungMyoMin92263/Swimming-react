import React, { useEffect } from "react";
import "./TagInput.scss";

const TagInput = (props: any) => {
	const [tags, setTags] = React.useState<string[]>([]);

    useEffect(() => {
      props.callback(tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tags])
    

	const handleKeyDown = async (e: any) => {
		const value = e.target.value;
		if (e.key !== "," && e.key !== "Enter") return;
		if (!value.trim()) return;
		await setTags([...tags, value]);
		props.onInputChange(tags);
		e.target.value = "";
	};
	const removeComma = (e: any) => {
		props.onInputChange(tags);
		if (e.target.value === ",") {
			e.target.value = "";
		}
	};
	const removeTag = (index: number) => {
		setTags(tags.filter((el, i) => i !== index));
        
	};

	return (
		<div className='tags-input-container'>
			{tags &&
				tags.length > 0 &&
				tags.map((tag, index) => (
					<div className='tag-item' key={index}>
						<span className='text'>{tag}</span>
						<span className='close' onClick={() => removeTag(index)}>
							&times;
						</span>
					</div>
				))}
			<input
				onKeyPress={(e) => {
					if (e.key === "Enter") {
						props.onInputChange(tags);
					}
				}}
				onKeyDown={handleKeyDown}
				type='text'
				className='tags-input'
				placeholder='Enter email(s), comma separated'
				onChange={removeComma}
			/>
		</div>
	);
};

export default TagInput;
