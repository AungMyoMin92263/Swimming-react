import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../molecules/ListBox.css";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
export interface ICommentItem {
	message: string;
	profile?: JSX.Element;
	callback: Function;
	timeString?: string;
	showReply?: boolean;
	reply?: number;
	showRightArr?: boolean;
}

const CommentDashItem = (props: ICommentItem) => {
	return (
		<div className='comment-item'>
			<div className='message-area'>
				<div className='title-text'>{props.message}</div>
				<div className='flex'>
					<div className='cmd-second-text'>
						{props.profile}
						<label>{props.timeString}</label>
					</div>
					<div className='cmd-second-text ml-16' id='replay-box'>
						<ReplyOutlinedIcon />
						<label>{props.reply || 0} replies</label>
					</div>
				</div>
				{props.showRightArr ? (
					<div className='item-icon' onClick={() => props.callback()}>
						<ArrowForwardIosIcon></ArrowForwardIosIcon>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};
export default CommentDashItem;
