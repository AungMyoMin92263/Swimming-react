import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CommentItem, { ICommentItem } from "../../atoms/Comment";
import { getItem } from "../../auth/LocalStorage";
import { getClassObject, getAll, postComment, getSendComment } from "../../stores/actions";
import { InitialIcon } from "../../atoms/InitialIcon";
import { Link } from "react-router-dom";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import ListBoxUI from "../../molecules/ListBox";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import CommentListPage from "../../molecules/CommentPage"
import { scrollToBottom } from "../../scroll-func";

interface IStates {
	classId: number;
	schoolId: number;
	newcomment: any;
	commetFile: any
	commentType: string
}

interface IProps {
	authUser: AuthInterface;
	classes: any;
	postComment: Function;
	comments: any
	getSendComment: Function,
	history: any
}

class CoachCommentsPage extends React.Component<IProps, IStates> {
	id: number
	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		this.id = parseInt(path[4]);
		this.state = {
			classId: this.id ? this.id : -1,
			schoolId: this.props.classes?.viewClass?.school_id || -1,
			newcomment: "",
			commetFile: "",
			commentType: path[5] || ""
		};
	}

	componentDidMount(): void {
		if (!this.props.classes?.viewClass && !this.props.authUser.otherUserinfo) {
			this.props.history.back()
		}
		
	}

	getSendComments = async () => {
		await this.props.getSendComment(this.state.classId, this.state.commentType)
		scrollToBottom('sendCmtList')
	}

	fileUplaodChange = () => {
		alert("We will add this feature in future!")
	}
	handleChange = (
		e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		this.setState({
			...this.state,
			newcomment: e.currentTarget.value,
		});
	};
	submit = async () => {
		await this.props.postComment({
			receiver_id: this.state.classId,
			message: this.state.newcomment,
			parent_id: null,
			type: this.state.commentType
		});
		if (!this.props.comments?.error) {
			this.setState({
				...this.state,
				newcomment: "",
			});
			this.getSendComments()
		}
	}
	render() {
		const { classId } = this.state
		return (
			<>
				<div className="wrapper-mobile bg-w">
					<div className="content-mobile-cus-space col-sm-12" id="sendCmtList">
						<CoachMobileHeader backBtn={true}></CoachMobileHeader>
						<CommentListPage receiverId={classId} isClass={this.state.commentType == 'class'} isOwn={true}></CommentListPage>
						<div className='comment-box'>
							<div className="cmd-input">
								<div className='comment-input-div'>
									<input
										className='comment-input'
										placeholder='Enter your comment'
										value={this.state.newcomment}
										onChange={this.handleChange}
									/>
									<div className='input-icons align-center'>
										<AttachFileIcon onClick={() => this.fileUplaodChange()} style={{ rotate: "45deg" }} />
										<button disabled={!this.state.newcomment} className="ml-16 send-btn" onClick={() => this.submit()}>
											<SendIcon />
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}

}

const mapStateToProps = ({
	authUser,
	classes,
	comments
}: StoreState): {
	authUser: AuthInterface;
	classes: any;
	comments: any
} => {
	return {
		authUser,
		classes,
		comments
	};
};

export default connect(mapStateToProps, {
	postComment, getSendComment,
})(CoachCommentsPage);
