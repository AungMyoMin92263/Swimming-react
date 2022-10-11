import React from "react";

// import csss
import "./AdminDashboard.css";
import AddIcon from "@mui/icons-material/Add";

import { School } from "../../stores/model/school";

import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";
import {
  deleteSchoolObj,
  getAllSchools,
} from "../../stores/actions/school-action";
import { signOut } from "../../stores/actions/auth-action";
import { LoadingActionFunc } from "../../stores/actions/global-action";

import { Link, Navigate } from "react-router-dom";

import placeholder from "./../../assets/images/place-holder.png";
import { InitialIcon, InitialIconList } from "../../atoms/InitialIcon";
import { AuthInterface } from "../../stores/model/auth-interface";
import { getItem, removeItem } from "../../auth/LocalStorage";
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dropdown from "react-bootstrap/Dropdown";
import { Modal } from "react-bootstrap";
interface IStates {
  email: string;
  schools: School[];
  dropdown: boolean;
  isLogout: boolean;
  dropdownMore: boolean;
  currentIndex: number;
  url: string;
  managerUrl: string;
  modalShow : boolean;
  removeIndex : number;
}
interface IProps {
  getAllSchools: Function;
  schoolList: any;
  signOut: Function;
  deleteSchoolObj: Function;
  LoadingActionFunc: Function;
}

class AdminDashboardPage extends React.Component<IProps, IStates> {
  url = "/admin/edit-school/";
  managerUrl = "/admin/invite-manager-summary/";
  constructor(props: any) {
    super(props);
    this.state = {
      schools: [],
      email: "",
      dropdown: false,
      isLogout: false,
      dropdownMore: false,
      currentIndex: -1,
      url: "",
      managerUrl: "",
      modalShow : false,
      removeIndex : -1
    };
    // this.props.LoadingActionFunc(true);
  }

  componentDidMount() {
    //loading
    removeItem("school");
    const user = JSON.parse(getItem("authUser") || "null");
    if (user && user.userInfo) {
      this.setState({
        email: user.userInfo.email,
      });
    }
    this.getSchools();
  }

  toggleOpen = () => {
    let dropdownVal = !this.state.dropdown;
    this.setState({
      dropdown: dropdownVal,
    });
  };

  toggleOpenMore = (index: number) => {
    let dropdownVal = !this.state.dropdownMore;
    this.setState({
      currentIndex: index,
      dropdownMore: dropdownVal,
      url: this.url + this.state.schools[index].id,
      managerUrl: this.managerUrl + this.state.schools[index].id,
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

  getSchools = async () => {
    await this.props.getAllSchools();
    this.props.LoadingActionFunc(false);
    if (this.props.schoolList.result)
      await this.setState({
        schools: this.props.schoolList.result || [],
      });
  };

  edit = () => {};

  // remove = (index: number) => {
  //   this.removeSchool(this.state.schools[index].id);
  // };

  // removeSchool = async (id: any) => {
  //   await this.props.deleteSchoolObj(id);
  //   if (
  //     this.props.schoolList.result &&
  //     this.props.schoolList.result.data.statusText === "success"
  //   ) {
  //     this.getSchools();
  //   }
  // };

  remove = async () => {
    await this.props.deleteSchoolObj(this.state.schools[this.state.removeIndex].id);
    if (
      this.props.schoolList.result &&
      this.props.schoolList.result.data.statusText === "success"
    ) {
      this.setState({
        modalShow : this.state.modalShow? false : this.state.modalShow,
        });
      this.getSchools();
    }
  };

  render() {
    const {
      email,
      dropdown,
      isLogout,
      dropdownMore,
      currentIndex,
      url,
      managerUrl,
      schools,
      modalShow,
      removeIndex
    } = this.state;
    return (
      <>
        <div className="container-cus">
          {isLogout && <Navigate to="/admin/login" replace={true} />}
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
                    {/* <div className="dropdown-item" >
					<EditOutlinedIcon sx={{ color: '#0070F8', fontSize: 32, mr: 2 }} ></EditOutlinedIcon>
					<span>Edit Profile</span>
                    </div>
					<div className="dropdown-divider"></div> */}
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
                <div className="col-8 col-md-6 justify-start align-center">
                  <div className="f-40 fw-500">Schools</div>
                </div>

                <div className="col-4 col-md-6 justify-end">
                  <Link to="/admin/add-school">
                    <button
                      type="submit"
                      className="primary-btn"
                      // style={{ width: "140px" }}
                    >
                      Add School
                      <AddIcon
                        sx={{ color: "#fff", fontSize: 18, mr: 0.5 }}
                      ></AddIcon>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* DASHBOARD BODY */}
            <div className="dashboard-body">
              <div className="tableBody">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="col-6">
                        {" "}
                        <span className="ml-56">SCHOOL</span>
                      </th>
                      <th className="col-3">MANAGER(s)</th>
                      <th className="col-3">NO. STUDENT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schools &&
                      schools.length > 0 &&
                      schools.map((school: School, index: any) => (
                        <tr>
                          <td>
                            <img
                              src={
                                school
                                  ? process.env.REACT_APP_API_ENDPOINT +
                                    "/" +
                                    school.logo
                                  : placeholder
                              }
                              alt="logo"
                              id="logo"
                              className={`${school ? "icon" : "w-48"}`}
                            />

                            <span className="ml-16">{school.name}</span>
                          </td>
                          <td className="emailInitialIcon">
                            {school.assign_user.map((user: any, index) =>
                              user.type === "manager" && index === 0 ? (
                                <InitialIcon
                                  initials={user.user.email
                                    .substr(0, 1)
                                    .toUpperCase()}
                                  isFooterMenu={false}
                                />
                              ) : (
                                <InitialIconList
                                  initials={user.user.email
                                    .substr(0, 1)
                                    .toUpperCase()}
                                  isFooterMenu={false}
                                />
                              )
                            )}
                          </td>
                          <td>
                            <div className="flex justify-space-between">
                              <span>{school.student_count}</span>

                              <Dropdown className="more-dropdown">
                                <Dropdown.Toggle
                                  id="dropdown-basic"
                                  className="more-list-btn"
                                >
                                  <MoreVertIcon />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    href={
                                      "/admin/edit-school/" +
                                      this.state.schools[index].id
                                    }
                                  >
                                    <span>Edit School</span>
                                  </Dropdown.Item>

                                  <div className="dropdown-divider"></div>

                                  
                                    <Dropdown.Item href={"/admin/invite-manager-summary/" + this.state.schools[index].id}>
                                      <span>Edit School Managers</span>
                                    </Dropdown.Item>
                                  

                                  <div className="dropdown-divider"></div>

                                  <Dropdown.Item
                                    onClick={() => this.setState({
                                      removeIndex: index,
                                      modalShow: true,
                                    })}
                                  >
                                    <span>Remove</span>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
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
							Remove school ‘{" "}
							{schools[removeIndex] && schools[removeIndex].name} ’?{" "}
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
  schoolList,
  authUser,
}: StoreState): {
  schoolList: any;
  authUser: AuthInterface;
} => {
  return {
    schoolList,
    authUser,
  };
};

export default connect(mapStateToProps, {
  getAllSchools,
  signOut,
  deleteSchoolObj,
  LoadingActionFunc,
})(AdminDashboardPage);
