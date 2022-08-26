import React from "react";

// import csss
import "./AdminDashboard.css";
import AddIcon from "@mui/icons-material/Add";

import { School } from "../../stores/model/school";

import { StoreState } from "../../stores/reducers";
import { connect } from "react-redux";
import { getAllSchools } from "../../stores/actions/school-action";
import { Link } from "react-router-dom";

import placeholder from './../../assets/images/place-holder.png';

interface IStates {
  schools: School[];
}
interface IProps {
  getAllSchools: Function;
  schoolList: any;
}

class AdminDashboardPage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      schools: [],
    };
  }

  componentDidMount() {
    //loading
    this.getSchools();
  }

  getSchools = async () => {
    await this.props.getAllSchools();
  };

  render() {
    // const {schools} = this.state
    let schools = this.props.schoolList.result;
    return (
      <>
        <div className="container">
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
                {/* <div className='col-9 justify-start align-center'>
								<div className="mr-16">
									<img
										src='../../../assets/icons/logo.png'
										alt='right-arrow'
										className='icon'
									/>
								</div>

								<div className='f-40 fw-500'>
									<span>Dolphin Swimming School</span>
								</div>
							</div> */}
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
                      <th className="col-1"></th>
                      <th className="col-5">SCHOOL</th>
                      <th className="col-3">MANAGER(s)</th>
                      <th className="col-3">NO. STUDENT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schools && schools.length > 0 &&
                      schools.map((school: School) => (
                        <tr>
                          <td>
                            <img
                              src={
                                school
                                  ? "http://localhost:3000/api/" + school.logo
                                  : placeholder
                              }
                              alt="logo"
                              id="logo"
                              className={`${school ? "icon" : "w-48"}`}
                            />
                          </td>
                          <td>{school.name}</td>
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
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({
  schoolList,
}: StoreState): {
  schoolList: any;
} => {
  return {
    schoolList,
  };
};

export default connect(mapStateToProps, { getAllSchools })(AdminDashboardPage);
