import React from "react";

// import css
import "./ManagerDashboard.css";
import AddIcon from "@mui/icons-material/Add";
import { StoreState } from "../../stores/reducers";
import { getAllclasses,deleteClass} from "../../stores/actions/class-action";
import { signOut } from "../../stores/actions/auth-action";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Class } from "../../stores/model/class";
import { getItem, removeItem } from "../../auth/LocalStorage";
import { InitialIcon, InitialIconList } from "../../atoms/InitialIcon";
import placeholder from "./../../assets/images/place-holder.png";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
interface IStates {
  classes: Class[];
  email: string;
  logo: string;
  school_id:number;
  school_name: string;
  dropdown: boolean;
  isLogout: boolean;
  dropdownMore: boolean;
  currentIndex: number;
  url: string;
}
interface ManagerDashboardPage {
  getAllclasses: Function;
  classList: any;
  signOut: Function;
  deleteClass : Function;
}

type IProps = ManagerDashboardPage;

class ManagerDashboardPage extends React.Component<IProps, IStates> {
  url = "/manager/class/";

  constructor(props: any) {
    super(props);

    this.state = {
      classes: [],
      email: "",
      logo: "",
      school_id: 0,
      school_name: "",
      dropdown: false,
      isLogout: false,
      dropdownMore: false,
      currentIndex: -1,
      url: "",
    };
  }

  componentDidMount() {
    removeItem("class");
    removeItem("event");
    removeItem("students")
    const user = JSON.parse(getItem("authUser") || "null");
    if (
      user &&
      user.userInfo &&
      user.userInfo.data.assign_school
    ) {
      this.setState({
        email: user.userInfo.data.email,
        logo:
          user.userInfo.data.assign_school
            ? user.userInfo.data.assign_school.school.logo
            : "",
        school_name:
          user.userInfo.data.assign_school
            ? user.userInfo.data.assign_school.school.name
            : "",
            school_id :  user.userInfo.data.assign_school
            ? user.userInfo.data.assign_school.school.id
            : 0,
      });
    }
    this.getClasses();
  }

  toggleOpenMore = (index: number) => {
    console.log('toggleOpenMore',index)
    let dropdownVal = !this.state.dropdownMore;
    this.setState({
      currentIndex: index,
      dropdownMore: dropdownVal,
      url: this.url + this.state.classes[index].id,
    });
  };

  remove = (index: number) => {
          console.log('this.state.classes',this.state.classes)

    this.removeClass(this.state.classes[index].id);
  };

  removeClass = async (id: any) => {
    await this.props.deleteClass('/school/'+this.state.school_id+'/class' ,id);
    if (
      this.props.classList.result &&
      this.props.classList.result.data.statusText === "success"
    ) {
      this.getClasses();
    }
  };

  getClasses = async () => {
    let url = "";
    const user = JSON.parse(getItem("authUser") || "null");
    if (
      user &&
      user.userInfo &&
      user.userInfo.data.assign_school
    ) {
      url =
        "school/" + user.userInfo.data.assign_school.school.id + "/class";
      await this.props.getAllclasses(url);
      if (this.props.classList.result)
      this.setState({
        classes: this.props.classList.result || [],
      });
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
    removeItem("class");
    this.setState({
      isLogout: true,
    });
  };

  renderBody = () => {
    let classes = this.props.classList.result;
    if (classes && classes.length > 0) {
      return (
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
										placeholder='Search by class, date/time or coach(es)'
									/>
								</div>
								<div className='dash-filter-div'>
									<FilterListIcon
										sx={{
											color: "#0070F8",
											fontSize: 18,
											fontWeight: 500,
											mr: 0.5,
										}}
									/>
									Filter
								</div>
							</div>
						</div>
						<table className='table'>
							<thead>
								<tr>
									<th className='col-1'></th>
									<th className='col-3'>CLASS</th>
									<th className='col-3'>NEXT DATE/TIME</th>
									<th className='col-2'>COACH</th>
									<th className='col-3'>NO. STUDENTS</th>
								</tr>
							</thead>
							<tbody>
								{classes &&
									classes.length > 0 &&
									classes.map((classe: Class,index : any) => (
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
											</td>
											<td>{classe.name}</td>
											<td>
												{classe.start_date} {classe.start_time}
											</td>
											<td className='emailInitialIcon'>
												{classe.assign_user && classe.assign_user.length > 0 && classe.assign_user.map((user: any, index) =>
													user.type === "coache" && index === 0 ? (
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
												<div className='flex justify-space-around'>
													<span>{classe.studnetCount}</span>
													<div className="dropdownMore">
                                <MoreVertIcon
                                  style={{
                                    color: "inherit",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => this.toggleOpenMore(index)}
                                />
                                <div
                                  className={`dropdown-menu ${
                                    this.state.dropdownMore && this.state.currentIndex === index
                                      ? "show"
                                      : ""
                                  }`}
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <Link to={this.state.url}>
                                    <div
                                      className="dropdown-item cursor"
                                    >
                                      <span>View</span>
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
			);
    } else {
      return (
        <div className="dashboard-body">
          {/* Start Add school */}
          <div className="createClass flex-center">
            <div className="body">
              <div className="plus-icon mt-16">
                <img src="../../../assets/icons/plus-round.png" alt="plus" />
              </div>
              <div className="text f-16 mt-16">
                <span>Create a class to add students, parents and coaches</span>
              </div>
              <div className="flex-center mt-16">
                <Link to="/manager/add-class">
                  <button
                    type="submit"
                    className="primary-btn"
                    // style={{ width: "140px" }}
                  >
                    <span>Create Class</span>
                    <AddIcon
                      sx={{ color: "#fff", fontSize: 18, mr: 0.5 }}
                    ></AddIcon>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    const { email, logo, school_name, dropdown, isLogout } = this.state;

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
              <div className="justify-center">
                <div className="col-8 col-md-8 justify-start align-center">
                  <div className="mr-16">
                    <img
                      src={
                        logo
                          ? process.env.REACT_APP_API_ENDPOINT + "/" + logo
                          : placeholder
                      }
                      alt="logo"
                      className="big-logo"
                    />
                  </div>

                  <div className="f-40 fw-500">
                    <span>{school_name}</span>
                  </div>
                </div>
                <div className="col-4 col-md-4 justify-end">
                  <Link to="/manager/add-class">
                    <button
                      type="submit"
                      className="primary-btn"
                      // style={{ width: "140px" }}
                    >
                      Create Class
                      <AddIcon
                        sx={{ color: "#fff", fontSize: 18, mr: 0.5 }}
                      ></AddIcon>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {this.renderBody()}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({
  classList,
}: StoreState): {
  classList: any;
} => {
  return {
    classList,
  };
};

export default connect(mapStateToProps, { getAllclasses, signOut, deleteClass })(
  ManagerDashboardPage
);
