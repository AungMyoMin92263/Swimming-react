import React from "react";

// import css
import "./ManagerDashboard.css";
import "./ManagerClassDetailPage.css";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { StoreState } from "../../stores/reducers";
import {
	getClassObject,
	getAllComment,
	getAllEvents,
	getDetailEvents,
	getUserInfo,
} from "../../stores/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Class } from "../../stores/model/class";
import { getItem, removeItem } from "../../auth/LocalStorage";
import placeholder from "./../../assets/images/place-holder.png";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { AuthInterface } from "../../stores/model/auth-interface";
import ListItem, { IListItem } from "../../atoms/ListItem";
import { InitialIcon } from "../../atoms/InitialIcon";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ClassInterface } from "../../stores/model/class-interface";
import ProfileContainer, { IProfile } from "../../atoms/ProfileContainer";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import CommentItem from "../../atoms/Comment";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { signOut } from "../../stores/actions/auth-action";
import LoadingActionFunc from "./PeopleListPage";
import BadgeList from "../../molecules/BadgeList";
import { CreateProfile } from "../../atoms/createProfile";
import BadgeListDash from "../../molecules/BadgeListDash";
interface IStates {
	email: string;

	logo: string;
	dropdown: boolean;
	isLogout: boolean;
	school_name: string;
	step: number;
	Editurl: string;
	image: any;
	schoolId: any;
	id: any;
}
interface IProps {
	user_id: any;
	authUser: any;
	classes: any;
	getUserInfo: Function;
	getAllComment: Function;
	history: any;
	comments: any;
	eventList: any;
	getAllEvents: Function;
	getDetailEvents: Function;
	getClassObject: Function;
	defaultPath: string;
	signOut: Function;
	LoadingActionFunc: Function;
}

class ManagerCoachDetailPage extends React.Component<IProps, IStates> {
	id: any;
	class_id: any;
	urlComments: any;
	urlEnterComment: any;
	Editurl = "/manager/coach-edit-profile/";
	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		this.id = path[3];
		this.class_id = path[5];
		this.state = {
			email: "",
			logo: "",
			school_name: "",
			dropdown: false,
			isLogout: false,
			step: 0,
			Editurl: this.Editurl + this.id,
			image: { preview: "", raw: "" },
			schoolId: -1,
			id: this.id ? this.id : -1,
		};
	}
	componentDidMount() {
		const user = JSON.parse(getItem("authUser") || "null");
		console.log(user.userInfo);
		if (user && user.userInfo) {
			this.setState({
				email: user.userInfo.email,
				logo: user.userInfo.assign_school
					? user.userInfo.assign_school.school.logo
					: "",
				school_name: user.userInfo.assign_school
					? user.userInfo.assign_school.school.name
					: "",
				schoolId: user.userInfo.assign_school
					? user.userInfo.assign_school.school.school_id
					: -1,
			});
		}
		let classUrl = "school/" + this.state.schoolId + "/class/" + this.class_id;
		this.getDetailAll();
		this.props.getClassObject(classUrl, true);
		//loading
	}
	getDetailAll = async () => {
		let cmdUrl = "comment/by-student/" + this.id;
		let eventUrl = "assigned/event/by-users/" + this.id;
		await Promise.all([
			this.props.getUserInfo(this.id, true),
			this.props.getAllComment(cmdUrl),
			this.props.getAllEvents(eventUrl),
		]);
	};
	toggleOpen = () => {
		let dropdownVal = !this.state.dropdown;
		this.setState({
			dropdown: dropdownVal,
		});
	};
	logout = async () => {
		await this.props.signOut();
		removeItem("authUser");
		removeItem("class");
		this.setState({
			isLogout: true,
		});
		this.props.LoadingActionFunc(true);
	};

	render() {
		const { email, logo, school_name, step } = this.state;
		const profile: IProfile = {
			isLogo: true,
			logo: this.props.authUser.otherUserinfo?.avatar,
			title: this.props.authUser.otherUserinfo?.name,
			display_item: [
				{
					title: "Bio",
					value: this.props.authUser.otherUserinfo?.favorite || "-",
				},
			],
		};

		return (
			<>
				<div className='container-cus'>
					<div className='dashboard'>
						<div className='dashboard-header'>
							<div className='justify-center justify-space-between'>
								<div>
									<Link
										to='/manager/dashboard'
										style={{ textDecoration: "none" }}
									>
										<ArrowBackIcon
											sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
										></ArrowBackIcon>
										<span>Back</span>
									</Link>
									<span className='ml-16 fc-second'>
										{this.state.school_name}
									</span>
									<span className='ml-16 fc-second'>/</span>
									<span className='ml-16 fc-second'>
										{this.props.classes && this.props.classes.viewClass?.name}
									</span>
								</div>

								<div className='justify-end'>
									<div className='dropdown'>
										<div className='email-div cursor' onClick={this.toggleOpen}>
											<InitialIcon
												initials={email.substr(0, 1).toUpperCase()}
												isFooterMenu={false}
											/>
											<span>{email} </span>
										</div>
										<div
											className={`dropdown-menu dropdown-menu-right ${
												this.state.dropdown ? "show" : ""
											}`}
											aria-labelledby='dropdownMenuButton'
										>
											<div
												className='dropdown-item cursor'
												onClick={this.logout}
											>
												<LogoutOutlinedIcon
													sx={{ color: "#0070F8", fontSize: 32, mr: 2 }}
												></LogoutOutlinedIcon>
												<span>Logout</span>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className='justify-center'>
								<div className='col-8 col-md-8 justify-start align-center'>
									<div className='mr-16'>
										{profile.title ? (
											<InitialIcon
												initials={profile.title.substr(0, 1).toUpperCase()}
												isFooterMenu={false}
											/>
										) : (
											<></>
										)}
									</div>

									<div className='f-40 fw-500'>
										<span>{profile.title}</span>
									</div>
								</div>
								<div className='col-4 col-md-4 justify-end'>
									<Link to={this.state.Editurl}>
										<button
											type='submit'
											className='secondary-btn'
											// style={{ width: "140px" }}
										>
											Edit Coach
											<AddIcon
												sx={{ color: "#fff", fontSize: 18, mr: 0.5 }}
											></AddIcon>
										</button>
									</Link>
								</div>
							</div>
						</div>
						<div className='mt-24 class-daily'>
							<div className='class-detail col-12'>
								<div className=''>
									<span className='fc-second fw-500'>Coach Details</span>

									<div className='mt-16 attend-detail-content'>
										<div className='class-detail-date-time'>
											<div className='col-3 flex-column'>
												<span className='f-10 fc-second'>
													{profile &&
														profile.display_item &&
														profile.display_item[0].title}
												</span>
											</div>
										</div>
										<div className='class-detail-date-time mt-8'>
											<div className='col-3 flex-column'>
												<span className='f-16 fw-500'>
													{profile &&
														profile.display_item &&
														profile.display_item[0].value}
												</span>
											</div>
											<div className='col-3 flex-column'>
												<span className='f-16 fw-500'></span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='class-daily'>
							<div className='class-detail col-12'>
								<div className=''>
									<span className='fc-second fw-500'>Contact Card</span>

									<div className='mt-16 attend-detail-content'>
										<div className='class-detail-date-time'>
											<div className='col-4 flex-column'>
												<span className='f-10 fc-second'>MOBILE</span>
											</div>
											<div className='col-4 flex-column'>
												<span className='f-10 fc-second'>EMAIL</span>
											</div>
										</div>
										<div className='class-detail-date-time mt-8'>
											<div className='col-4 flex-column'>
												<span className='f-16 fw-500'>
													<LocalPhoneOutlinedIcon className='mr-8' />
													<span>
														{this.props.authUser.otherUserinfo?.phone || "-"}
													</span>
												</span>
											</div>
											<div className='col-4 flex-column'>
												<span className='f-16 fw-500'>
													<EmailOutlinedIcon className='mr-8' />
													<span>
														{this.props.authUser.otherUserinfo?.email || "-"}
													</span>
												</span>
											</div>
										</div>
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
	comments,
	eventList,
	response,
	classes,
}: StoreState): {
	authUser: AuthInterface;
	comments: any;
	eventList: any;
	response: any;
	classes: any;
} => {
	return {
		authUser,
		comments,
		eventList,
		response,
		classes,
	};
};

export default connect(mapStateToProps, {
	getClassObject,
	getUserInfo,
	getAllComment,
	getAllEvents,
	getDetailEvents,
	signOut,
	LoadingActionFunc,
})(ManagerCoachDetailPage);
