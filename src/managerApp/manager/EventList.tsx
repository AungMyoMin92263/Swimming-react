import React from "react";

// import csss
import "../admin/AdminDashboard.css";
import "./ManagerDashboard.css";
import AddIcon from "@mui/icons-material/Add";
import { StoreState } from "../../stores/reducers";
import { getAllEvents } from "../../stores/actions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Event } from "../../stores/model/event";
import { getItem } from "../../auth/LocalStorage";

interface IStates {
  events: Event[];
}

interface EventList {
  getAllEvents: Function;
  eventList: any;
}

type IProps = EventList;

class EventList extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents = async () => {
    let url = "";
    const user = JSON.parse(getItem("authUser") || "null");
    if (user && user.userInfo) {
      url = "school/" + user.userInfo.data.assign_school[0].school.id + "/event";
      this.props.getAllEvents(url);
    }
  };

  renderBody = () => {
    let events = this.props.eventList.result;
    if (events && events.length > 0) {
      return (
        <div className="dashboard-body">
          <div className="tableBody">
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
                  events.map((evente: Event) => (
                    <tr>
                      <td>{evente.name}</td>
                      <td>{evente.gender}</td>
                      <td>
                        <span>{evente.from_age}</span>-
                        <span className="mr-8">{evente.to_age}</span> y/o
                      </td>
                      <td>{evente.students? evente.students.length : 0}</td>
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
    return (
      <>
        <div className="container-cus">
          <div className="dashboard">
            {/* DASHBOARD HEADER */}
            <div className="dashboard-header">
              <div className="justify-end">
                <div className="email-div">
                  <img
                    src="../../../assets/icons/alpha.png"
                    alt="alpha"
                    className="icon"
                  />
                  <span>Leon@gmail.com </span>
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

export default connect(mapStateToProps, { getAllEvents })(EventList);
