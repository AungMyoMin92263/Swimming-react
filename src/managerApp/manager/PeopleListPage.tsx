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
import { signIn, signOut, getAllUsers } from "../../stores/actions";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { InitialIcon } from "../../atoms/InitialIcon";
import { getItem, removeItem } from "../../auth/LocalStorage";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
interface IStates {
  schools: School[];
  email: string;
  dropdown: boolean;
  isLogout: boolean;
  users: any[];
}
interface UserSignInPage {
  signIn: Function;
  authUser: AuthInterface;
  signOut: Function;
  getAllUsers : Function;
  users: any;
}

type IProps = UserSignInPage;

class PeopleListPage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      schools: [],
      email: "",
      dropdown: false,
      isLogout: false,
      users : []
    };
  }

  componentDidMount() {
    //loading
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
    removeItem("class");
    this.setState({
      isLogout: true,
    });
  };

  render() {
    const { email, dropdown, isLogout,users } = this.state;
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
                    <InitialIcon initials={email.substr(0, 1).toUpperCase()} isFooterMenu={false}/>
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
                              isFooterMenu={false}
                            />
                          </td>
                          <td>{user.name}</td>
                          <td>
                            <span></span>
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
  authUser,users
}: StoreState): {
  authUser: AuthInterface;users : any;
} => {
  return {
    authUser,users
  };
};

export default connect(mapStateToProps, { signIn, signOut,getAllUsers })(PeopleListPage);
