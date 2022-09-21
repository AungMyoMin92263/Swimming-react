import React from "react";

// import css
import "./ManagerDashboard.css";
import "./ManagerClassDetailPage.css";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { StoreState } from "../../stores/reducers";
import {
	getUserInfo,
	getAll,
	getClassObject,
	getAllComment,
} from "../../stores/actions";
import { connect } from "react-redux";
import { signOut, LoadingActionFunc } from "../../stores/actions";
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
import { CreateProfile } from "../../atoms/createProfile";
import CommentDashItem from "../../atoms/CommentDash";
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
	attendances: any[];
	total_attended: number;
	total_class: number;
}
interface IProps {
	user_id: any;
	authUser: any;
	getUserInfo: Function;
	getAll: Function;
	response: any;
	history: any;
	getClassObject: Function;
	defaultPath: string;
	signOut: Function;
	LoadingActionFunc: Function;
	classes: any;
	comments: any;
}

class ManagerAllAttendancesStudent extends React.Component<IProps, IStates> {
	id: any;
	class_id: any;
	url = "/manager/student-edit-profile/";
	currentMonth = moment(new Date()).format("MMM YYYY");
	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		this.id = path[4];
		this.class_id = path[6];
		this.state = {
			total_attended: 0,
			total_class: 0,
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
			attendances: [],
		};
	}
	componentDidMount() {
		this.authFromLocal();
		this.getDetailAll();
		//loading
	}
	getDetailAll = async () => {
		await Promise.all([
			this.getAttendanceByStudent(),
			this.props.getUserInfo(this.id, true),
		]);
	};

	authFromLocal = async () => {
		const user = JSON.parse(getItem("authUser") || "null");
		console.log(user.userInfo);
		if (user && user.userInfo) {
			await this.setState({
				email: user.userInfo.email,
				logo: user.userInfo.assign_school
					? user.userInfo.assign_school.school.logo
					: "",
				school_name: user.userInfo.assign_school
					? user.userInfo.assign_school.school.name
					: "",
				schoolId: user.userInfo.assign_school
					? user.userInfo.assign_school.school_id
					: -1,
			});
			let classUrl =
				"school/" + this.state.schoolId + "/class/" + this.class_id;
			this.props.getClassObject(classUrl, true);
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

	getAttendanceByStudent = async () => {
		let url = "attendance/student/" + this.id + "/class/" + this.class_id;
		await this.props.getAll(url);
		if (
			this.props.response &&
			this.props.response.result &&
			this.props.response.result.length > 0
		) {
			let tempAttendances = this.props.response.result;
			let res = [];
			let j = 0;
			let temp_total_attended = 0
			let temp_total_class = 0
			for (let i = 0; i < tempAttendances.length; i++) {
				res.push({
					text: tempAttendances[i].classes.name,
					callback: () => console.log("log click item"),
					smallText: "",
					logo: tempAttendances[i].classes.logo,
					attended: tempAttendances[i].attend,
					record_date: tempAttendances[i].record_date,
					secondryText: true,
					isBigIcon: false,
					selectable: true,
				});
				temp_total_class = tempAttendances.length;
				if (tempAttendances[i].attend) {
					temp_total_attended = j+1
				}
			}

			this.setState({
				attendances: res,
				total_attended: temp_total_attended,
				total_class: temp_total_class,
			});
		}
	};

	renderAttendance = () => {
		return (
			<>
				<div className='class-attendance-body mt-16 '>
					<div className='class-attendance-sub-header flex mt-16 ml-16'>
						<div className='col-5 f-10 ml-16'>
							<span className='ml-56'>CLASS</span>
						</div>
						<div className='col-4 f-10'>
							<span className='ml-16'>DATE/TIME</span>
						</div>
						<div className='col-3 f-10 flex-center'>
							<span className='ml-16'>ATTENDACE</span>
						</div>
					</div>
					{this.state.attendances.map((attend, index) => {
						return (
							<>
								<div className='class-attendance-content flex align-center'>
									<div className='student-content col-5 '>
										<img
											src={
												process.env.REACT_APP_API_ENDPOINT + "/" + attend.logo
											}
											alt=''
											className='logo-icon ml-16'
										/>
										<span className='f-16 ml-16'>{attend.text}</span>
									</div>
									<div className='student-content col-5'>
										<span className='f-16 ml-16'>{attend.record_date}</span>
									</div>

									<div className='attendance-content col-2 flex-center mr-8'>
										{attend.checked}
										<Checkbox
											disabled
											checked={attend.attended}
											icon={<RadioButtonUncheckedIcon />}
											checkedIcon={<CheckCircleIcon />}
										/>
									</div>
								</div>
							</>
						);
					})}
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
					title: "STUDENT",
					value: this.props.authUser.otherUserinfo?.name || "-",
				},
				{
					title: "ATTENDANCES",
					value: "-",
				},
			],
		};

		return (
			<>
				<div className='container-cus'>
					<div className='dashboard'>
						<div className='dashboard-header'>
							<div className='justify-center justify-space-between'>
								<div className='flex cursor align-center '>
									<div
										className='flex cursor align-center '
										onClick={() => this.props.history.back()}
										style={{ textDecoration: "none" }}
									>
										<ArrowBackIcon
											sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
										></ArrowBackIcon>
										<span className='fc-primary'>Back</span>
									</div>
									<span className='ml-16 fc-second'>
										{this.state.school_name} {"		"}
										<span className='ml-16 fc-second'>/</span>
									</span>
									<span className='ml-16 fc-second'>
										{this.props.classes && this.props.classes.viewClass?.name}
									</span>
									<span className='ml-16 fc-second'>/</span>
									<span className='ml-16 fc-second'>
										{this.props.authUser &&
											this.props.authUser.otherUserinfo?.name}
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
									<div className='mr-16'></div>

									<div className='f-40 fw-500'>
										<span>{this.currentMonth}</span>
									</div>
								</div>
							</div>
						</div>
						<div className='mt-24 class-daily'>
							<div className='class-detail col-12'>
								<div className=''>
									<span className='fc-second'>Details</span>

									<div className='mt-16 attend-detail-content'>
										<div className='class-detail-date-time'>
											<div className='col-3 flex-column'>
												<span className='f-10 fc-second'>
													{profile &&
														profile.display_item &&
														profile.display_item[0].title}
												</span>
											</div>
											<div className='col-3 flex-column'>
												<span className='f-10 fc-second'>
													{profile &&
														profile.display_item &&
														profile.display_item[1].title}
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
												<span className='f-16 fw-500'>
													{this.state.total_attended}/{this.state.total_class}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='class-detail-body'>
							<>{this.renderAttendance()}</>
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
	getAll,
	getUserInfo,
	getAllComment,
	getClassObject,
	signOut,
	LoadingActionFunc,
})(ManagerAllAttendancesStudent);
