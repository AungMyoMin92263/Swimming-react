import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CommentItem, { ICommentItem } from "../../atoms/Comment";
import { getItem } from "../../auth/LocalStorage";
import {
	postComment,
	getSendComment,
	getAllComment,
} from "../../stores/actions";
import { InitialIcon } from "../../atoms/InitialIcon";
import { Link } from "react-router-dom";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import ListBoxUI from "../../molecules/ListBox";
import CoachMobileHeader from "../../atoms/CoachMobileHeader";
import CommentListPage from "../../molecules/CommentPage";
import { scrollToBottom } from "../../scroll-func";

interface IStates {
	classId: any;
	schoolId: number;
	newcomment: any;
	commetFile: any;
	commentType: string;
	comments: any[];
}

interface IProps {
	authUser: AuthInterface;
	classes: any;
	postComment: Function;
	comments: any;
	getSendComment: Function;
	history: any;
	getAllComment: Function;
}

class CoachReplyCommentsPage extends React.Component<IProps, IStates> {
	id: number;
	parent_id: any;
	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		this.id = parseInt(path[4]);
		this.parent_id = parseInt(path[6]);
		this.state = {
			classId: this.id ? this.id : -1,
			schoolId: this.props.classes?.viewClass?.school_id || -1,
			newcomment: "",
			commetFile: "",
			commentType: path[5] || "",
			comments: [],
		};
	}

	componentDidMount(): void {
		if (!this.props.classes?.viewClass && !this.props.authUser.otherUserinfo) {
			this.props.history.back();
		}
		this.getComments();
	}

	getComments = async () => {
		await this.props.getAllComment("comment/" + this.parent_id);
		if (
			this.props.comments &&
			this.props.comments.result &&
			this.props.comments.result.length > 0
		) {
			let temp = this.state.comments;
			let res = this.props.comments.result[0];
			temp.push(res);

			if (res.children && res.children.length > 0) {
				for (let i = 0; i < res.children.length; i++) {
					temp.push(res.children[i]);
				}
				await this.setState({
					comments: temp,
				});
				scrollToBottom("sendCmtList");
			} else {
				this.setState({
					comments: temp,
				});
				scrollToBottom("sendCmtList");
			}
		}
	};

	//   getSendComments = async () => {
	//     await this.props.getSendComment(this.state.classId, this.state.commentType);
	//     scrollToBottom("sendCmtList");
	//   };

	fileUplaodChange = () => {
		alert("We will add this feature in future!");
	};
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
			receiver_id: this.state.classId.toString(),
			message: this.state.newcomment,
			parent_id: this.parent_id.toString(),
			type: this.state.commentType,
		});
		if (!this.props.comments?.error) {
			await this.setState({
				...this.state,
				newcomment: "",
				comments: [],
			});
			this.getComments();
		}
	};

	render() {
		const { classId, comments } = this.state;
		return (
			<>
				<div className='wrapper-mobile bg-w'>
					<div className='content-mobile-cus-space col-sm-12' id='sendCmtList'>
						<CoachMobileHeader
							backBtn={true}
							addBtn={false}
						></CoachMobileHeader>
						{comments && comments.length > 0 && (
							<CommentListPage
								receiverId={classId}
								isClass={this.state.commentType === "class"}
								isOwn={true}
								callback={() => {}}
								commentList={comments}
							></CommentListPage>
						)}
						<div className='comment-box'>
							<div className='cmd-input'>
								<div className='comment-input-div'>
									<input
										className='comment-input'
										placeholder='Enter your comment'
										value={this.state.newcomment}
										onChange={this.handleChange}
									/>
									<div className='input-icons align-center'>
										<AttachFileIcon
											onClick={() => this.fileUplaodChange()}
											style={{ rotate: "45deg" }}
										/>
										<button
											disabled={!this.state.newcomment}
											className='ml-16 send-btn'
											onClick={() => this.submit()}
										>
											<SendIcon />
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = ({
	authUser,
	classes,
	comments,
}: StoreState): {
	authUser: AuthInterface;
	classes: any;
	comments: any;
} => {
	return {
		authUser,
		classes,
		comments,
	};
};

export default connect(mapStateToProps, {
	postComment,
	getSendComment,
	getAllComment,
})(CoachReplyCommentsPage);
