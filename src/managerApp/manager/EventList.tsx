import React from "react";

// import csss
import "../admin/AdminDashboard.css";
import "./ManagerDashboard.css";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { StoreState } from "../../stores/reducers";
import { getAllEvents, deleteEvent } from "../../stores/actions";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { Event } from "../../stores/model/event";
import { getItem, removeItem } from "../../auth/LocalStorage";
import { InitialIcon } from "../../atoms/InitialIcon";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { signOut, LoadingActionFunc } from "../../stores/actions";
import { Dropdown, Modal } from "react-bootstrap";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface IStates {
  events: Event[];
  email: string;
  filterText: string;
  dropdown: boolean;
  isLogout: boolean;
  modalShow: boolean;
  removeIndex: number;
  schoolId : any;
}

interface EventList {
  getAllEvents: Function;
  eventList: any;
  signOut: Function;
  LoadingActionFunc: Function;
  deleteEvent: Function;
}

type IProps = EventList;

class EventList extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      events: [],
      email: "",
      filterText: "",
      dropdown: false,
      isLogout: false,
      modalShow: false,
      removeIndex: -1,
	  schoolId : -1,
    };
    this.props.LoadingActionFunc(true);
  }

  componentDidMount() {
    removeItem("event");
    this.authFromLocal();
  }

  authFromLocal = async() => {
	const user = JSON.parse(getItem("authUser") || "null");
    if (user && user.userInfo) {
      await this.setState({
        email: user.userInfo.email,
		schoolId :  user.userInfo.assign_school && user.userInfo.assign_school.school && user.userInfo.assign_school.school.id
      });
	  this.getEvents();
	  this.props.LoadingActionFunc(false);
    }
  }

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

  getEvents = async () => {
      let url = "school/" + this.state.schoolId + "/event";
      await this.props.getAllEvents(url);
      await this.setState({
        events: this.props.eventList.result,
      });
      this.props.LoadingActionFunc(false);
  };

  searchChanged = (e: any) => {
    this.setState({
      ...this.state,
      filterText: e.currentTarget.value,
    });
  };

  remove = async () => {
    await this.props.deleteEvent(
     'school/'+ this.state.schoolId +"/event",
      this.state.events[this.state.removeIndex].id
    );
    if (
      this.props.eventList &&
      this.props.eventList.result &&
      this.props.eventList.result.data.statusText === "success"
    ) {
      this.setState({
        modalShow: this.state.modalShow ? false : this.state.modalShow,
      });
      this.getEvents();
    }
  };

  renderBody = () => {
    let events = this.props.eventList.result;
    if (events && events.length > 0) {
      return (
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
                    placeholder="Search by style or age group"
                    value={this.state.filterText}
                    onChange={this.searchChanged}
                  />
                </div>
                {/* <div className="dash-filter-div">
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
            <table className="table">
              <thead>
                <tr>
                  <th className="col-3">EVENT</th>
                  <th className="col-3">GENDER</th>
                  <th className="col-3">AGE GROUP</th>
                  <th className="col-3">NO. STUDENTS</th>
                </tr>
              </thead>
              <tbody>
                {events &&
                  events.length > 0 &&
                  events
                    .filter((evente: any) => {
                      if (!this.state.filterText) {
                        return true;
                      } else {
                        return (evente.from_age.toString() || "")
                          .toLowerCase()
                          .startsWith(this.state.filterText.toLowerCase());
                      }
                    })
                    .map((evente: Event, ind: number) => (
                      <tr>
                        <td>{evente.name}</td>
                        <td>{evente.gender}</td>
                        <td>
                          <span>{evente.from_age}</span>-
                          <span className="mr-8">{evente.to_age}</span> y/o
                        </td>
                        <td>{evente.studnetCount ? evente.studnetCount : 0}</td>
                        <td>
                          <div className="mr-16">
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
                                    "/manager/event-detail/" + evente.id
                                  }
                                >
                                  <span>View</span>
                                </Dropdown.Item>

                                <div className="dropdown-divider"></div>

                                <Dropdown.Item
                                  onClick={() =>
                                    this.setState({
                                      removeIndex: ind,
                                      modalShow: true,
                                    })
                                  }
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
                Create an event to assign to students.
              </div>
              <div className="flex-center mt-16">
                <Link
                  to="/manager/add-event"
                  style={{ textDecoration: "none" }}
                >
                  <button
                    type="submit"
                    className="primary-btn"
                    // style={{ width: "140px" }}
                  >
                    Create Event
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
    const { email, dropdown, isLogout, events, removeIndex } = this.state;
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
                <div className="col-8 col-md-8 justify-start align-center">
                  <div className="f-40 fw-500">
                    <span>Events</span>
                  </div>
                </div>
                <div className="col-4 col-md-4 justify-end">
                  <Link to="/manager/add-event">
                    <button
                      type="submit"
                      className="primary-btn"
                      // style={{ width: "140px" }}
                    >
                      Create Event
                      <AddIcon
                        sx={{ color: "#fff", fontSize: 18, mr: 0.5 }}
                      ></AddIcon>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            {/* DASHBOARD BODY */}

            {this.renderBody()}
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
              Remove event ‘ {events[removeIndex] && events[removeIndex].name}{" "}
              ’?{" "}
            </span>
          </div>
          <div className="mb-16">
            <span className="f-16">
              This action cannot be undone. This action will remove the event
              from your school.
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
  eventList,
}: StoreState): {
  eventList: any;
} => {
  return {
    eventList,
  };
};

export default connect(mapStateToProps, {
  getAllEvents,
  signOut,
  LoadingActionFunc,
  deleteEvent,
})(EventList);
