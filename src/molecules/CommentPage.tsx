import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import CommentItem from "../atoms/Comment";
import { InitialIcon } from "../atoms/InitialIcon";
import ListBoxUI from "./ListBox";
import { getAllComment, getSendComment } from "../stores/actions";
import { AuthInterface } from "../stores/model/auth-interface";
import { StoreState } from "../stores/reducers";

interface IStates {
	comments: any[];
}
interface IProps {
	getAllComment: Function;
	receiverId: any;
	isClass: boolean;
	comments?: any;
	getSendComment: Function;
	isOwn?: boolean;
	history?: any;
	showRightArr?: boolean;
	callback: Function;
	commentList?: any[];
}

class CommentListPage extends React.Component<IProps, IStates> {
	constructor(props: any) {
		super(props);
		this.state = {
			comments: [],
		};
	}

	componentDidMount(): void {
		this.initiate();
	}

	initiate = async () => {
		if (this.props.commentList) {
			await this.setState({
				comments: this.props.commentList,
			});
			console.log("comments .... cmt page", this.state.comments);
		} else {
			if (this.props.isOwn) {
				this.getSendComments();
			} else {
				this.getComments();
			}
		}
	};

	getComments = async () => {
		let url = this.props.isClass ? "comment/by-class/" : "comment/by-student/";
		await this.props.getAllComment(url + this.props.receiverId);
		this.setState({
			comments: this.props.comments.result,
		});
	};

	getSendComments = async () => {
		let type = this.props.isClass ? "class" : "user";
		await this.props.getSendComment(this.props.receiverId, type);
		this.setState({
			comments: this.props.comments.send_cmt,
		});
	};

	createProfile = (image_url: string, name: string) => {
		if (image_url) {
			 return (
					<img
						src={
							image_url
								? process.env.REACT_APP_API_ENDPOINT + "/" + image_url
								: ""
						}
						className='logo-icon'
						alt=''
					/>
				);
		} else {
			return (
				<InitialIcon
					initials={name.substring(0, 1).toUpperCase()}
					isFooterMenu={true}
				/>
			);
		}
	};

	render() {
		// const { result, send_cmt } = this.props.comments;
		// const comments = this.props.isOwn ? send_cmt : result;
		const { comments } = this.state;
		return (
			<div>
				{comments && comments.length > 0 ? (
					<ListBoxUI
						title=''
						callback={() => {}}
						callback2={() => {}}
						noBtn={true}
						noTitle={true}
						// more2={true}
					>
						<>
							{comments.map((cmd: any, index: number) => (
								<CommentItem
									profile={this.createProfile(
										cmd.user_info && cmd.user_info.avatar
											? cmd.user_info.avatar
											: "",
										cmd.user_info && cmd.user_info.name
											? cmd.user_info.name
											: ""
									)}
									message={cmd.message}
									callback={() => this.props.callback()}
									timeString={
										(cmd.user_info && cmd.user_info.name
											? cmd.user_info.name
											: "") +
											  " at " +
											  moment(cmd.created_at).format("DD MMM, h:mm a")
									}
									key={`cmd-item-${index}`}
									showRightArr={this.props.showRightArr}
									isFileIncluded={
										cmd.attachment && cmd.attachment !== "" ? true : false
									}
									file={cmd.attachment}
									comment={cmd}
									reply={cmd.children && cmd.children.length}
								/>
							))}
						</>
						{/*  */}
					</ListBoxUI>
				) : (
					<></>
				)}
			</div>
		);
	}
}

const mapStateToProps = ({
	comments,
}: StoreState): {
	comments: any;
} => {
	return {
		comments,
	};
};

export default connect(mapStateToProps, { getAllComment, getSendComment })(
	CommentListPage
);
