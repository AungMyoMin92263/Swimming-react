import React from "react";

// import css
import "./ManagerDashboard.css";
import AddIcon from "@mui/icons-material/Add";
import { StoreState } from "../../stores/reducers";
import { getAllclasses } from "../../stores/actions/class-action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Class } from "../../stores/model/class";
import placeholder from "./../../assets/images/place-holder.png";
import { getItem } from "../../auth/LocalStorage";

interface IStates {
  classes: Class[];
}
interface ManagerDashboardPage {
  getAllclasses: Function;
  classList: any;
}

type IProps = ManagerDashboardPage;

class ManagerDashboardPage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      classes: [],
    };
  }

  componentDidMount() {
    //loading
    this.getClasses();
  }

  getClasses = async () => {
    let url = '';
    const user = JSON.parse(getItem("authUser") || "null");
    if(user && user.userInfo) {
       url = 'school/'+ user.userInfo.data.assign_school[0].id + '/class';
       this.props.getAllclasses(url);
    }
  };

  renderBody = () => {
    let classes = this.props.classList.result;
    if (classes && classes.length > 0) {
      return (
        <div className="dashboard-body">
          <div className="tableBody">
            <table className="table">
              <thead>
                <tr>
                  <th className="col-1"></th>
                  <th className="col-5">SCHOOL</th>
                  <th className="col-3">MANAGER(s)</th>
                  <th className="col-3">NO. STUDENT</th>
                </tr>
              </thead>
              <tbody>
                {classes &&
                  classes.length > 0 &&
                  classes.map((classe: Class) => (
                    <tr>
                      <td>
                        <img
                          src={
                            classe
                              ? "http://localhost:3000/api/" + classe.logo
                              : placeholder
                          }
                          alt="logo"
                          id="logo"
                          className={`${classe ? "icon" : "w-48"}`}
                        />
                      </td>
                      <td>{classe.name}</td>
                      <td>
                        <img
                          src="../../../assets/icons/alpha.png"
                          alt="alpha"
                          className="icon"
                        />
                      </td>
                      <td>0</td>
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
                  <div className="mr-16">
                    <img
                      src="../../../assets/icons/logo.png"
                      alt="right-arrow"
                      className="icon"
                    />
                  </div>

                  <div className="f-40 fw-500">
                    <span>Dolphin Swimming School</span>
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

export default connect(mapStateToProps, { getAllclasses })(
  ManagerDashboardPage
);
