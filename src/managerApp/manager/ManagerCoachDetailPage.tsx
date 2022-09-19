import React from "react";

// import css
import "./ManagerDashboard.css";
import "./ManagerClassDetailPage.css";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { StoreState } from "../../stores/reducers";
import {
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
import { Checkbox } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import moment from "moment";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { profile } from "console";

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
	getUserInfo: Function;
	getAllComment: Function;
	history: any;
	comments: any;
	eventList: any;
	getAllEvents: Function;
	getDetailEvents: Function;
	defaultPath: string;
	signOut: Function;
	LoadingActionFunc: Function;
}

class ManagerCoachDetailPage extends React.Component<IProps, IStates> {
	id: any;
	urlComments: any;
	urlEnterComment: any;
	Editurl = "/manager/coach-edit-profile/";
	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		this.id = path[3];
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
		this.getDetailAll();
		console.log("authUser", this.props.authUser);
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

	goToAllComments = (id: any) => {
		// this.setState({ goAllComments: true });
		let cmdUrl = "/coach/dashboard/all-comments/" + id;
		this.props.history.push(cmdUrl);
	};

	goCoachDetail = (user_id: number) => {
		let coachDetailUrl = "/manager/coach-detail/" + user_id;
		this.props.history.push(coachDetailUrl);
	};

	createProfile = (image_url: string, name: string) => {
		if (image_url) {
			return <img src={"/assets/icons/logo.png"} className='logo-icon' />;
		} else {
			return (
				<InitialIcon
					initials={name.substr(0, 1).toUpperCase()}
					isFooterMenu={true}
				/>
			);
		}
	};

	renderBadgetList = () => {
		const badgeData: any[] =
			this.props.authUser.otherUserinfo?.own_badges.map((res: any) => {
				return {
					text: res.badge.name,
					icon: res.badge.logo,
					description: res.badge.description,
					callback: () => {},
					isActive: true,
				};
			}) || [];
		return (
			<>
				<div className='class-comment-header flex justify-space-between mt-16'>
					<span className='fc-second'>Badgets</span>
					<span className='fc-primary'>View All</span>
				</div>
				<div className='class-attendance-body mt-16 '>
					<BadgeListDash badges={badgeData} key='st_badge_list'></BadgeListDash>
				</div>
			</>
		);
	};

	renderComment = () => {
		const comments = this.props.comments?.result || [];
		return (
			<div className='mt-24'>
				<div className='class-comment-header flex justify-space-between '>
					<span className='fc-second'>Class Comments</span>
					<span className='fc-primary'>View All</span>
				</div>
				<div className='class-attendance-body mt-16 '>
					<div>
						{comments.length > 0 ? (
							<>
								{comments.slice(0, 3).map((res: any, index: number) => {
									return (
										<CommentItem
											key={`st_cmd-${index}`}
											profile={
												<CreateProfile
													image_url={res.user_info.avatar}
													name={res.user_info.name}
												/>
											}
											message={res.message}
											callback={() => {}}
											timeString={
												res.user_info.name +
												" at " +
												moment(res.created_at).format("DD MMM, h:mm a")
											}
										></CommentItem>
									);
								})}
							</>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		);
	};
	renderAttendance = () => {
		return (
			<>
				<div className='class-comment-header flex justify-space-between mt-16'>
					<span className='fc-second'>Attendance</span>
					<span className='fc-primary'>View All</span>
				</div>
				<div className='class-attendance-body mt-16 '>
					<div className='class-attendance-sub-header flex mt-16 ml-16'>
						<div className='col-5 f-10'>
							<span className='ml-56'>CLASS</span>
						</div>
						<div className='col-5 f-10'>
							<span className='ml-16'>DATE/TIME</span>
						</div>
						<div className='col-2 f-10'>
							<span className='ml-16'>ATTENDACE</span>
						</div>
					</div>
				</div>
			</>
		);
	};
	renderEventList = () => {
		const events = this.props.eventList?.result || [];
		return (
			<>
				<div className='class-comment-header flex justify-space-between mt-16'>
					<span className='fc-second'>Events</span>
					<span className='fc-primary'>View All</span>
				</div>
				<div className='class-attendance-body mt-16'>
					<table className='event-list-table ml-16'>
						<thead className='class-attendance-sub-header flex '>
							<th className='col-4 f-10'>
								<span className='fc-second fw-500'>EVENT</span>
							</th>
							<th className='col-3 f-10'>
								<span className='fc-second fw-500'>GENDER</span>
							</th>
							<th className='col-3 f-10'>
								<span className='fc-second fw-500'>AGE GROUP</span>
							</th>
							<th className='col-2 f-10'>
								<span className='fc-second fw-500'>RECORD</span>
							</th>
						</thead>

						{events.length > 0 ? (
							<>
								{events.map((event: any, index: number) => {
									return (
										<tr className='flex'>
											<td className='col-4 f-10'>
												<span className='f-16'>{event.event.name}</span>
											</td>
											<td className='col-3 f-10'>
												<span className='f-16 fc-second'>
													{event.event.gender}
												</span>
											</td>
											<td className='col-3 f-10'>
												<span className='f-16 fc-second'>
													{event.event.from_age} - {event.event.to_age} y/o
												</span>
											</td>
											<td className='col-2 f-10'>
												<span>-</span>
											</td>
										</tr>
									);
								})}
							</>
						) : (
							<></>
						)}
					</table>
				</div>
			</>
		);
	};

	render() {
		const { email, logo, school_name, step } = this.state;
		const profile: IProfile = {
			isLogo: true,
			logo: this.props.authUser.otherUserinfo?.avatar,
			title: this.props.authUser.otherUserinfo?.name,
			display_item: [
				{
					title: "Age",
					value: this.props.authUser.otherUserinfo?.student?.age || "-",
				},
				{
					title: "Gender",
					value: (
						this.props.authUser.otherUserinfo?.student?.gender || "-"
					).toUpperCase(),
				},
				{
					title: "Favourite Stroke",
					value: this.props.authUser.otherUserinfo?.favorite || "-",
				},
				{
					title: "Personal Best",
					value: this.props.authUser.otherUserinfo?.bestScore || 0,
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
									<span>{}</span>
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
									<span className='fc-second'>Student Detail</span>

									<div className='mt-16 class-detail-content'>
										<div className='class-detail-date-time'>
											<div className='col-6 flex-column'>
												<span className='f-10 fc-second'>
													{profile &&
														profile.display_item &&
														profile.display_item[0].title}
												</span>
												<span className='f-16 fw-500'>
													{profile &&
														profile.display_item &&
														profile.display_item[0].value}
												</span>
											</div>
											<div className='col-6 flex-column'>
												<span className='f-10 fc-second'>
													{profile &&
														profile.display_item &&
														profile.display_item[1].title}
												</span>
												<span className='f-16 fw-500'>
													{profile &&
														profile.display_item &&
														profile.display_item[1].value}
												</span>
											</div>
										</div>
										<div className='coach-no-students'>
											<div className='col-6 flex-column'>
												<span className='f-10 fc-second'>
													{profile &&
														profile.display_item &&
														profile.display_item[2].title}
												</span>
												<span className='f-16 fw-500'>
													{profile &&
														profile.display_item &&
														profile.display_item[2].value}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='class-detail-body'>
							<>
								{this.renderBadgetList()}
								{this.renderComment()}
								{this.renderAttendance()}
								{this.renderEventList()}
							</>
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
}: StoreState): {
	authUser: AuthInterface;
	comments: any;
	eventList: any;
	response: any;
} => {
	return {
		authUser,
		comments,
		eventList,
		response,
	};
};

export default connect(mapStateToProps, {
	getUserInfo,
	getAllComment,
	getAllEvents,
	getDetailEvents,
	signOut,
	LoadingActionFunc,
})(ManagerCoachDetailPage);
