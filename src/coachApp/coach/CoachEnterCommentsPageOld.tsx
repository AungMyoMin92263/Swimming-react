import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CommentItem, { ICommentItem } from "../../atoms/Comment";
import { getItem } from "../../auth/LocalStorage";
import { getClassObject, getAll, postComment } from "../../stores/actions";
import { InitialIcon } from "../../atoms/InitialIcon";
import { Link } from "react-router-dom";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import ListBoxUI from "../../molecules/ListBox";

interface IStates {
  step: number;
  classId: number;
  schoolId: number;
  comments: any[];
  newcomment: any;
}

interface IProps {
	authUser: AuthInterface;
	classes: any;
	getClassObject: Function;
	postComment: Function;
	getAll: Function;
	response: any;
}

class CoachCommentsPageOld extends React.Component<IProps, IStates> {
	id: any;
	urlDailyProgram = "";
	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		this.id = path[4];
		this.state = {
			step: 0,
			classId: this.id ? this.id : -1,
			schoolId: -1,
			comments: [],
			newcomment: "",
		};
	}
	componentDidMount() {
		this.urlDailyProgram =
			"/coach/dashboard/daily-program/" + this.state.classId;
		this.authFromLocal();
	}

	authFromLocal = async () => {
		let user = JSON.parse(getItem("authUser") || "null");
		if (user && user.userInfo) {
			if (
				user.userInfo.assign_class &&
				user.userInfo.assign_class.length > 0
			) {
				await this.setState({
					schoolId: user.userInfo.assign_class[0].classes.school_id,
				});

				this.getClass();
			}
		}
	};

	getClass = async () => {
		let url = "school/" + this.state.schoolId + "/class/" + this.state.classId;
		await this.props.getClassObject(url);
		if (this.props.classes && this.props.classes.result)
			this.setState({
				classId: this.props.classes.result.id,
			});
		this.getAllComments();
	};

	handleChange = (
		e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		this.setState({
			newcomment: e.currentTarget.value,
		});
	};

	submit = () =>{
    this.props.postComment({
			receiver_id: this.state.classId,
			message: this.state.newcomment,
			parent_id: null,
		});
  }

	getAllComments = async () => {
		let url = "comment/by-class/" + this.state.classId;
		await this.props.getAll(url);
		if (this.props.response && this.props.response.result)
			if (
				this.props.response &&
				this.props.response.result &&
				this.props.response.result.length > 0
			) {
				let tempComments = this.props.response.result;
				let res = [];
				for (let i = 0; i < tempComments.length; i++) {
					res.push({
						text: tempComments[i].message,
						callback: () => console.log("log click item"),
						smallText: "",
						icon: (
							<>
								<InitialIcon
									initials={tempComments[i].sender.email
										.substr(0, 1)
										.toUpperCase()}
									isFooterMenu={false}
								/>
							</>
						),
						secondryText: false,
						isBigIcon: false,
					});
				}

				this.setState({
					comments: res,
				});
			}
	};
	commentPost = () => {};

	render() {
		let comment: ICommentItem = {
			message: "Hello Testing Comment",
			profile: <img src={"/assets/icons/logo.png"} className='logo-icon' />,
			callback: () => {},
			timeString: "You at 00:00 PM",
			showReply: true,
			reply: 0,
		};

		return (
			<>
				<div className='wrapper-mobile bg-w'>
					<div className='content-mobile-cus-space col-sm-12'>
						<div className='mb-32 justify-space-between flex'>
							<Link to={this.urlDailyProgram}>
								<button type='submit' className='back-btn'>
									<ArrowBackIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></ArrowBackIcon>
								</button>
							</Link>
						</div>

						<div className='list-box'>
							<div className='comment-input-div'>
								<input
									className='comment-input'
									placeholder='Enter your comment'
									value={this.state.newcomment}
									onChange={this.handleChange}
								/>
								<div className='input-icons align-center'>
									<AttachFileIcon style={{ rotate: "45deg" }} />
									<div className=''>
										<Button onClick={() => this.submit()}>
											<SendIcon />
										</Button>
									</div>
								</div>
							</div>
						</div>

						<div className='mb-8'>
							<ListBoxUI
								title=''
								noTitle={true}
								callback={() => {}}
								callback2={() => {}}
								more={false}
								more2={false}
								noBtn={true}
							>
								<CommentItem {...comment}></CommentItem>
							</ListBoxUI>
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
  response,
}: StoreState): {
  authUser: AuthInterface;
  classes: any;
  response: any;
} => {
  return {
    authUser,
    classes,
    response,
  };
};

export default connect(mapStateToProps, {
	getClassObject,
	getAll,
	postComment,
})(CoachCommentsPageOld);
