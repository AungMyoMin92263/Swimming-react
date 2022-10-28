import React from "react";

// import csss
import "./AdminDashboard.css";
import "../manager/ManagerDashboard.css";

import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import {
	signIn,
	signOut,
	getAllUsers,
	LoadingActionFunc,
	deleteUser,
} from "../../stores/actions";

import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { getItem, removeItem } from "../../auth/LocalStorage";
import { InitialIcon } from "../../atoms/InitialIcon";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dropdown from "react-bootstrap/Dropdown";
import { Modal } from "react-bootstrap";
interface IStates {
	users: any[];
	email: string;
	dropdown: boolean;
	isLogout: boolean;
	dropdownMore: boolean;
	currentIndex: number;
	url: string;
	filterText: string;
	modalShow: boolean;
	removeIndex: number;
}
interface UserSignInPage {
	signIn: Function;
	authUser: AuthInterface;
	signOut: Function;
	getAllUsers: Function;
	users: any;
	LoadingActionFunc: Function;
	deleteUser: Function;
	user: any;
	history: any;
}

type IProps = UserSignInPage;

class AdminPeopleListPage extends React.Component<IProps, IStates> {
	constructor(props: any) {
		super(props);

		this.state = {
			users: [
				{
					role: "",
					name: "",
				},
			],
			email: "",
			dropdown: false,
			isLogout: false,
			dropdownMore: false,
			currentIndex: -1,
			url: "",
			filterText: "",
			modalShow: false,
			removeIndex: -1,
		};
		this.props.LoadingActionFunc(true);
	}

	componentDidMount() {
		const user = JSON.parse(getItem("authUser") || "null");
		if (user && user.userInfo) {
			this.setState({
				email: user.userInfo.email,
			});
		}
		this.getUsers();
	}

	getUsers = async () => {
		await this.props.getAllUsers();
		let filtered = this.props.users.result.filter(
			(u: any) => u.role !== "admin"
		);

		this.setState({
			users: filtered,
		});
		this.props.LoadingActionFunc(false);
	};

	remove = async () => {
		await this.props.deleteUser(
			"users",
			this.state.users[this.state.removeIndex].id
		);
		console.log("this.props.user", this.props.user);
		if (
			this.props.user &&
			this.props.user.result &&
			this.props.user.result.data.statusText === "success"
		) {
			this.setState({
				modalShow: this.state.modalShow ? false : this.state.modalShow,
			});
			this.getUsers();
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
		removeItem("school");
		this.setState({
			isLogout: true,
		});
		this.props.LoadingActionFunc(true);
	};

	toggleOpenMore = (index: number) => {
		let dropdownVal = !this.state.dropdownMore;
		this.setState({
			currentIndex: index,
			dropdownMore: dropdownVal,
		});
	};

	searchChanged = (e: any) => {
		this.setState({
			...this.state,
			filterText: e.currentTarget.value,
		});
	};

	render() {
		const {
			users,
			email,
			dropdown,
			isLogout,
			dropdownMore,
			currentIndex,
			removeIndex,
			filterText,
		} = this.state;
		let parents = users?.filter((u: any) => u.role === "student");
		return (
			<>
				<div className='container-cus'>
					{isLogout && <Navigate to='login' replace={true} />}
					<div className='dashboard'>
						{/* DASHBOARD HEADER */}
						<div className='dashboard-header'>
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
											dropdown ? "show" : ""
										}`}
										aria-labelledby='dropdownMenuButton'
									>
										<div className='dropdown-item cursor' onClick={this.logout}>
											<LogoutOutlinedIcon
												sx={{ color: "#0070F8", fontSize: 32, mr: 2 }}
											></LogoutOutlinedIcon>
											<span>Logout</span>
										</div>
									</div>
								</div>
							</div>
							<div className='row justify-center'>
								<div className='col-9 col-md-12 justify-start align-center'>
									<div className='f-40 fw-500'>
										<span>People</span>
									</div>
								</div>
							</div>
						</div>
						{/* DASHBOARD BODY */}
						<div className='dashboard-body'>
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
												value={filterText}
												onChange={this.searchChanged}
											/>
										</div>
										<div className='dash-filter-div'>
											{/* <FilterListIcon
												sx={{
													color: "#0070F8",
													fontSize: 18,
													fontWeight: 500,
													mr: 0.5,
												}}
											/>
											Filter */}
										</div>
									</div>
								</div>
								<table className='table'>
									<thead>
										<tr>
											<th className='col-1'></th>
											<th className='col-2'>
												{" "}
												<span className=''>Name</span>
											</th>
											<th className='col-3'>Email</th>
											<th className='col-1'>School</th>
											<th className='col-2'>Status</th>
											<th className='col-1'>Role</th>
											<th className='col-1'></th>
										</tr>
									</thead>
									<tbody>
										{users &&
											users.length > 0 &&
											users
												.filter((user: any) => {
													if (!this.state.filterText) {
														return true;
													} else {
														return (
															(user.name || "")
																.toLowerCase()
																.startsWith(
																	this.state.filterText.toLowerCase()
																) ||
															(user.role || "")
																.toLowerCase()
																.startsWith(this.state.filterText.toLowerCase())
														);
													}
												})
												.map((user: any, index: any) => (
													<tr>
														<td>
															<InitialIcon
																initials={
																	user.email
																		? user.email.substr(0, 1).toUpperCase()
																		: ""
																}
																isFooterMenu={false}
															/>
														</td>
														<td className='flex justify-center'>
															<span className=''>
																{!user.name || user.name === "" || user.name 
																	? "-"
																	: user.name}
															</span>
														</td>

														<td className='setWidth concat'>
															<span>{user.email}</span>
														</td>
														<td
															className='cursor'
															onClick={() =>
																this.props.history.push(
																	"/admin/school/" +
																		user?.assign_school?.school_id
																)
															}
														>
															{/* <span>{user?.assign_school?.school?.name}</span> */}
															<img
																src={
																	process.env.REACT_APP_API_ENDPOINT +
																	"/" +
																	user?.assign_school?.school?.logo
																}
																className='icon'
															/>
														</td>

														<td>
															<span
																className={`${
																	user.password && user.password !== ""
																		? "onboarded"
																		: "pending"
																}`}
															>
																{user.password && user.password !== ""
																	? "Onboarded"
																	: "Pending"}
															</span>
														</td>

														<td>
															<span>
																{user.role === "coache"
																	? "Coach"
																	: user.role === "admin"
																	? "Admin"
																	: user.role === "manager"
																	? "School Manager"
																	: user.role === "student"
																	? "Student"
																	: user.role === "parent"
																	? "Parent"
																	: user.role}
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
																	{user && user.role === "coache" ? (
																		<Dropdown.Item
																			href={
																				"/admin/coach-edit-profile/" + user.id
																			}
																		>
																			<span>Edit</span>
																		</Dropdown.Item>
																	) : (
																		<>
																			{user && user.role === "student" ? (
																				<Dropdown.Item
																					href={
																						"/admin/student-edit-profile/" +
																						user.id
																					}
																				>
																					<span>Edit</span>
																				</Dropdown.Item>
																			) : (
																				<Dropdown.Item
																					href={
																						"/admin/manager-edit-profile/" +
																						user.id
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
																				removeIndex: index,
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
													if (!this.state.filterText) {
														return true;
													} else {
														return (
															(user.name || "")
																.toLowerCase()
																.startsWith(
																	this.state.filterText.toLowerCase()
																) ||
															("parent" || "")
																.toLowerCase()
																.startsWith(this.state.filterText.toLowerCase())
														);
													}
												})
												.map((user: any, index: any) => (
													<tr>
														<td>
															<InitialIcon
																initials={
																	user && user.parent_email && user.parent_email
																		? user.parent_email
																				.substring(0, 1)
																				.toUpperCase()
																		: ""
																}
																isFooterMenu={false}
															/>
														</td>
														<td className='flex justify-center'>
															<span className=''>
																{user &&
																user.student &&
																user.student.parent_name &&
																user.student.parent_name
																	? user.student.parent_name
																	: "-"}
															</span>
														</td>

														<td>
															<span className=''>
																{user && user.parent_email && user.parent_email
																	? user.parent_email
																	: "-"}
															</span>
														</td>
														<td
															className='cursor'
															onClick={() =>
																this.props.history.push(
																	"/admin/school/" +
																		user?.assign_school?.school_id
																)
															}
														>
															{/* <span>{user?.assign_school?.school?.name}</span> */}
															<img
																src={
																	process.env.REACT_APP_API_ENDPOINT +
																	"/" +
																	user?.assign_school?.school?.logo
																}
																className='icon'
															/>
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
															{/* <div className='dropdownMore mr-24'>
																<MoreVertIcon
																	style={{
																		color: "inherit",
																		cursor: "pointer",
																	}}
																	onClick={() => this.toggleOpenMore(index)}
																/>
																<div
																	className={`dropdown-menu ${
																		dropdownMore && currentIndex === index
																			? "show"
																			: ""
																	}`}
																	aria-labelledby='dropdownMenuButton'
																>
																	<Link
																		to={
																			user && user.role === "coache"
																				? viewCoachUrl
																				: viewStudentUrl
																		}
																	>
																		<div className='dropdown-item cursor'>
																			<span>View</span>
																		</div>
																	</Link>
																	<div className='dropdown-divider'></div>

																	<Link
																		to={
																			user && user.role === "coache"
																				? editCoachUrl
																				: editStudentUrl
																		}
																	>
																		<div className='dropdown-item cursor'>
																			<span>Edit</span>
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
															</div> */}
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
																			parents[index].id
																		}
																	>
																		<span>Edit</span>
																	</Dropdown.Item>

																	<div className='dropdown-divider'></div>

																	<Dropdown.Item
																		onClick={() =>
																			this.setState({
																				removeIndex: index,
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
					<div className='mb-16'>
						<span className='f-20 fw-500'>
							Remove {users[removeIndex]?.role} ‘{" "}
							{users[removeIndex]?.name && users[removeIndex]?.name
								? users[removeIndex]?.name
								: users[removeIndex]?.email}{" "}
							’?{" "}
						</span>
					</div>
					<div className='mb-16'>
						<span className='f-16'>
							This action cannot be undone. This action will remove the school.
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
	}
}

const mapStateToProps = ({
	authUser,
	users,
	user,
}: StoreState): {
	authUser: AuthInterface;
	users: any;
	user: any;
} => {
	return {
		authUser,
		users,
		user,
	};
};

export default connect(mapStateToProps, {
	signIn,
	signOut,
	getAllUsers,
	LoadingActionFunc,
	deleteUser,
})(AdminPeopleListPage);
