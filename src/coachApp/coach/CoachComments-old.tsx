import React from "react";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import CommentItem, { ICommentItem } from "../../atoms/Comment";
import { getItem } from "../../auth/LocalStorage";
import { getClassObject, getAll } from "../../stores/actions";
import { InitialIcon } from "../../atoms/InitialIcon";
import { Link } from "react-router-dom";
import ListBoxUI from "../../molecules/ListBox";

interface IStates {
	step: number;
	classId: number;
	schoolId: number;
	comments: any[];
}

interface IProps {
	authUser: AuthInterface;
	classes: any;
	getClassObject: Function;
	getAll: Function;
	response: any;
}

class CoachCommentsPageOld extends React.Component<IProps, IStates> {
	id: any;
	urlDailyProgram = "";
	urlEnterComment = "";
	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		this.id = path[4];
		this.state = {
			step: 0,
			classId: this.id ? this.id : -1,
			schoolId: -1,
			comments: [],
		};
	}
	componentDidMount() {
		this.urlDailyProgram =
			"/coach/dashboard/daily-program/" + this.state.classId;
		this.urlEnterComment =
			"/coach/dashboard/enter-comments/" + this.state.classId;
		this.authFromLocal();
	}

	authFromLocal = async () => {
		let user = JSON.parse(getItem("authUser") || "null");
		if (user && user.userInfo) {
			if (user.userInfo.assign_class && user.userInfo.assign_class.length > 0) {
				if (user.userInfo.assign_class[0].classes) {
					await this.setState({
						schoolId: user.userInfo.assign_class[0].classes.school_id,
					});
					this.getClass();
				}
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
				<div className='wrapper-mobile'>
					<div className='content-mobile col-sm-12'>
						<div className='mb-32 justify-space-between flex'>
							<Link to={this.urlDailyProgram}>
								<button type='submit' className='back-btn'>
									<ArrowBackIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></ArrowBackIcon>
								</button>
							</Link>
							<Link to={this.urlEnterComment}>
								<button type='submit' className='back-btn align-center'>
									<AddIcon
										sx={{ color: "#0070F8", fontSize: 24, mr: 0.5 }}
									></AddIcon>
								</button>
							</Link>
						</div>
						<div className='f-32 fw-500 mt-16 mb-32'>
							<span> All Comments </span>
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

export default connect(mapStateToProps, { getClassObject, getAll })(
	CoachCommentsPageOld
);
