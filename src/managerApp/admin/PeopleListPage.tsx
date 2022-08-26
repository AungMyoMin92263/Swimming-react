import React from "react";

// import csss
import "./AdminDashboard.css";
import "../manager/ManagerDashboard.css";

import AddIcon from "@mui/icons-material/Add";
import { School } from "../../stores/model/school";

import { AuthInterface } from "../../stores/model/auth-interface";
import { StoreState } from "../../stores/reducers";
import { signIn } from "../../stores/actions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

interface IStates {
	schools: School[];
}
interface UserSignInPage {
	signIn: Function;
	authUser: AuthInterface;
}

type IProps = UserSignInPage;

class AdminPeopleListPage extends React.Component<IProps, IStates> {
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
				<div className='container-cus'>
					<div className='dashboard'>
						{/* DASHBOARD HEADER */}
						<div className='dashboard-header'>
							<div className='justify-end'>
								<div className='email-div'>
									<img
										src='../../../assets/icons/alpha.png'
										alt='alpha'
										className='icon'
									/>
									<span>Leon@gmail.com </span>
								</div>
							</div>
							<div className='row justify-center'>
								<div className='col-9 col-md-12 justify-start align-center'>

									<div className='f-40 fw-500'>
										<span>People</span>
									</div>
								</div>
							</div>
						</div>
						{/* DASHBOARD BODY */}
						<div className='dashboard-body'>
							{/* Start Add school */}
							<div className='createClass flex-center'>
								<div className='body'>
									<div className='plus-icon mt-16'>
										<img
											src='../../../assets/icons/plus-round.png'
											alt='plus'
										/>
										{/* <ControlPointIcon
                      sx={{ color: "#808080", fontSize: 58 }}
                    ></ControlPointIcon> */}
									</div>
									<div className='text f-16 mt-16'>
										Create an event to assign to students.
									</div>
									<div className='flex-center mt-16'>
										<Link to="/manager/add-event" style={{ textDecoration : 'none'}}>
											<button
												type='submit'
												className='primary-btn'
												// style={{ width: "140px" }}
											>
												Create People
												<AddIcon
													sx={{ color: "#fff", fontSize: 18, mr: 0.5 }}
												></AddIcon>
											</button>
										</Link>
									</div>
								</div>
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
}: StoreState): {
	authUser: AuthInterface;
} => {
	return {
		authUser,
	};
};

export default connect(mapStateToProps, { signIn })(AdminPeopleListPage);
