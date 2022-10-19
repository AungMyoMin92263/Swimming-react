import React from "react";

// import csss
import styles from "./../../css/pages.module.css";
import "../admin/AdminDashboard.css";
import "./ManagerDashboard.css";
import AddIcon from "@mui/icons-material/Add";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { School } from "../../stores/model/school";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import {
  signIn,
  signOut,
  getAll,
  LoadingActionFunc,
  deleteStudent,
  deleteCoach,
  deleteUser,
} from "../../stores/actions";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { InitialIcon } from "../../atoms/InitialIcon";
import { getItem, removeItem } from "../../auth/LocalStorage";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dropdown from "react-bootstrap/Dropdown";
import { Modal } from "react-bootstrap";

interface IStates {
  schools: School[];
  school_id: any;
  email: string;
  dropdown: boolean;
  dropdownMore: boolean;
  currentIndex: number;
  isLogout: boolean;
  users: any[];
  filteredUsers: any[];
  search: string;
  viewStudentUrl: string;
  editStudentUrl: string;
  viewCoachUrl: string;
  editCoachUrl: string;
  modalShow : boolean;
  removeIndex : number;
}
interface UserSignInPage {
  signIn: Function;
  authUser: AuthInterface;
  signOut: Function;
  getAll: Function;
  users: any;
  LoadingActionFunc: Function;
  deleteStudent: Function;
  student: any;
  coach: any;
  deleteCoach: Function;
  deleteUser: Function;
  user: any;
}

type IProps = UserSignInPage;

class PeopleListPage extends React.Component<IProps, IStates> {
  editStudentUrl = "/manager/student-edit-profile/";
  viewStudentUrl = "/manager/student-detail/";
  editCoachUrl = "/manager/coach-edit-profile/";
  viewCoachUrl = "/manager/coach-detail/";

  constructor(props: any) {
    super(props);

    this.state = {
      schools: [],
      email: "",
      school_id: -1,
      dropdown: false,
      dropdownMore: false,
      currentIndex: -1,
      isLogout: false,
      users: [],
      filteredUsers: [],
      search: "",
      viewStudentUrl: "",
      editStudentUrl: "",
      viewCoachUrl: "",
      editCoachUrl: "",
      modalShow : false,
      removeIndex : -1,
    };
    this.props.LoadingActionFunc(true);
  }

  componentDidMount() {
    //loading
    this.setUserInfo();
    this.props.LoadingActionFunc(false);
  }

  setUserInfo = async () => {
    const user = JSON.parse(getItem("authUser") || "null");
    if (user && user.userInfo) {
      this.setState({
        email: user.userInfo.email,
      });
      if (user.userInfo.assign_school) {
        await this.setState({
          school_id: user.userInfo.assign_school.school_id,
        })
        this.getUsers(user.userInfo.assign_school.school_id);
      }
    }
  };

  getUsers = async (id : number) => {
    let getUserUrl = "schools/all-user/" + id;
    await this.props.getAll(getUserUrl);
    await this.setState({
      users: this.props.users.result,
    });
    this.props.LoadingActionFunc(false);
  };

  toggleOpen = () => {
    let dropdownVal = !this.state.dropdown;
    this.setState({
      dropdown: dropdownVal,
    });
  };

  logout = async () => {
    await this.props.signOut();
    this.props.LoadingActionFunc(true);
    removeItem("authUser");
    removeItem("class");
    this.setState({
      isLogout: true,
    });
  };

  searchChanged = async (e: any) => {
    await this.setState({
      search: e.target.value,
    });

  };

  toggleOpenMore = (index: number) => {
    let dropdownVal = !this.state.dropdownMore;
    this.setState({
      currentIndex: index,
      dropdownMore: dropdownVal,
      viewStudentUrl: this.viewStudentUrl + this.state.users[index].id,
      editStudentUrl: this.editStudentUrl + this.state.users[index].id,
      editCoachUrl: this.editCoachUrl + this.state.users[index].id,
      viewCoachUrl: this.viewCoachUrl + this.state.users[index].id,
    });
  };



  remove = async () => {
    //this.removeUser(this.state.users[index].id,this.state.users[index].role);
    await this.props.deleteUser("users", this.state.users[this.state.removeIndex].id);
    console.log("this.props.user", this.props.user);
    if (
      this.props.user &&
      this.props.user.result &&
      this.props.user.result.data.statusText === "success"
    ) {
      this.setState({
        modalShow : this.state.modalShow? false : this.state.modalShow,
        });
      this.getUsers(this.state.school_id);
    }
  };

  removeUser = async (id: any, role: string) => {
    switch (role) {
      case "coache": {
        this.deleteCoach(id);
        break;
      }
      case "student": {
        this.deleteStudent(id);
        break;
      }
      default: {
        console.log("No User Type");
        break;
      }
    }
  };

  deleteStudent = async (id: any) => {
    await this.props.deleteStudent("student", id);
    if (
      this.props.student.result &&
      this.props.student.result.data.statusText === "success"
    ) {
      this.getUsers(this.state.school_id);
    }
  };

  deleteCoach = async (id: any) => {
    await this.props.deleteCoach("coach", id);
    if (
      this.props.coach.result &&
      this.props.coach.result.data.statusText === "success"
    ) {
      this.getUsers(this.state.school_id);
    }
  };

  render() {
    const {
      users,
      email,
      dropdown,
      isLogout,
      filteredUsers,
      search,
      dropdownMore,
      currentIndex,
      viewStudentUrl,
      editStudentUrl,
      viewCoachUrl,
      editCoachUrl,
      removeIndex
    } = this.state;
    let parents = users?.filter(
			(u: any) => u.role === "student" 
		)
    console.log("parents", parents)
    return (
			<>
				<div className='container-cus'>
					{isLogout && <Navigate to='/manager/login' replace={true} />}

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
												value={search}
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
											<th className='col-4'>
												<span className='ml-56'>Name</span>
											</th>
											<th className='col-4'>Email</th>
											<th className='col-4'>Role</th>
										</tr>
									</thead>
									<tbody>
										{users &&
											users.length > 0 &&
											users
												.filter(
													(u: any) => u.role !== "manager" && u.role !== "admin"
												)
												.filter((user: any) => {
													if (!search) {
														return true;
													} else if (
														search.toLowerCase() === "student" ||
														search.toLowerCase() === "coach"
													) {
														return (
															(user.role || "").toLowerCase() ===
															(search.toLowerCase() === "coach"
																? "coache"
																: search.toLowerCase())
														);
													} else {
														return (user.name || "")
															.toLowerCase()
															.startsWith(search.toLowerCase());
													}
												})
												.map((user: any, index: any) => (
													<tr>
														<td className='flex justify-center'>
															<InitialIcon
																initials={
																	user && user.email
																		? user.email.substring(0, 1).toUpperCase()
																		: ""
																}
																isFooterMenu={false}
															/>
															<span className='ml-16'>
																{!user || !user.name || user.name === ""
																	? "-"
																	: user.name}
															</span>
														</td>
														<td>
															<span className=''>{user && user.email}</span>
														</td>

														<td>
															<span>
																{user && user.role === "coache"
																	? "Coach"
																	: user && user.role === "admin"
																	? "Admin"
																	: user && user.role === "manager"
																	? "School Manager"
																	: user && user.role === "student"
																	? "Student"
																	: user && user.role === "parent"
																	? "Parent"
																	: ""}
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
																				"/manager/coach-edit-profile/" +
																				this.state.users[index].id
																			}
																		>
																			<span>Edit</span>
																		</Dropdown.Item>
																	) : (
																		<Dropdown.Item
																			href={
																				"/manager/student-edit-profile/" +
																				this.state.users[index].id
																			}
																		>
																			<span>Edit</span>
																		</Dropdown.Item>
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
											parents.map((user: any, index: any) => (
												<tr>
													<td className='flex justify-center'>
														<InitialIcon
															initials={
																user &&
																user.student &&
																user.student.parent_email &&
																user.student.parent_email
																	? user.student.parent_email
																			.substring(0, 1)
																			.toUpperCase()
																	: ""
															}
															isFooterMenu={false}
														/>
														<span className='ml-16'>
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
															{user &&
															user.student &&
															user.student.parent_email &&
															user.student.parent_email
																? user.student.parent_email
																: "-"}
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
																{user && user.role === "coache" ? (
																	<Dropdown.Item
																		href={
																			"/manager/coach-edit-profile/" +
																			parents[index].id
																		}
																	>
																		<span>Edit</span>
																	</Dropdown.Item>
																) : (
																	<Dropdown.Item
																		href={
																			"/manager/student-edit-profile/" +
																			parents[index].id
																		}
																	>
																		<span>Edit</span>
																	</Dropdown.Item>
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
							Remove {users && users.length > 0 && users[removeIndex] && users[removeIndex].role} ‘{" "}
							{users && users.length > 0 && users[removeIndex] && users[removeIndex].name} ’?{" "}
						</span>
					</div>
					<div className='mb-16'>
						<span className='f-16'>
							This action cannot be undone. This action will remove the coach
							from this class and your school.
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
  student,
  coach,
  user,
}: StoreState): {
  authUser: AuthInterface;
  users: any;
  student: any;
  coach: any;
  user: any;
} => {
  return {
    authUser,
    users,
    student,
    coach,
    user,
  };
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
  getAll,
  LoadingActionFunc,
  deleteStudent,
  deleteCoach,
  deleteUser,
})(PeopleListPage);
