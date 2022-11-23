import React from "react";

// import css
import "../manager/ManagerDashboard.css";
import "../manager/ManagerClassDetailPage.css";
import { getAllclasses, deleteClass } from "../../stores/actions/class-action";
import Dropdown from "react-bootstrap/Dropdown";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getSchoolObj } from "../../stores/actions/school-action";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { StoreState } from "../../stores/reducers";
import {
	getClassObject,
	getAll,
	getClassProgram,
	postClassProgram,
	getAssignUserByClass,
	getAllUsers,
} from "../../stores/actions";
import { connect } from "react-redux";
import { signOut, LoadingActionFunc, deleteUser } from "../../stores/actions";
import { Link } from "react-router-dom";
import { Class } from "../../stores/model/class";
import { getItem, removeItem } from "../../auth/LocalStorage";
import placeholder from "./../../assets/images/place-holder.png";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { AuthInterface } from "../../stores/model/auth-interface";
import ListItem, { IListItem } from "../../atoms/ListItem";
import { InitialIcon, InitialIconList } from "../../atoms/InitialIcon";
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
import CommentDashItem from "../../atoms/CommentDash";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Button } from "react-bootstrap";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { Modal } from "react-bootstrap";

interface IStates {
	email: string;
	logo: string;
	school_name: string;
	dropdown: boolean;
	isLogout: boolean;
	step: number;
	url: string;
	image: any;
	schoolId: any;
	id: any;

	classe: any;
	coaches: any[];
	attendances: any[];
	profile: IProfile;
	isPreview: boolean;
	classes: any;
	classFilterText: string;
	userFilterText: string;
	removeClassIndex: number;
	removeUserIndex: number;
	modalShow: boolean;
	users: any;
}
interface IProps {
	authUser: AuthInterface;
	LoadingActionFunc: Function;
	signOut: Function;
	getAllclasses: Function;
	getAssignUserByClass: Function;
	classList: any;
	getSchoolObj: Function;
	deleteClass: Function;
	deleteUser: Function;
	classes: any;
	user: any;
	getAll: Function;
	response: any;
	history: any;
	schools: any;
	getAllUsers: Function;
	users: any;
}

class AdminSchoolDetailPage extends React.Component<IProps, IStates> {
	id: any;
	urlAllClasses: any;
	urlAllPeople: any;
	url = "/admin/edit-class/";
	constructor(props: any) {
		super(props);
		let path = window.location.pathname.split("/");
		this.id = path[3];
		this.urlAllClasses = "/admin/all-class/" + this.id;
		this.urlAllPeople = "/admin/all-people/" + this.id;
		this.state = {
			classFilterText: "",
			userFilterText: "",
			email: "",
			logo: "",
			school_name: "",
			dropdown: false,
			isLogout: false,
			step: 0,
			url: this.url + this.id,
			image: { preview: "", raw: "" },
			schoolId: this.id,
			id: this.id ? this.id : -1,
			classe: { start_date: null },
			coaches: [],
			attendances: [],
			classes: [],
			profile: { title: "" },
			isPreview: false,
			modalShow: false,
			removeClassIndex: -1,
			removeUserIndex: -1,
			users: [],
		};
	}
	componentDidMount() {
		this.authFromLocal();
		
		//loading
	}
	authFromLocal = async () => {
		let user = JSON.parse(getItem("authUser") || "null");
		if (user && user.userInfo) {
			this.setState({
				email: user.userInfo.email,
			});
		}
		await this.getSchool();
		// await this.getCoachesByClass();
		// await this.getAttendancesByClass();
		await this.getClasses();
	};

	searchClassChanged = (e: any) => {
		this.setState({
			...this.state,
			classFilterText: e.currentTarget.value,
		});
	};
	searchUserChanged = (e: any) => {
		this.setState({
			...this.state,
			userFilterText: e.currentTarget.value,
		});
	};

	remove = async () => {
		if (this.state.removeClassIndex !== -1) {
			this.props.LoadingActionFunc(true);
			this.removeClass(this.state.classes[this.state.removeClassIndex].id);
			this.getClasses();
		}
		if (this.state.removeUserIndex !== -1) {
			await this.props.deleteUser(
				"users",
				this.props.schools.result?.assign_user[this.state.removeUserIndex]
					.user_id
			);
			if (
				this.props.user &&
				this.props.user.result &&
				this.props.user.result.data.statusText === "success"
			) {
				this.setState({
					modalShow: this.state.modalShow ? false : this.state.modalShow,
					removeUserIndex: -1,
					removeClassIndex: -1,
				});
				this.getSchool();
			}
		}
	};

	removeClass = async (id: any) => {
		await this.props.deleteClass(
			"/school/" + this.state.schoolId + "/class",
			id
		);
		if (
			this.props.classList.result &&
			this.props.classList.result.data.statusText === "success"
		) {
			this.props.LoadingActionFunc(false);
			this.getClasses();
			this.setState({
				modalShow: false,
				removeClassIndex: -1,
			});
		} else this.props.LoadingActionFunc(false);
	};

	getSchool = async () => {
		await this.props.getSchoolObj("schools/" + this.state.id);
		let school = this.props.schools.result;
		if (school) {
			this.setState({
				school_name: school.name,
				logo: school.logo,
				id: school.id,
				users: school.assign_user,
			});
		}
	};

	getClasses = async () => {
		let url = "";
		const user = JSON.parse(getItem("authUser") || "null");
		if (user) {
			url = "school/" + this.id + "/class";
			await this.props.getAllclasses(url);
			if (this.props.classList.result)
				this.setState({
					classes: this.props.classList.result || [],
					users: this.props.classList.assignUser,
				});
			this.props.LoadingActionFunc(false);
		} else this.props.LoadingActionFunc(false);
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
	goToAllComments = (id: any) => {
		// this.setState({ goAllComments: true });
		let cmdUrl = "/coach/dashboard/all-comments/" + id;
		this.props.history.push(cmdUrl);
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
					initials={name.substr(0, 1).toUpperCase()}
					isFooterMenu={true}
				/>
			);
		}
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

	toggleOpen = () => {
		let dropdownVal = !this.state.dropdown;
		this.setState({
			dropdown: dropdownVal,
		});
	};

	largePic = (src: string) => {
		window.open(src);
	};

	renderUsers = () => {
		let parents = this.props.schools.result?.assign_user?.filter(
			(u: any) => u.type === "student"
		);
		return (
			<>
				{/* <div className='class-attendance-header mt-24 fc-second'>
					<span>People</span>
					<Link to={this.urlAllClasses}>
					<span className='fc-primary'>View All</span>
				</Link>
				</div> */}
				<div className='mt-24 class-comment-header flex justify-space-between '>
					<span className='fc-second'>People</span>
					<Link to={this.urlAllPeople}>
						<span className='fc-primary'>View All</span>
					</Link>
				</div>

				<div className='class-attendance-body mt-16 '>
					<>
						<div className='tableBody'>
							<div className='tableSearch'>
								<div className='textArea'>
									<div className='dash-search-div'>
										<div className='dash-search-icon-div'>
											<SearchIcon
												sx={{ color: "#808080", fontSize: 16, mr: 0.5 }}
											/>
										</div>
										<input
											className='dash-input-div'
											placeholder='Search by name or role'
											value={this.state.userFilterText}
											onChange={this.searchUserChanged}
										/>
									</div>
									{/* <div className='dash-filter-div'>
									<FilterListIcon
										sx={{
											color: "#0070F8",
											fontSize: 18,
											fontWeight: 500,
											mr: 0.5,
										}}
									/>
									Filter
								</div> */}
								</div>
							</div>
							<table className='table'>
								<thead>
									<tr>
										<th className='col-6'>
											<span className='ml-56'>Name</span>
										</th>
										<th className='col-3'>Status</th>
										<th className='col-3'>Role</th>
										{/* <th className='col-1'></th> */}
									</tr>
								</thead>
								<tbody>
									{this.props?.schools?.result &&
										this.props.schools.result?.assign_user?.length > 0 &&
										this.props.schools.result?.assign_user

											.filter((user: any) => {
												if (!this.state.userFilterText) {
													return true;
												} else {
													return (
														(user.user.name || "")
															.toLowerCase()
															.startsWith(
																this.state.userFilterText.toLowerCase()
															) ||
														(user.user.role || "")
															.toLowerCase()
															.startsWith(
																this.state.userFilterText.toLowerCase()
															)
													);
												}
											})
											.slice(0, 7)

											.map((user: any, index: any) => (
												<tr>
													<td className='flex justify-center'>
														{user && user.user && user.user.avatar ? (
															<img
																src={
																	process.env.REACT_APP_API_ENDPOINT +
																	"/" +
																	user.user.avatar
																}
																className='icon'
																alt=''
															/>
														) : (
															<InitialIcon
																initials={
																	user &&
																	user.user &&
																	user.user?.email.substr(0, 1).toUpperCase()
																}
																isFooterMenu={false}
															/>
														)}

														<span className='ml-16'>
															{!user.user.name ||
															user.user.name === "" ||
															user.user.name === "null"
																? "-"
																: user.user.name}
														</span>
													</td>

													<td>
														<span
															className={`${
																user.user &&
																user.user.password &&
																user.user.password !== ""
																	? "onboarded"
																	: "pending"
															}`}
														>
															{user.user &&
															user.user.password &&
															user.user.password !== ""
																? "Onboarded"
																: "Pending"}
														</span>
													</td>

													<td>
														<span>
															{user.user.role === "coache"
																? "Coach"
																: user.user.role === "admin"
																? "Admin"
																: user.user.role === "manager"
																? "School Manager"
																: user.user.role === "student"
																? "Student"
																: user.user.role === "parent"
																? "Parent"
																: user.user.role}
														</span>
													</td>
													<td className='mr-16'>
														<Dropdown className='more-dropdown'>
															<Dropdown.Toggle
																id='dropdown-basic'
																className='more-list-btn'
															>
																<MoreVertIcon />
															</Dropdown.Toggle>
															<Dropdown.Menu>
																{user && user.user.role === "coache" ? (
																	<Dropdown.Item
																		href={
																			"/admin/coach-edit-profile/" +
																			user.user.id
																		}
																	>
																		<span>Edit</span>
																	</Dropdown.Item>
																) : (
																	<>
																		{user && user.user.role === "student" ? (
																			<Dropdown.Item
																				href={
																					"/admin/student-edit-profile/" +
																					user.user.id
																				}
																			>
																				<span>Edit</span>
																			</Dropdown.Item>
																		) : (
																			<Dropdown.Item
																				href={
																					"/admin/manager-edit-profile/school/" +
																					user.user.id
																				}
																			>
																				<span>Edit</span>
																			</Dropdown.Item>
																		)}
																	</>
																)}

																<div className='dropdown-divider'></div>

																<Dropdown.Item
																	onClick={() =>
																		this.setState({
																			removeUserIndex: index,
																			modalShow: true,
																		})
																	}
																>
																	<span>Remove</span>
																</Dropdown.Item>
															</Dropdown.Menu>
														</Dropdown>
													</td>
												</tr>
											))}
									{parents &&
										parents.length > 0 &&
										parents
											.filter((user: any) => {
												if (!this.state.userFilterText) {
													return false;
												} else {
													return (
														(user.name || "")
															.toLowerCase()
															.startsWith(
																this.state.userFilterText.toLowerCase()
															) ||
														("parent" || "")
															.toLowerCase()
															.startsWith(
																this.state.userFilterText.toLowerCase()
															)
													);
												}
											})
											.map((user: any, index: any) => (
												<tr>
													<td className='flex justify-center'>
														<InitialIcon
															initials={
																user &&
																user.user.parent_email &&
																user.user.parent_email
																	? user.user.parent_email
																			.substring(0, 1)
																			.toUpperCase()
																	: ""
															}
															isFooterMenu={false}
														/>
														<span className='ml-16'>
															{user &&
															user.user &&
															user.user.student &&
															user.user.student.parent_name &&
															user.user.student.parent_name
																? user.user.student.parent_name
																: "-"}
														</span>
													</td>

													<td>
														<span
															className={`${
																user.parent_password &&
																user.parent_password !== ""
																	? "onboarded"
																	: "pending"
															}`}
														>
															{user.parent_password &&
															user.parent_password !== ""
																? "Onboarded"
																: "Pending"}
														</span>
													</td>

													<td>
														<td>
															<span>Parent</span>
														</td>
													</td>
													<td className='mr-16'>
														<Dropdown className='more-dropdown'>
															<Dropdown.Toggle
																id='dropdown-basic'
																className='more-list-btn'
															>
																<MoreVertIcon />
															</Dropdown.Toggle>
															<Dropdown.Menu>
																<Dropdown.Item
																	href={
																		"/admin/student-edit-profile/" +
																		parents[index].user.id
																	}
																>
																	<span>Edit</span>
																</Dropdown.Item>

																<div className='dropdown-divider'></div>

																<Dropdown.Item
																	onClick={() =>
																		this.setState({
																			removeUserIndex:
																				this.props.schools.result?.assign_user.indexOf(
																					this.props.schools.result?.assign_user.find(
																						(user: any) =>
																							user.id === parents[index].id
																					)
																				),
																			modalShow: true,
																		})
																	}
																>
																	<span>Remove</span>
																</Dropdown.Item>
															</Dropdown.Menu>
														</Dropdown>
													</td>
												</tr>
											))}
								</tbody>
							</table>
						</div>
					</>
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
							removeUserIndex: -1,
							removeClassIndex: -1,
						});
					}}
				>
					<div className='mb-16'>
						{this.state.removeClassIndex !== -1 && (
							<span className='f-20 fw-500'>
								Remove class ‘{" "}
								{this.state.classes[this.state.removeClassIndex] &&
									this.state.classes[this.state.removeClassIndex].name}{" "}
								’?{" "}
							</span>
						)}
						{this.state.removeUserIndex !== -1 && (
							<span className='f-20 fw-500'>
								Remove user ‘{" "}
								{this.props.schools.result?.assign_user.length > 0 &&
								this.props.schools.result?.assign_user[
									this.state.removeUserIndex
								] &&
								this.props.schools.result?.assign_user[
									this.state.removeUserIndex
								].user &&
								this.props.schools.result?.assign_user[
									this.state.removeUserIndex
								].user.name
									? this.props.schools.result?.assign_user[
											this.state.removeUserIndex
									  ].user.name
									: this.props.schools.result?.assign_user[
											this.state.removeUserIndex
									  ].user.email}{" "}
								’?{" "}
							</span>
						)}
					</div>
					<div className='mb-16'>
						<span className='f-16'>
							This action cannot be undone. This action will remove the class
							from your school.
						</span>
					</div>
					<div className='flex-center'>
						<button
							type='submit'
							className='secondary-btn mr-8'
							onClick={() =>
								this.setState({
									...this.state,
									modalShow: false,
									removeUserIndex: -1,
									removeClassIndex: -1,
								})
							}
						>
							Cancel
						</button>
						<button
							type='submit'
							className='secondary-btn'
							style={{ color: "#F80000", borderColor: "#F80000" }}
							onClick={this.remove}
						>
							Remove
						</button>
					</div>
				</Modal>
			</>
		);
	};

	renderClasses = () => [
		<div className='mt-24'>
			<div className='class-comment-header flex justify-space-between '>
				<span className='fc-second'>Classes</span>
				<Link to={this.urlAllClasses}>
					<span className='fc-primary'>View All</span>
				</Link>
			</div>
			<div className='class-attendance-body mt-16 '>
				<div className='tableBody'>
					<div className='tableSearch'>
						<div className='textArea'>
							<div className='dash-search-div'>
								<div className='dash-search-icon-div'>
									<SearchIcon
										sx={{ color: "#808080", fontSize: 16, mr: 0.5 }}
									/>
								</div>
								<input
									className='dash-input-div'
									placeholder='Search by class, date/time or coach(es)'
									value={this.state.classFilterText}
									onChange={this.searchClassChanged}
								/>
							</div>
							{/* <div className='dash-filter-div'>
									<FilterListIcon
										sx={{
											color: "#0070F8",
											fontSize: 18,
											fontWeight: 500,
											mr: 0.5,
										}}
									/>
									Filter
								</div> */}
						</div>
					</div>

					<>
						<table className='table'>
							<thead>
								<tr>
									<th className='col-4'>
										<span className='ml-56'>CLASS</span>
									</th>
									<th className='col-3'>NEXT DATE/TIME</th>
									<th className='col-2'>COACH</th>
									<th className='col-3'>NO. STUDENTS</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className='flex'>
										<div className='ml-16 flex cursor'>
											<AddIcon />
										</div>
										<Link to={"/admin/add-class/" + this.id}>
											<span className='f-16 ml-16 fc-primary fw-500'>
												Create Class
											</span>
										</Link>
									</td>
								</tr>
								{this.state.classes &&
									this.state.classes.length > 0 &&
									this.state.classes
										
										.filter((user: any) => {
											if (!this.state.classFilterText) {
												return true;
											} else {
												return (user.name || "")
													.toLowerCase()
													.startsWith(this.state.classFilterText.toLowerCase());
											}
										}).slice(0, 5)

										.map((classe: Class, index: any) => (
											<tr>
												<td>
													<img
														src={
															classe
																? process.env.REACT_APP_API_ENDPOINT +
																  "/" +
																  classe.logo
																: placeholder
														}
														alt='logo'
														id='logo'
														className={`${classe ? "icon" : "w-48"}`}
													/>
													<span className='ml-16'>{classe.name}</span>
												</td>
												<td>
													{classe.start_date} {classe.start_time}
												</td>
												<td className='emailInitialIcon'>
													{classe.assign_user &&
														classe.assign_user.length > 0 &&
														classe.assign_user.map((user: any, index) =>
															user.type === "coache" && index === 0 ? (
																<InitialIcon
																	initials={(user.user ? user.user.email : "")
																		.substr(0, 1)
																		.toUpperCase()}
																	isFooterMenu={false}
																/>
															) : (
																<InitialIconList
																	initials={(user.user ? user.user.email : "")
																		.substr(0, 1)
																		.toUpperCase()}
																	isFooterMenu={false}
																/>
															)
														)}
												</td>

												<td>
													<div className='flex '>
														<span>{classe.studentCount}</span>
													</div>
												</td>
												<td>
													<Dropdown className='more-dropdown'>
														<Dropdown.Toggle
															id='dropdown-basic'
															className='more-list-btn'
														>
															<MoreVertIcon />
														</Dropdown.Toggle>
														<Dropdown.Menu>
															<Dropdown.Item
																href={
																	"/admin/school/" +
																	this.id +
																	"/class/" +
																	classe.id
																}
															>
																<span>View</span>
															</Dropdown.Item>

															<div className='dropdown-divider'></div>

															<Dropdown.Item
																onClick={() =>
																	this.setState({
																		removeClassIndex: index,
																		modalShow: true,
																	})
																}
															>
																<span>Remove</span>
															</Dropdown.Item>
														</Dropdown.Menu>
													</Dropdown>
													{/* <div className='flex justify-space-around'>
														<span>{classe.studentCount}</span>
														<div className='dropdownMore'>
															<MoreVertIcon
																style={{
																	color: "inherit",
																	cursor: "pointer",
																}}
																onClick={() => this.toggleOpenMore(index)}
															/>
															<div
																className={`dropdown-menu ${
																	this.state.dropdownMore &&
																	this.state.currentIndex === index
																		? "show"
																		: ""
																}`}
																aria-labelledby='dropdownMenuButton'
															>
																<Link to={this.state.url}>
																	<div className='dropdown-item cursor'>
																		<span>View</span>
																	</div>
																</Link>
																<div className='dropdown-divider'></div>
																<div
																	className='dropdown-item cursor'
																	onClick={() => this.remove(index)}
																>
																	<span>Remove</span>
																</div>
															</div>
														</div>
													</div> */}
												</td>
											</tr>
										))}
										
							</tbody>
						</table>
					</>
				</div>
			</div>
		</div>,
	];

	render() {
		const { email, logo, school_name, step, isPreview } = this.state;

		return (
			<>
				<div className='container-cus'>
					<div className='dashboard'>
						<div className='dashboard-header'>
							<div className='justify-center justify-space-between'>
								<Link to='/admin/dashboard' style={{ textDecoration: "none" }}>
									<ArrowBackIcon
										sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
									></ArrowBackIcon>
									<span>Back</span>
									
								</Link>
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
												this.state.logo
													? process.env.REACT_APP_API_ENDPOINT +
													  "/" +
													  this.state.logo
													: placeholder
											}
											alt='logo'
											className='big-logo'
										/>
									</div>

									<div className='f-40 fw-500'>
										<span>{this.state.school_name}</span>
									</div>
								</div>
							</div>
						</div>
						<div className='class-detail-body'>
							<>
								{this.renderClasses()}
								{this.renderUsers()}
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
	classList,
	schools,
	user,
	users,
}: StoreState): {
	authUser: AuthInterface;
	classes: any;
	response: any;
	classList: any;
	schools: any;
	user: any;
	users: any;
} => {
	return {
		authUser,
		classes,
		response,
		classList,
		schools,
		user,
		users,
	};
};

export default connect(mapStateToProps, {
	deleteUser,
	getClassObject,
	getSchoolObj,
	getAll,
	getAllclasses,
	getAssignUserByClass,
	signOut,
	LoadingActionFunc,
	getAllUsers,
})(AdminSchoolDetailPage);
