import React from "react";

// import css
import "../manager/ManagerDashboard.css";
import "../manager/ManagerClassDetailPage.css";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { StoreState } from "../../stores/reducers";
import {
	getClassObject,
	getUserInfo,
	getAll,
	getClassAttend,
	getAssignUserByClass,
	getSchoolObj,
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
import { Checkbox, TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import moment from "moment";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { profile } from "console";
import ListBoxUI from "../../molecules/ListBox";
import CommentItem from "../../atoms/Comment";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { CreateProfile } from "../../atoms/createProfile";
import CommentDashItem from "../../atoms/CommentDash";
import { Modal } from "react-bootstrap";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
interface IStates {
	classId: number;
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
	filterDate: string;
	isfilterDateValid: boolean;
	isfilterDateEmpty: boolean;
	filterDateMsg: string;
	modalShow: boolean;
	selectedMonth: any;
}
interface IProps {
	user_id: any;
	authUser: any;
	getUserInfo: Function;
	getAll: Function;
	response: any;
	history: any;
	getClassObject: Function;
	getAssignUserByClass: Function;
	defaultPath: string;
	signOut: Function;
	LoadingActionFunc: Function;
	classes: any;
	comments: any;
	attendance: any;
	getClassAttend: Function;
	getSchoolObj : Function;
	schools : any;
}

class AdminAllAttendancesClasses extends React.Component<IProps, IStates> {
	id: any;
	class_id: any;school_id:any;
	url = "/manager/student-edit-profile/";
	currentMonth = moment(new Date()).format("MMM YYYY");
	date = moment(new Date()).format("YYYY-MM-DD");
	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		this.id = path[6];
		this.class_id = path[8];
		this.school_id = path[4];
		this.state = {
			classId: this.id ? this.id : -1,
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
			filterDate: moment().format("D MMM YYYY"),
			isfilterDateValid: true,
			isfilterDateEmpty: false,
			filterDateMsg: "",
			modalShow: false,
			selectedMonth: moment(new Date()).format("YYYY-MM-DD"),
		};
	}
	componentDidMount() {
		this.authFromLocal();
		this.getDetailAll();
		this.getSchool();
	}

	getSchool = async () => {
		await this.props.getSchoolObj("schools/" + this.school_id);
		let school = this.props.schools.result;
		if (school) {
		  await this.setState({
			school_name: school.name
		  });
		}
	  };

	getDetailAll = async () => {
		await Promise.all([
			this.getAttendancesByClass(),
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
				"school/" + this.state.schoolId + "/class/" + this.state.classId;
			await this.props.getClassObject(classUrl, true);
			await this.getCoachesByClass();
		}
	};
	getAttendancesByClass = async () => {
		let url = "attendance/byClass/" + this.state.classId;
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
					text: tempAttendances[i].user.name
						? tempAttendances[i].user.name
						: tempAttendances[i].user.email,
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
					student_id: tempAttendances[i].user_id,
					checked: tempAttendances[i].attend,
				});
			}
			this.setState({
				...this.state,
				attendances: res,
			});
		}
	};
	getCoachesByClass = async () => {
		let url = "assigned/class/by-class/" + this.state.classId;
		await this.props.getAssignUserByClass(url);
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

	renderAttendance = () => {
		return (
			<>
				<div className='class-comment-header flex justify-space-between mt-24'>
					<span className='fc-second'>Attendances</span>
				</div>
				<div className='class-attendance-body mt-16 '>
					<div className='class-attendance-sub-header flex mt-16 ml-16'>
						<div className='col-10 f-10'>
							<span className='ml-56'>Students</span>
						</div>
						<div className='col-2 f-10'>
							<span className='ml-56'>Attendace</span>
						</div>
					</div>
					{this.state.attendances.map((attend, index) => {
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
									</div>
								</div>
							</>
						);
					})}
				</div>
			</>
		);
	};

	getMyAttendance = async (date: any) => {
		let changed_date = moment(date).format("YYYY-MM-DD");
		await this.props.getClassAttend(this.state.classId, changed_date);
		if (
			this.props.attendance &&
			this.props.attendance.attandance_list &&
			this.props.attendance.attandance_list.length > 0
		) {
			let tempAttendances = this.props.attendance.attandance_list; 
			let res = [];
			for (let i = 0; i < tempAttendances.length; i++) {
				res.push({
					text: tempAttendances[i].user.name
						? tempAttendances[i].user.name
						: tempAttendances[i].user.email,
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
					student_id: tempAttendances[i].user_id,
					checked: tempAttendances[i].attend,
				});
			}
			this.setState({
				...this.state,
				attendances: res,
			});
		} else {
			await this.setState({
				attendances: [],
			});
		}
	};

	render() {
		const { email, logo, school_name, step } = this.state;
		let coaches = this.props.classes.assignUser.filter(
			(user: any) => user.type === "coache"
		).length;
		const { viewClass } = this.props.classes;
		let profile: IProfile = {
			isLogo: false,
			title: "Attendance",
			display_item: [
				{
					title: "Date",
					value: moment(this.state.selectedMonth).format("D MMM YYYY"),
				},
				{
					title: "Time",
					value: moment(viewClass?.start_time, "hh:mm").format("hh:mm A"),
				},
				{
					title: "Coaches",
					value: coaches,
				},
				{
					title: "No. Student",
					value: viewClass?.studentCount,
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
								<div className='col-10 justify-start align-center'>
									<div className='mr-16'>
										<img
											src={
												this.props.classes &&
												this.props.classes.viewClass &&
												this.props.classes.viewClass.logo !== ""
													? process.env.REACT_APP_API_ENDPOINT +
													  "/" +
													  this.props.classes.viewClass?.logo
													: placeholder
											}
											className='big-logo'
											alt=''
										/>
									</div>

									<div className='f-40 fw-500'>
										<span>
											{this.props.classes && this.props.classes.viewClass?.name}
										</span>
									</div>
								</div>
								<div className='col-2 justify-end'>
									<button
										type='submit'
										className='secondary-btn'
										onClick={() =>
											this.setState({
												...this.state,
												modalShow: true,
											})
										}
									>
										<FilterListIcon
											sx={{
												color: "#0070F8",
												fontSize: 18,
												fontWeight: 500,
												mr: 0.5,
											}}
										/>
										Filter
									</button>
								</div>
							</div>
						</div>
						<div className='mt-24 class-daily'>
							<div className='class-detail col-12'>
								<div className=''>
									<span className='fc-second'>Details</span>

									<div className='mt-16 attend-detail-content'>
										<div className='class-detail-date-time'>
											<div className='col-6 flex-column'>
												<span className='f-10 fc-second'>
													{profile &&
														profile.display_item &&
														profile.display_item[0].title}
												</span>
											</div>
											<div className='col-6 flex-column'>
												<span className='f-10 fc-second'>
													{profile &&
														profile.display_item &&
														profile.display_item[1].title}
												</span>
											</div>
										</div>
										<div className='class-detail-date-time mt-8'>
											<div className='col-6 flex-column'>
												<span className='f-16 fw-500'>
													{profile &&
														profile.display_item &&
														profile.display_item[0].value}
												</span>
											</div>
											<div className='col-6 flex-column'>
												<span className='f-16 fw-500'>
													{profile &&
														profile.display_item &&
														profile.display_item[1].value}
												</span>
											</div>
										</div>
										<div className='class-detail-date-time mt-16'>
											<div className='col-6 flex-column'>
												<span className='f-10 fc-second'>
													{profile &&
														profile.display_item &&
														profile.display_item[2].title}
												</span>
											</div>
											<div className='col-6 flex-column'>
												<span className='f-10 fc-second'>
													{profile &&
														profile.display_item &&
														profile.display_item[3].title}
												</span>
											</div>
										</div>
										<div className='class-detail-date-time mt-8'>
											<div className='col-6 flex-column'>
												<span className='f-16 fw-500'>
													{profile &&
														profile.display_item &&
														profile.display_item[2].value}
												</span>
											</div>
											<div className='col-6 flex-column'>
												<span className='f-16 fw-500'>
													{profile &&
														profile.display_item &&
														profile.display_item[3].value}
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

				<Modal
					aria-labelledby='contained-modal-title-vcenter'
					centered
					dialogClassName={"confirm-modal"}
					show={this.state.modalShow}
					onHide={() => {
						this.setState({
							...this.state,
							modalShow: false,
						});
					}}
				>
					<Modal.Body className='p-16'>
						<div className='filter-tile pb-16 '>Filter by</div>
						<div>
							<LocalizationProvider
								dateAdapter={AdapterDateFns}
								className='dropdown-box'
							>
								<DatePicker
									inputFormat='dd/MM/yyyy'
									openTo='year'
									views={["year", "month", "day"]}
									label='Year, Month and Day'
									minDate={new Date("2012-03-01")}
									maxDate={new Date("2050-06-01")}
									value={this.state.selectedMonth}
									onChange={(newValue) => {
										this.setState({
											selectedMonth: newValue,
										});
									}}
									renderInput={(params) => (
										<TextField
											{...params}
											helperText={null}
											sx={{ width: 300 }}
										/>
									)}
								/>
							</LocalizationProvider>
						</div>
						<button
							type='submit'
							className='mt-40 mt-16 btn btn-primary right w-100'
							onClick={() => {
								this.getMyAttendance(this.state.selectedMonth);
								this.setState({
									...this.state,
									modalShow: false,
								});
							}}
						>
							Confirm
						</button>
					</Modal.Body>
				</Modal>
			</>
		);
	}
}
const mapStateToProps = ({
	authUser,
	classes,
	response,
	attendance,
	schools,
}: StoreState): {
	authUser: AuthInterface;
	classes: any;
	response: any;
	attendance: any;
	schools : any;
} => {
	return {
		authUser,
		classes,
		response,
		attendance,
		schools,
	};
};

export default connect(mapStateToProps, {
	getAll,
	getUserInfo,
	getClassAttend,
	getClassObject,
	getAssignUserByClass,
	signOut,
	LoadingActionFunc,
	getSchoolObj,
})(AdminAllAttendancesClasses);
