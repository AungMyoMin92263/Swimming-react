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
	getAll,
	getClassProgram,
	postClassProgram,
	getAssignUserByClass,
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
import ListBoxUI from "../../molecules/ListBox";
import CommentItem from "../../atoms/Comment";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { signOut } from './../../stores/actions/auth-action';
import LoadingActionFunc from './PeopleListPage';
interface IStates {
	email: string;
	logo: string;
	dropdown: boolean;
	isLogout: boolean;
	school_name: string;
	step: number;
	url: string;
	image: any;
	schoolId: any;
	id: any;
	classe: any;
	coaches: any[];
	attendances: any[];
	comments: any[];
	goAllComments: boolean;
	goEnterComment: boolean;
	profile: IProfile;
	classProgram: any;
}
interface IProps {
	authUser: AuthInterface;
	getClassObject: Function;
	postClassProgram: Function;
	getClassProgram: Function;
	getAssignUserByClass: Function;
	classes: any;
	getAll: Function;
	response: any;
	history: any;
	signOut: Function;
	LoadingActionFunc:Function;
}

class ManagerClassDetailPage extends React.Component<IProps, IStates> {
	id: any;
	urlComments: any;
	urlEnterComment: any;
	url = "/manager/add-class/";
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
			url: this.url + this.id,
			image: { preview: "", raw: "" },
			schoolId: -1,
			id: this.id ? this.id : -1,
			classe: { start_date: null },
			coaches: [],
			attendances: [],
			comments: [],
			classProgram: null,
			goAllComments: false,
			goEnterComment: false,
			profile: { title: "Dummy" },
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
		this.authFromLocal();
		console.log("authUser", this.props.authUser);
		//loading
	}
	authFromLocal = async () => {
		let user = JSON.parse(getItem("authUser") || "null");
		if (user && user.userInfo) {
			await this.getClass();
			await this.getCoachesByClass();
			await this.getAttendancesByClass();
			await this.getClassProgram();
		}
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

	getClass = async () => {
		let url = "school/" + this.state.schoolId + "/class/" + this.state.id;
		await this.props.getClassObject(url, true);
		if (this.props.classes && this.props.classes.viewClass) {
			let comment = [];
			let profile: IProfile = {
				isLogo: true,
				logo: this.props.classes.viewClass.logo,
				title: this.props.classes.viewClass.name,
				display_item: [
					{
						title: "Date",
						value: moment(this.props.classes.viewClass.start_date).format(
							"D MMM YYYY"
						),
					},
					{
						title: "Time",
						value: moment(
							this.props.classes.viewClass.start_time,
							"hh:mm"
						).format("hh:mm A"),
					},
					{
						title: "No. Student",
						value: this.props.classes.viewClass.studentCount,
					},
				],
			};
			// if(this.props.classes.viewClass.comments){
			//   comment
			// }
			this.setState({
				...this.state,
				classe: this.props.classes.viewClass,
				profile: profile,
			});
		}
	};

	getCoachesByClass = async () => {
		let url = "assigned/class/by-class/" + this.state.id;
		await this.props.getAssignUserByClass(url);
	};

	getAttendancesByClass = async () => {
		let url = "attendance/byClass/" + this.state.id;
		await this.props.getAll(url);
		if (
			this.props.response &&
			this.props.response.result &&
			this.props.response.result.length > 0
		) {
			let tempAttendances = this.props.response.result;
			let res = [];
			for (let i = 0; i < tempAttendances.length; i++) {
				res.push({
					text: tempAttendances[i].user.name,
					callback: () => console.log("log click item"),
					smallText: "",
					icon: tempAttendances[i].user.avatar ? (
						<img
							src={
								process.env.REACT_APP_API_ENDPOINT +
								"/" +
								tempAttendances[i].user.avatar
							}
							className='logo-icon'
						/>
					) : (
						<InitialIcon
							initials={(
								tempAttendances[i].user.name ||
								tempAttendances[i].user.email ||
								"User"
							)
								.substr(0, 1)
								.toUpperCase()}
							isFooterMenu={true}
						/>
					),
					secondryText: true,
					isBigIcon: true,
					selectable: true,
					checked: tempAttendances[i].attend,
				});
			}
			this.setState({
				...this.state,
				attendances: res,
			});
		}
	};
	getClassProgram = async () => {
		let date = new Date().toISOString();
		let url = "class-daily/" + this.state.id + "/program?req_date=" + date;
		await this.props.getClassProgram(url);
		if (this.props.classes && this.props.classes.dailyProgram) {
			this.setState({
				...this.state,
				classProgram: this.props.classes.dailyProgram,
			});
		}
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

	renderStudentDetail = () => {
		const {
			classe,
			attendances,
			coaches,
			goAllComments,
			goEnterComment,
			profile,
			classProgram,
		} = this.state;
		return (
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
		);
	};

	renderBadgetList = () => {
		return (
			<>
				<div className='class-attendance-header mt-24 fc-second'>
					<span>Badgets</span>
				</div>
				<div className='class-attendance-body mt-16 '></div>
			</>
		);
	};

	renderComment = () => {
		return (
			<div className='mt-24'>
				<div className='class-comment-header flex justify-space-between '>
					<span className='fc-second'>Class Comments</span>
					<span className='fc-primary'>View All</span>
				</div>
				<div className='class-attendance-body mt-16 '>
					<div>
						{this.state.classe.comments ? (
							<>
								{this.state.classe.comments.map((res: any, index: number) => {
									return (
										<CommentItem
											profile={this.createProfile(
												res.user_info.avatar,
												res.user_info.name
											)}
											message={res.message}
											callback={() => {}}
											timeString={
												res.user_info.name +
												" at " +
												moment(res.created_at).format("DD MMM, h:mm a")
											}
											key={`cmd-${index}`}
										></CommentItem>
									);
								})}
							</>
						) : (
							<CommentItem
								profile={this.createProfile("", "")}
								message={"There is no comment"}
								callback={() => {}}
								timeString={""}
								key={""}
							></CommentItem>
						)}
					</div>
				</div>
			</div>
		);
	};
	renderAttendance = () => {
		return (
			<>
				<div className='class-attendance-header mt-24 fc-second'>
					<span>Attendance</span>
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
					{this.state.attendances.slice(0, 5).map((attend, index) => {
						return (
							<>
								<div className='class-attendance-content flex align-center'>
									<div className='student-content col-10 flex align-center'>
										<div className='plus flex-center ml-16'>{attend.icon}</div>

										<span className='f-16 ml-16'>{attend.text}</span>
									</div>

									<div className='attendance-content col-2 align-center justify-space-around'>
										{attend.checked}
										<Checkbox
											disabled
											checked={attend.checked}
											icon={<RadioButtonUncheckedIcon />}
											checkedIcon={<CheckCircleIcon />}
										/>
										<MoreVertIcon />
									</div>
								</div>
							</>
						);
					})}
				</div>
			</>
		);
	};
	renderEventList = () => {
		return (
			<>
				<div className='class-attendance-header mt-24 fc-second'>
					<span>Events</span>
				</div>
				<div className='class-attendance-body mt-16 '>
					<div className='class-attendance-sub-header flex mt-16 ml-16'>
						<div className='col-4 f-10'>
							<span className='ml-56'>EVENT</span>
						</div>
						<div className='col-3 f-10'>
							<span className='ml-16'>GENDER</span>
						</div>
						<div className='col-3 f-10'>
							<span className='ml-16'>AGE GROUP</span>
						</div>
						<div className='col-2 f-10'>
							<span className='ml-16'>RECORD</span>
						</div>
					</div>
				</div>
			</>
		);
	};

	render() {
		const { email, logo, school_name, step } = this.state;

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
										{this.state.school_name + "/"}
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
										<img
											src={
												this.state.profile.logo
													? process.env.REACT_APP_API_ENDPOINT +
													  "/" +
													  this.state.profile.logo
													: placeholder
											}
											alt='logo'
											className='big-logo'
										/>
									</div>

									<div className='f-40 fw-500'>
										<span>{this.state.profile.title}</span>
									</div>
								</div>
								<div className='col-4 col-md-4 justify-end'>
									<Link to={this.state.url}>
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
						<div className='class-detail-body'>
							<>
								{this.renderStudentDetail()}
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
	postClassProgram,
	getClassProgram,
	getAssignUserByClass,
	signOut,
	LoadingActionFunc,
})(ManagerClassDetailPage);