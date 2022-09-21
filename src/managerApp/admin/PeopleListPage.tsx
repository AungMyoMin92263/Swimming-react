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
} from "../../stores/actions";

import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { getItem, removeItem } from "../../auth/LocalStorage";
import { InitialIcon } from "../../atoms/InitialIcon";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
interface IStates {
	users: any[];
	email: string;
	dropdown: boolean;
	isLogout: boolean;
	dropdownMore: boolean;
	currentIndex: number;
	url: string;
	filterText: string;
}
interface UserSignInPage {
  signIn: Function;
  authUser: AuthInterface;
  signOut: Function;
  getAllUsers: Function;
  users: any;
  LoadingActionFunc: Function;
}

type IProps = UserSignInPage;

class AdminPeopleListPage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
			users: [],
			email: "",
			dropdown: false,
			isLogout: false,
			dropdownMore: false,
			currentIndex: -1,
			url: "",
			filterText: "",
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
    this.setState({
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

  searchChanged = (e : any) => {
	 this.setState({
			...this.state,
			filterText: e.currentTarget.value,
		});
  }

  render() {
    const {
			users,
			email,
			dropdown,
			isLogout,
			dropdownMore,
			currentIndex,
			filterText,
		} = this.state;
    return (
			<>
				<div className='container-cus'>
					{isLogout && <Navigate to='/admin/login' replace={true} />}
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
											<th className='col-6'>
												{" "}
												<span className='ml-56'>Name</span>
											</th>
											<th className='col-6'>Role</th>
											{/* <th className='col-1'></th> */}
										</tr>
									</thead>
									<tbody>
										{users &&
											users.length > 0 &&
											users
												.filter((user: any) => {
													if (!filterText) {
														return true;
													} else {
														return (user.name || "")
															.toLowerCase()
															.startsWith(filterText.toLowerCase());
													}
												})
												.map((user: any, index: any) => (
													<tr>
														<td className='flex justify-center'>
															<InitialIcon
																initials={user.email.substr(0, 1).toUpperCase()}
																isFooterMenu={false}
															/>
															<span className='ml-16'>
																{!user.name || user.name === ""
																	? "-"
																	: user.name}
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
														{/* <td>
														<div className='mr-16'>
															<MoreVertIcon
																style={{
																	color: "inherit",
																	cursor: "pointer",
																}}
																onClick={() => this.toggleOpenMore(index)}
															/>
														</div>
													</td> */}
													</tr>
												))}
									</tbody>
								</table>
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
  users,
}: StoreState): {
  authUser: AuthInterface;
  users: any;
} => {
  return {
    authUser,
    users,
  };
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
  getAllUsers,
  LoadingActionFunc,
})(AdminPeopleListPage);
