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
  getSchoolObj
} from "../../stores/actions";

import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { getItem, removeItem } from "../../auth/LocalStorage";
import { InitialIcon } from "../../atoms/InitialIcon";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dropdown from "react-bootstrap/Dropdown";
import { Modal } from "react-bootstrap";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";

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
  logo: string;
  school_id: number;
  school_name: string;
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
  getSchoolObj : Function;
  schools : any;
}

type IProps = UserSignInPage;

class AllPeoplePage extends React.Component<IProps, IStates> {
  id : any;
  constructor(props: any) {
    super(props);
    let path = window.location.pathname.split("/");
    this.id = path[3];
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
      logo: "",
      school_id: this.id,
      school_name: "",
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
    this.getSchool();
  }

  getSchool = async () => {
    await this.props.getSchoolObj("schools/" + this.id);
    if (this.props.schools.result) {
        let school = this.props.schools.result;
        if (school) {
          this.setState({
            school_name: school.name,
            logo: school.logo,
            school_id: school.id
          });
        }
    }
  };

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
    return (
      <>
        <div className="container-cus">
          {isLogout && <Navigate to="/admin/login" replace={true} />}
          <div className="dashboard">
            {/* DASHBOARD HEADER */}
            <div className="dashboard-header">
              <div className="justify-center justify-space-between">
                <Link to={'/admin/school/'+this.id} style={{ textDecoration: "none" }}>
                  <ArrowBackIcon
                    sx={{ color: "#0070F8", fontSize: 18, mr: 0.5 }}
                  ></ArrowBackIcon>
                  <span>Back</span>
                  <span className="ml-16 fc-second">
                    Schools / {this.state.school_name}
                  </span>
                </Link>

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
                      <div
                        className="dropdown-item cursor"
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

              <div className="row justify-center">
                <div className="col-9 col-md-12 justify-start align-center">
                  <div className="f-40 fw-500">
                    <span>All People</span>
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
                        value={filterText}
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
                      <th className="col-6">
                        {" "}
                        <span className="ml-56">Name</span>
                      </th>
                      <th className="col-3">Status</th>
                      <th className="col-3">Role</th>
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
                            <td className="flex justify-center">
                              <InitialIcon
                                initials={
                                  user.email
                                    ? user.email.substr(0, 1).toUpperCase()
                                    : ""
                                }
                                isFooterMenu={false}
                              />
                              <span className="ml-16">
                                {!user.name || user.name === ""
                                  ? "-"
                                  : user.name}
                              </span>
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
                            <td className="mr-16">
                              <Dropdown className="more-dropdown">
                                <Dropdown.Toggle
                                  id="dropdown-basic"
                                  className="more-list-btn"
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
                                            "/admin/manager-edit-profile/all-people/" +
                                            user.id
                                          }
                                        >
                                          <span>Edit</span>
                                        </Dropdown.Item>
                                      )}
                                    </>
                                  )}

                                  <div className="dropdown-divider"></div>

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
          aria-labelledby="contained-modal-title-vcenter"
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
          <div className="mb-16">
            <span className="f-20 fw-500">
              Remove {users[removeIndex]?.role} ‘ {users[removeIndex]?.name} ’?{" "}
            </span>
          </div>
          <div className="mb-16">
            <span className="f-16">
              This action cannot be undone. This action will remove the school.
            </span>
          </div>
          <div className="flex-center">
            <button
              type="submit"
              className="secondary-btn mr-8"
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
              type="submit"
              className="secondary-btn"
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
  schools,
}: StoreState): {
  authUser: AuthInterface;
  users: any;
  user: any;
  schools : any;
} => {
  return {
    authUser,
    users,
    user,
    schools,
  };
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
  getAllUsers,
  LoadingActionFunc,
  deleteUser,getSchoolObj,
})(AllPeoplePage);
