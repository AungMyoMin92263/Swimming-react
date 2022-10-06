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
		<div className='comment-item cursor' onClick={() => props.callback()}>
			<div className='message-area'>
				<div className='title-text'>{props.message}</div>
				<div className='width-100 flex'>
					<div className='flex col-10'>
						<div className='cmd-second-text'>
							{props.profile}
							<label>{props.timeString}</label>
						</div>
						{props.showReply? <div className='cmd-second-text ml-16' id='replay-box'>
							<ReplyOutlinedIcon />
							<label>{props.reply || 0} replies</label>
						</div>:<></>}
						
					</div>
					<div className='col-2'>
						{props.showRightArr ? (
							<div className='justify-end'>
								<ArrowForwardIosIcon></ArrowForwardIosIcon>
							</div>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default CommentDashItem;
