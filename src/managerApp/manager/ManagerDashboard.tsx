import React from "react";

// import csss
import styles from "./../../css/pages.module.css";
import "../admin/AdminDashboard.css";
import "./ManagerDashboard.css";
import AddIcon from "@mui/icons-material/Add";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { School } from "../../interfaces/School";
import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { signOut, signIn } from "../../stores/actions";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

interface IStates {
  schools: School[];
}
interface UserSignInPage {
  signIn: Function;
  authUser: AuthInterface;
}

type IProps = UserSignInPage;

class AdminDashboardPage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      schools: [],
    };
  }

  componentDidMount() {
    //loading
  }

  render() {
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
                <div className="col-9 col-md-12 justify-start align-center">
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
                {/* <div className='col-8 col-md-6 justify-start align-center'>
									<div className='f-40 fw-500'>Schools</div>
								</div>

								<div className='col-4 col-md-6 justify-end'>
									<a href='http://localhost:4200/app/sub-page/managers/admin-dashboard'>
										<button
											type='submit'
											className='primary-btn'
											// style={{ width: "140px" }}
										>
											Add School
											<AddIcon
												sx={{ color: "#fff", fontSize: 18, mr: 0.5 }}
											></AddIcon>
										</button>
									</a>
								</div> */}
              </div>
            </div>
            {/* DASHBOARD BODY */}
            <div className="dashboard-body">
              {/* Start Add school */}
              <div className="createClass flex-center">
                <div className="body">
                  <div className="plus-icon mt-16">
                    <img
											src='../../../assets/icons/plus-round.png'
											alt='plus'
										/>
                    {/* <ControlPointIcon
                      sx={{ color: "#808080", fontSize: 58 }}
                    ></ControlPointIcon> */}
                  </div>
                  <div className="text f-16 mt-16">
                    Create a class to add students, parents and coaches
                  </div>
                  <div className="flex-center mt-16">
                    <a href="http://localhost:3000/manager/add-class">
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
                    </a>
                  </div>
                </div>
              </div>

              {/* End add school */}
              {/* start Table */}
              {/* <div className='tableBody'>
								<table className='table'>
									<thead>
										<tr>
											<th className='col-1'></th>
											<th className='col-5'>SCHOOL</th>
											<th className='col-3'>MANAGER(s)</th>
											<th className='col-3'>NO. STUDENT</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<img
													src='../../../assets/icons/logo.png'
													alt='right-arrow'
													className='icon'
												/>
											</td>
											<td>Dolphin Swimming School</td>
											<td>
												<img
													src='../../../assets/icons/alpha.png'
													alt='alpha'
													className='icon'
												/>
											</td>
											<td>0</td>
										</tr>
										<tr>
											<td>
												<img
													src='../../../assets/icons/logo.png'
													alt='right-arrow'
													className='icon'
												/>
											</td>
											<td>Dolphin Swimming School</td>
											<td>
												<img
													src='../../../assets/icons/alpha.png'
													alt='alpha'
													className='icon'
												/>
											</td>
											<td>0</td>
										</tr>
									</tbody>
								</table>
							</div> */}
              {/* end Table */}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({
  authUser,
}: StoreState): {
  authUser: AuthInterface;
} => {
  return {
    authUser,
  };
};

export default connect(mapStateToProps, { signIn })(AdminDashboardPage);
