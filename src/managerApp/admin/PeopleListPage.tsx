import React from "react";

// import csss
import "./AdminDashboard.css";
import "../manager/ManagerDashboard.css";

import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { signIn, signOut, getAllUsers } from "../../stores/actions";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { getItem, removeItem } from "../../auth/LocalStorage";
import { InitialIcon } from "../../atoms/InitialIcon";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
interface IStates {
  users: any[];
  email: string;
  dropdown: boolean;
  isLogout: boolean;
  dropdownMore : boolean;
  currentIndex : number;
  url : string;
}
interface UserSignInPage {
  signIn: Function;
  authUser: AuthInterface;
  signOut: Function;
  getAllUsers: Function;
  users: any;
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
      dropdownMore : false,
      currentIndex : -1,
      url : '',
    };
  }

  componentDidMount() {
    const user = JSON.parse(getItem("authUser") || "null");
    if (user && user.userInfo) {
      this.setState({
        email: user.userInfo.data.email,
      });
    }
    this.getUsers();
  }

  getUsers = async () => {
    await this.props.getAllUsers();
    this.setState({
      users : this.props.users.result
    })
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
  };

  toggleOpenMore = (index: number) => {
    let dropdownVal = !this.state.dropdownMore;
    this.setState({
		currentIndex : index,
		dropdownMore: dropdownVal,
    });
  };

  render() {
    const { users, email, dropdown, isLogout,dropdownMore,currentIndex } = this.state;
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
                    <InitialIcon initials={email.substr(0, 1).toUpperCase()} />
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
                <table className="table">
                  <thead>
                    <tr>
                      <th className="col-1"></th>
                      <th className="col-5">Name</th>
                      <th className="col-3">Class</th>
                      <th className="col-3">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users.length > 0 &&
                      users.map((user: any, index: any) => (
                        <tr>
                          <td>
                            <InitialIcon
                              initials={user.email.substr(0, 1).toUpperCase()}
                            />
                          </td>
                          <td>{user.name}</td>
                          <td>
                            <span>Pro Youth Morning</span>
                          </td>
                          <td>
                              <span>{user.role}</span>
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
}: StoreState): {
  authUser: AuthInterface;
  users: any;
} => {
  return {
    authUser,
    users,
  };
};

export default connect(mapStateToProps, { signIn, signOut, getAllUsers })(
  AdminPeopleListPage
);
