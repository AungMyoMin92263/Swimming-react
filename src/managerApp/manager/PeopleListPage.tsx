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
  getAllUsers,
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
interface IStates {
  schools: School[];
  email: string;
  dropdown: boolean;
  dropdownMore: boolean;
  currentIndex: number;
  isLogout: boolean;
  users: any[];
  filteredUsers: any[];
  search: string;
  viewUrl: string;
  editUrl: string;
}
interface UserSignInPage {
  signIn: Function;
  authUser: AuthInterface;
  signOut: Function;
  getAllUsers: Function;
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
  editUrl = "/manager/student-edit-profile/";
  viewUrl = "/manager/student-detail/";

  constructor(props: any) {
    super(props);

    this.state = {
      schools: [],
      email: "",
      dropdown: false,
      dropdownMore: false,
      currentIndex: -1,
      isLogout: false,
      users: [],
      filteredUsers: [],
      search: "",
      viewUrl: "",
      editUrl: "",
    };
    this.props.LoadingActionFunc(true);
  }

  componentDidMount() {
    //loading
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
    await this.setState({
      users: this.props.users.result,
    });
    let usersArray = this.props.users.result;
    if (usersArray && usersArray.length > 0) {
      if (this.state.search !== "") {
        let array = usersArray.filter(
          (u: any) =>
            u.name
              .toLowerCase()
              .includes(this.state.search.trim().toLowerCase()) ||
            u.role
              .toLowerCase()
              .includes(this.state.search.trim().toLowerCase())
        );
        this.setState({
          filteredUsers: array,
        });
      } else {
        this.setState({
          filteredUsers: usersArray,
        });
      }
    }
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

  searchChanged = (e: any) => {
    this.setState({
      search: e.target.value,
    });
    if (e.target.value === "") {
      this.setState({
        filteredUsers: this.state.users,
      });
    } else {
      console.log("this.state.users", this.state.users);
      let array = this.state.users.filter(
        (u) =>
          u.name.toLowerCase().includes(e.target.value.trim().toLowerCase()) ||
          u.role.toLowerCase().includes(e.target.value.trim().toLowerCase())
      );
      this.setState({
        filteredUsers: array,
      });
    }
  };

  toggleOpenMore = (index: number) => {
    let dropdownVal = !this.state.dropdownMore;
    this.setState({
      currentIndex: index,
      dropdownMore: dropdownVal,
      viewUrl: this.viewUrl + this.state.users[index].id,
      editUrl: this.editUrl + this.state.users[index].id,
    });
  };

  remove = async (index: number) => {
    //this.removeUser(this.state.users[index].id,this.state.users[index].role);
    await this.props.deleteUser("users", this.state.users[index].id);
    console.log("this.props.user", this.props.user);
    if (
      this.props.user &&
      this.props.user.result &&
      this.props.user.result.data.statusText === "success"
    ) {
      this.getUsers();
    }
  };

  removeUser = async (id: any, role: string) => {
    switch (role) {
      // case 'admin' : {
      // 	this.deleteAdmin();
      // 	break;
      // }
      // case 'manager' : {
      // 	this.deleteStudent(id);
      // 	break;
      // }
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
      this.getUsers();
    }
  };

  deleteCoach = async (id: any) => {
    await this.props.deleteCoach("coach", id);
    if (
      this.props.coach.result &&
      this.props.coach.result.data.statusText === "success"
    ) {
      this.getUsers();
    }
  };

  render() {
    const {
      email,
      dropdown,
      isLogout,
      filteredUsers,
      search,
      dropdownMore,
      currentIndex,
      viewUrl,
      editUrl,
    } = this.state;
    return (
      <>
        <div className="container-cus">
          {isLogout && <Navigate to="/manager/login" replace={true} />}

          <div className="dashboard">
            {/* DASHBOARD HEADER */}
            <div className="dashboard-header">
              <div className="justify-end">
                <div className="dropdown">
                  <div className="email-div cursor" onClick={this.toggleOpen}>
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
                    aria-labelledby="dropdownMenuButton"
                  >
                    <div className="dropdown-item cursor" onClick={this.logout}>
                      <LogoutOutlinedIcon
                        sx={{ color: "#0070F8", fontSize: 32, mr: 2 }}
                      ></LogoutOutlinedIcon>
                      <span>Logout</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-center">
                <div className="col-9 col-md-12 justify-start align-center">
                  <div className="f-40 fw-500">
                    <span>People</span>
                  </div>
                </div>
              </div>
            </div>
            {/* DASHBOARD BODY */}
            <div className="dashboard-body">
              <div className="tableBody">
                <div className="tableSearch">
                  <div className="textArea">
                    <div className="dash-search-div">
                      <div className="dash-search-icon-div">
                        <SearchIcon
                          sx={{ color: "#808080", fontSize: 16, mr: 0.5 }}
                        />
                      </div>
                      <input
                        className="dash-input-div"
                        placeholder="Search by name or role"
                        value={search}
                        onChange={this.searchChanged}
                      />
                    </div>
                    <div className="dash-filter-div">
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
                <table className="table">
                  <thead>
                    <tr>
                      <th className="col-8">
                        <span className="ml-56">Name</span>
                      </th>
                      <th className="col-4">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers &&
                      filteredUsers.length > 0 &&
                      filteredUsers.map((user: any, index: any) => (
                        <tr>
                          <td className="flex justify-center">
                            <InitialIcon
                              initials={user.email.substr(0, 1).toUpperCase()}
                              isFooterMenu={false}
                            />
                            <span className="ml-16">
                              {!user.name || user.name === "" ? "-" : user.name}
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
                          <td>
                            <div className="mr-16">
                              <div className="dropdownMore mr-24">
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
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <Link to={viewUrl}>
                                    <div className="dropdown-item cursor">
                                      <span>View</span>
                                    </div>
                                  </Link>
                                  <div className="dropdown-divider"></div>

                                  <Link to={editUrl}>
                                    <div className="dropdown-item cursor">
                                      <span>Edit</span>
                                    </div>
                                  </Link>
                                  <div className="dropdown-divider"></div>
                                  <div
                                    className="dropdown-item cursor"
                                    onClick={() => this.remove(index)}
                                  >
                                    <span>Remove</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
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
  getAllUsers,
  LoadingActionFunc,
  deleteStudent,
  deleteCoach,
  deleteUser,
})(PeopleListPage);
